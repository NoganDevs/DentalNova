if (typeof document !== 'undefined') {
function initChatWidget() {

  /* ================================
     CONFIGURATION
     ================================ */

  const config = window.AI_CONFIG || {};
const capabilities = config.capabilities || {};

const voiceChat = capabilities.voice?.enabled === true;
const attachment = capabilities.attachments?.enabled === true;
  /* ================================
     ELEMENTS
     ================================ */

  const launcher = document.getElementById('chat-launcher');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close-btn');
  const textarea = document.getElementById('chat-textarea');

  const sendBtn = document.getElementById('chat-send-btn');
  const sendIcon = sendBtn?.querySelector('.send-icon');

 const ICON_SEND = '<img src="icons/send.png" alt="" style="width:20px;height:20px;object-fit:contain;display:block;">';

const ICON_VOICE = '<img src="icons/voice.png" alt="" style="width:20px;height:20px;object-fit:contain;display:block;filter: none;" onload="this.style.filter = window.matchMedia(\'(prefers-color-scheme: dark)\').matches ? \'brightness(0) invert(1)\' : \'none\';">';
  const attachmentBtn = document.querySelector('.dock-btn');


  /* ================================
     ATTACHMENT
     ================================ */

  // Hide attachment without removing it
  if (attachmentBtn) {
    attachmentBtn.style.display = attachment ? '' : 'none';
  }


  /* ================================
     CHAT TOGGLE
     ================================ */

  const toggleWidget = () => {
    if (!chatWindow) return;

    const isHidden =
      chatWindow.classList.contains('chat-window-hidden');

    if (isHidden) {
      chatWindow.classList.remove('chat-window-hidden');
      chatWindow.setAttribute('aria-hidden', 'false');
      textarea?.focus();
    } else {
      chatWindow.classList.add('chat-window-hidden');
      chatWindow.setAttribute('aria-hidden', 'true');
    }
  };

  launcher?.addEventListener('click', toggleWidget);
  closeBtn?.addEventListener('click', toggleWidget);

  /* ================================
     RESTART CONVERSATION
     ================================ */

  const refreshBtn = document.getElementById('chat-refresh-btn');

  refreshBtn?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('ai:reset'));
  });

  /* ================================
     TEXT INPUT
     ================================ */

  textarea?.addEventListener('input', function () {

    // Auto resize
    this.style.height = '24px';
    this.style.height =
      Math.min(this.scrollHeight, 96) + 'px';

    const hasText = this.value.trim().length > 0;


    /* ================================
       VOICE ENABLED
       ================================ */

    if (voiceChat) {

      if (sendIcon) {
        sendIcon.innerHTML = hasText
          ? ICON_SEND
          : ICON_VOICE;
      }
      if (sendBtn) {
        sendBtn.title = hasText
          ? 'Send'
          : 'Voice';

        sendBtn.setAttribute(
          'aria-label',
          hasText
            ? 'Send message'
            : 'Voice input'
        );
      }

    }


    /* ================================
       VOICE DISABLED
       ================================ */

    else {

      // ALWAYS keep the send icon
      if (sendIcon) {
        sendIcon.innerHTML = ICON_SEND;
      }
      if (sendBtn) {
        sendBtn.title = 'Send';
        sendBtn.setAttribute(
          'aria-label',
          'Send message'
        );
      }

    }

  });


  /* ================================
     VOICE RECORDING
     ================================ */

  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;
  let recordingTimer = null;

  async function startRecording() {

  if (!voiceChat || isRecording) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia unavailable — page must be served over HTTPS (or localhost).');
    alert('Voice input needs a secure connection (HTTPS). Please contact the site owner.');
    return;
  }

  try {
    const stream =
      await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      stream.getTracks().forEach(track => track.stop());
      handleRecordingComplete();
    };

    mediaRecorder.start();
    isRecording = true;

    sendBtn?.classList.add('is-recording');

    const maxSeconds =
      config.capabilities?.voice?.maxSeconds || 60;

    recordingTimer = setTimeout(stopRecording, maxSeconds * 1000);

  } catch (error) {
    console.error('Microphone access error:', error.name, error.message);

    if (error.name === 'NotAllowedError') {
      alert('Microphone access was blocked. Please allow it in your browser\'s site settings and try again.');
    } else if (error.name === 'NotFoundError') {
      alert('No microphone was found on this device.');
    } else {
      alert('Could not start voice input: ' + error.message);
    }
  }
}

  function stopRecording() {

    if (!isRecording || !mediaRecorder) return;

    clearTimeout(recordingTimer);
    mediaRecorder.stop();
    isRecording = false;

    sendBtn?.classList.remove('is-recording');
  }

  async function handleRecordingComplete() {

    if (!audioChunks.length) return;

    const audioBlob =
      new Blob(audioChunks, { type: 'audio/webm' });

    // Voice goes straight through chat.js's sendVoiceMessage,
    // which posts audio to /api/ai directly — no separate
    // transcription route.
    if (typeof window.sendVoiceMessage === 'function') {
      window.sendVoiceMessage(audioBlob, 'audio/webm');
    } else {
      console.error('sendVoiceMessage not available — check that chat.js loaded before this widget script.');
      alert("Sorry, voice input isn't available right now. Please try typing instead.");
    }
  }

  let hadTextBeforeClick = false;

sendBtn?.addEventListener('pointerdown', () => {
  hadTextBeforeClick = textarea?.value.trim().length > 0;
});

sendBtn?.addEventListener('click', () => {

    if (hadTextBeforeClick || !voiceChat) return;

    isRecording ? stopRecording() : startRecording();
  });
  /* ================================
     INITIAL STATE
     ================================ */

  if (sendIcon) {

    sendIcon.innerHTML = voiceChat
      ? ICON_VOICE
      : ICON_SEND;
  }
  if (sendBtn) {

    sendBtn.title = voiceChat
      ? 'Voice'
      : 'Send';

    sendBtn.setAttribute(
      'aria-label',
      voiceChat
        ? 'Voice input'
        : 'Send message'
    );
  }

  /* ================================
     WHITE ICON
     ================================ */

}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
}
}
if (typeof document !== 'undefined') {
function initAttachmentPickerWidget() {
  const attachmentBtn = document.querySelector('.dock-btn');
  const inputCard = document.querySelector('.chat-input-card');

  if (!attachmentBtn || !inputCard) return;
  /* --------------------------------
     Attachment picker
     -------------------------------- */

  const picker = document.createElement('div');

  picker.className = 'chat-attachment-picker';

  picker.innerHTML = `
    <div class="attachment-picker-header">
      <span>Attach something</span>
      <button type="button" class="attachment-picker-close" aria-label="Close">
        ×
      </button>
    </div>

    <div class="attachment-options">

      <!--
        Images only. PDFs/DOCX/etc. were removed on purpose —
        none of the connected providers can read file contents
        server-side in this template, so offering them just let
        users attach files the AI silently ignored. If you add a
        real text-extraction step later (see the "pdf" style
        skill pattern), you can bring a document option back.
      -->

      <button type="button"
        class="attachment-option"
        data-type="image/*">
        <span class="attachment-option-icon image-icon">
          <img src="icons/gallery.png" alt="">
        </span>
        <span class="attachment-option-text">
          <strong>Photos</strong>
          <small>JPG, PNG, WEBP</small>
        </span>
      </button>

    </div>
  `;

  inputCard.appendChild(picker);


  /* --------------------------------
     Hidden file input
     -------------------------------- */

  const fileInput = document.createElement('input');

  fileInput.type = 'file';
  fileInput.style.display = 'none';

  document.body.appendChild(fileInput);


  /* --------------------------------
     Open / close picker
     -------------------------------- */

  attachmentBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    picker.classList.toggle('is-open');
  });


  const closePicker = () => {
    picker.classList.remove('is-open');
  };


  picker.querySelector('.attachment-picker-close')
    ?.addEventListener('click', (event) => {
      event.stopPropagation();
      closePicker();
    });


  /* --------------------------------
     File type selection
     -------------------------------- */

  picker.querySelectorAll('.attachment-option')
    .forEach(option => {

      option.addEventListener('click', (event) => {

        event.preventDefault();
        event.stopPropagation();

        const type = option.dataset.type || '*/*';

        fileInput.accept = type;
        fileInput.value = '';

        fileInput.click();

        closePicker();
      });

    });


  /* --------------------------------
     Selected file
     -------------------------------- */

  function showSelectedAttachments(files) {
  let preview = document.getElementById('chat-attachment-preview');

  if (!preview) {
    preview = document.createElement('div');
    preview.id = 'chat-attachment-preview';

    preview.innerHTML = `
      <div class="attachment-preview-list"></div>
    `;

    inputCard.insertBefore(
      preview,
      inputCard.querySelector('.chat-input-dock')
    );
  }

  const list = preview.querySelector('.attachment-preview-list');
  list.innerHTML = '';

  files.forEach((file, index) => {
    const item = document.createElement('div');

    item.className = 'selected-attachment';

    item.innerHTML = `
      <div class="selected-attachment-icon">
        ${
          file.type.startsWith('image/')
            ? `<img src="${URL.createObjectURL(file)}" alt="">`
            : `<span>📄</span>`
        }
      </div>

      <div class="selected-attachment-info">
        <strong>${escapeAttachmentText(file.name)}</strong>
        <small>${formatFileSize(file.size)}</small>
      </div>

      <button
        type="button"
        class="remove-attachment"
        data-index="${index}"
        aria-label="Remove attachment"
      >
        ×
      </button>
    `;

    list.appendChild(item);
  });

  list.querySelectorAll('.remove-attachment').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);

      window.chatAttachments.splice(index, 1);

      if (window.chatAttachments.length) {
        showSelectedAttachments(window.chatAttachments);
      } else {
        window.chatAttachments = [];
        preview.remove();
        fileInput.value = '';
      }
    });
  });
}

function escapeAttachmentText(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


/* --------------------------------
   Selected file
   -------------------------------- */

fileInput.addEventListener('change', () => {

  const files = [...fileInput.files];

  if (!files.length) return;

  const attachmentConfig =
    (window.AI_CONFIG?.capabilities?.attachments) || {};

  const maxFiles = attachmentConfig.maxFiles || 3;
  const maxSizeMB = attachmentConfig.maxSizeMB || 8;

  const combined = [
    ...(window.chatAttachments || []),
    ...files
  ];

  if (combined.length > maxFiles) {
    alert(`You can attach up to ${maxFiles} file(s).`);
    return;
  }

  const oversized = files.find(
    file => file.size > maxSizeMB * 1024 * 1024
  );

  if (oversized) {
    alert(`"${oversized.name}" is larger than ${maxSizeMB}MB.`);
    return;
  }

  window.chatAttachments = combined;

  showSelectedAttachments(window.chatAttachments);
});


window.addEventListener('ai:attachments-sent', () => {
  document.getElementById('chat-attachment-preview')?.remove();
  fileInput.value = '';
});



  /* --------------------------------
     Close when clicking outside
     -------------------------------- */

  document.addEventListener('click', (event) => {

    if (
      picker.classList.contains('is-open') &&
      !picker.contains(event.target) &&
      !attachmentBtn.contains(event.target)
    ) {
      closePicker();
    }

  });


  /* --------------------------------
     Styles
     -------------------------------- */

  const style = document.createElement('style');

  style.textContent = `

    .chat-input-card {
      position: relative !important;
    }

    .chat-attachment-picker {
      position: absolute;
      left: 10px;
      bottom: calc(100% + 10px);
      width: 238px;

      padding: 8px;

      border-radius: 16px;

      background:
        linear-gradient(
          145deg,
          rgba(255,255,255,.98),
          rgba(248,250,252,.94)
        );

      border: 1px solid rgba(255,255,255,.95);

      box-shadow:
        0 18px 45px rgba(15,23,42,.13),
        0 4px 12px rgba(15,23,42,.06),
        inset 0 1px 1px #fff;

      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);

      opacity: 0;
      visibility: hidden;
      transform:
        translateY(8px)
        scale(.97);

      transform-origin: bottom left;

      transition:
        opacity .18s ease,
        transform .22s cubic-bezier(.16,1,.3,1),
        visibility .18s ease;

      z-index: 50;
    }

    .chat-attachment-picker.is-open {
      opacity: 1;
      visibility: visible;

      transform:
        translateY(0)
        scale(1);
    }


    .attachment-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 6px 7px 8px 9px;

      font-family: 'Plus Jakarta Sans',
        sans-serif;

      font-size: 11px;
      font-weight: 700;

      color: #334155;

      letter-spacing: -.01em;
    }


    .attachment-picker-close {
      width: 24px;
      height: 24px;

      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      border-radius: 7px;

      background: transparent;

      color: #94a3b8;

      font-size: 18px;
      line-height: 1;

      cursor: pointer;

      transition:
        background .15s ease,
        color .15s ease;
    }

    .attachment-picker-close:hover {
      background: #f1f5f9;
      color: #334155;
    }


    .attachment-options {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }


    .attachment-option {
      width: 100%;

      display: flex;
      align-items: center;

      gap: 10px;

      padding: 8px;

      border: 0;
      border-radius: 11px;

      background: transparent;

      text-align: left;

      cursor: pointer;

      transition:
        background .15s ease,
        transform .15s ease;
    }

    .attachment-option:hover {
      background: rgba(241,245,249,.85);
    }

    .attachment-option:active {
      transform: scale(.98);
    }


    .attachment-option-icon {
      width: 34px;
      height: 34px;

      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 10px;

      background: #f1f5f9;

      box-shadow:
        inset 0 1px 1px rgba(255,255,255,.9);
    }


    .attachment-option-icon img {
      width: 17px;
      height: 17px;

      object-fit: contain;
    }


    .attachment-option-text {
      min-width: 0;

      display: flex;
      flex-direction: column;

      gap: 1px;
    }

    .attachment-option-text strong {
      font-family: 'Plus Jakarta Sans',
        sans-serif;

      font-size: 11.5px;
      font-weight: 600;

      line-height: 16px;

      color: #1e293b;

      letter-spacing: -.01em;
    }

    .attachment-option-text small {
      font-family: 'Inter',
        sans-serif;

      font-size: 9.5px;
      font-weight: 400;

      line-height: 13px;

      color: #94a3b8;
    }


    /* Small screens */

    @media (max-width: 600px) {

      .chat-attachment-picker {
        left: 4px;
        width: 225px;
        bottom: calc(100% + 8px);
      }

    }

  `;

  document.head.appendChild(style);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAttachmentPickerWidget);
  } else {
    initAttachmentPickerWidget();
  }
}
}
