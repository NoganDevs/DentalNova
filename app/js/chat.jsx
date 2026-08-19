/*
 * ============================================================
 * UNIVERSAL AI CHAT CLIENT
 * ============================================================
 *
 * Responsibilities:
 * - Connect HTML chat UI to /api/ai.js
 * - Send messages
 * - Maintain conversation history
 * - Build safe business context
 * - Handle AI responses
 * - Detect booking triggers
 * - Handle contact requests
 * - Respect voice/attachment configuration
 *
 * API keys NEVER exist in this file.
 */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // ELEMENTS
  // ==========================================================

  const textarea =
    document.getElementById("chat-textarea");

  const sendBtn =
    document.getElementById("chat-send-btn");

  const messages =
    document.getElementById("chat-messages");

  const typingIndicator =
    document.getElementById("chat-typing-indicator");


  // ==========================================================
  // CONFIG
  // ==========================================================

  const config =
    window.AI_CONFIG || {};

  const assistant =
    config.assistant || {};

  const business =
    config.business || {};

  const capabilities =
    config.capabilities || {};

  const restrictions =
    config.restrictions || {};

  const booking =
    config.booking || {};

  const contact =
    config.contact || {};


  // ==========================================================
  // STATE
  // ==========================================================

  let conversationHistory = [];

  let isSending = false;

  // Keep history under configured limit.
  const maxHistory =
    Number(
      assistant.maxHistoryMessages || 20
    );


  // ==========================================================
  // HELPERS
  // ==========================================================

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

function formatTime(date = new Date()) {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function scrollToBottom() {

    if (!messages) return;

    requestAnimationFrame(() => {
      messages.scrollTop =
        messages.scrollHeight;
    });
  }


  function formatMessage(text) {

    // Escape first so raw HTML in the AI's reply can never inject markup.
    let safe = escapeHTML(text);

    // Icon tokens: :icon:lucide:check-circle: -> inline svg icon
    safe = safe.replace(
      /:icon:([a-z0-9]+:[a-z0-9-]+):/gi,
      (m, name) => `<img class="msg-icon" src="https://api.iconify.design/${name}.svg?color=%23334155" alt="" />`
    );

    // Linkify bare URLs
    safe = safe.replace(
      /(https?:\/\/[^\s<]+[^\s<.,)])/g,
      url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );

    // **bold** -> <strong>bold</strong>
    safe = safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Turn "* item" / "- item" lines into a real bullet list,
    // and everything else into paragraphs (so \n becomes a real line break).
    const lines = safe.split("\n");
    let html = "";
    let inList = false;

    lines.forEach(line => {

      const bulletMatch = line.match(/^\s*[*-]\s+(.*)$/);

      if (bulletMatch) {

        if (!inList) {
          html += "<ul>";
          inList = true;
        }

        html += `<li>${bulletMatch[1]}</li>`;

      } else {

        if (inList) {
          html += "</ul>";
          inList = false;
        }

        if (line.trim().length) {
          html += `<p>${line}</p>`;
        }
      }
    });

    if (inList) {
      html += "</ul>";
    }

    return html;
  }


  // ==========================================================
  // STATUS ICONS (CDN, no bundler/build step needed)
  // ==========================================================
  //
  // Served on-demand as plain SVGs by Iconify's public API —
  // works as a normal <img src="...">, nothing to install.
  // Swap these URLs for local /icons/*.svg files if you'd rather
  // not depend on an external request for this.

  const STATUS_ICONS = {
    success:
      "https://api.iconify.design/lucide:check-circle.svg?color=%2316a34a",
    warning:
      "https://api.iconify.design/lucide:alert-triangle.svg?color=%23d97706"
  };

  function addStatusMessage(text, type = "success") {

    if (!messages) return null;

    const iconUrl =
      STATUS_ICONS[type] || STATUS_ICONS.success;

    const group =
      document.createElement("div");

    group.className =
      "message-group message-bot message-status";

    group.innerHTML = `
      <div class="message-avatar-wrapper">
        <img
          src="icons/chatbot.png"
          alt=""
          class="message-avatar"
        />
      </div>

      <div class="message-flow">

        <div class="message-card message-card-status">
          <img
            src="${iconUrl}"
            alt=""
            width="18"
            height="18"
            class="status-icon"
          />
          <span>${escapeHTML(text)}</span>
        </div>

      </div>
    `;

    messages.appendChild(group);

    scrollToBottom();

    return group;
  }

  // ==========================================================
  // VOICE MESSAGE PLACEHOLDER (icon-based, replaces emoji)
  // ==========================================================

  (function injectVoiceMessageStyles() {

    if (document.getElementById("voice-message-badge-styles")) {
      return;
    }

    const style =
      document.createElement("style");

    style.id = "voice-message-badge-styles";

    style.textContent = `
      .voice-message-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .voice-message-icon {
        width: 16px;
        height: 16px;
        object-fit: contain;
        flex-shrink: 0;
      }
      @media (prefers-color-scheme: dark) {
    .voice-message-icon {
      filter: invert(1) brightness(2);
    }
  }
    `;

    document.head.appendChild(style);
  })();

  function addVoiceMessagePlaceholder() {

    if (!messages) return null;

    const group =
      document.createElement("div");

    group.className = "message-group message-user";

    group.innerHTML = `
      <div class="message-flow">

        <div class="message-card">
          <span class="voice-message-badge">
            <img src="icons/voice.png" alt="" class="voice-message-icon" />
            Voice message
          </span>
        </div>

        <span class="message-time">${formatTime()}</span>

      </div>
    `;

    messages.appendChild(group);

    scrollToBottom();

    return group;
  }

  function addMessage(
    text,
    role = "assistant"
  ) {

    if (!messages) return null;

    const group =
      document.createElement("div");

    group.className =
      `message-group message-${role === "user" ? "user" : "bot"}`;


    if (role === "assistant") {

      group.innerHTML = `
        <div class="message-avatar-wrapper">
          <img
            src="icons/chatbot.png"
            alt=""
            class="message-avatar"
          />
        </div>

        <div class="message-flow">

          <div class="message-card">
            ${formatMessage(text)}
          </div>

          <span class="message-time">${formatTime()}</span>

        </div>
      `;

    } else {

      group.innerHTML = `
        <div class="message-flow">

          <div class="message-card">
            ${formatMessage(text)}
          </div>

          <span class="message-time">${formatTime()}</span>

        </div>
      `;
    }

    messages.appendChild(group);

    scrollToBottom();

    return group;
  }


  function trimHistory() {

    if (conversationHistory.length > maxHistory) {

      conversationHistory =
        conversationHistory.slice(-maxHistory);
    }
  }


  async function encodeAttachments(files) {

    files = files || [];

    if (!files.length) {
      return [];
    }

    return Promise.all(
      files.map(file => new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result.split(",")[1]
        });

        reader.onerror = reject;

        reader.readAsDataURL(file);
      }))
    );
  }


  function setTyping(visible) {

    if (!typingIndicator || !messages) return;

    if (visible) {
      // Move it to the very end of the conversation every time —
      // otherwise it stays pinned wherever it originally sat in the
      // DOM (right after the welcome message) and ends up floating
      // above newer messages instead of below them.
      messages.appendChild(typingIndicator);

      typingIndicator.style.display = "flex";
      typingIndicator.classList.remove("typing-indicator-exit");
      void typingIndicator.offsetWidth; // restart animation
      typingIndicator.classList.add("typing-indicator-enter");
      scrollToBottom();
    } else {
      typingIndicator.classList.remove("typing-indicator-enter");
      typingIndicator.classList.add("typing-indicator-exit");
      setTimeout(() => {
        typingIndicator.style.display = "none";
        typingIndicator.classList.remove("typing-indicator-exit");
      }, 150);
    }
  }

  // ==========================================================
  // BUILD BUSINESS CONTEXT
  // ==========================================================
  //
  // IMPORTANT:
  //
  // We only send configured public business information.
  // API credentials are NEVER included here.
  //

  function buildBusinessContext() {

    if (!capabilities.useBusinessData) {
      return "";
    }


    return JSON.stringify(
      {
        business,
        services:
          business.services || [],

        products:
          business.products || [],

        menu:
          business.menu || [],

        faq:
          business.faq || [],

        customData:
          business.customData || {}
      },
      null,
      2
    );
  }


  // ==========================================================
  // BUILD SYSTEM INSTRUCTIONS
  // ==========================================================

  function buildSystemPrompt() {

    const instructions =
      Array.isArray(config.instructions)
        ? config.instructions.join("\n")
        : "";


    let prompt = `
You are ${assistant.name || "an AI assistant"}.

Your personality:
${assistant.tone || "friendly and professional"}

Language:
${assistant.language || "auto"}

CORE RULES:

${instructions}
`;


    // --------------------------------------------------------
    // RESTRICTIONS
    // --------------------------------------------------------

    if (restrictions.enabled) {

      prompt += `

RESTRICTED TOPICS:

The following topics are outside the configured assistant scope:

${(restrictions.topics || [])
  .map(topic => `- ${topic}`)
  .join("\n")}

If a user asks about a restricted business topic,
respond with:

${restrictions.fallback || "I can't help with that."}
`;
    }


    // --------------------------------------------------------
    // CONTACT
    // --------------------------------------------------------

    if (contact.enabled && capabilities.contact) {

      prompt += `

CONTACT:

Contact assistance is enabled.

Available fields:
${(contact.fields || [])
  .map(field => `- ${field}`)
  .join("\n")}

Guide the user through providing these details naturally, one
or two at a time — don't demand all of them in a single message.

Once you have every field AND the user has confirmed the
details are correct (e.g. they said "yes" / "that's right" /
"send it"), end your reply with this exact trigger followed
immediately by a single-line JSON object of the collected
fields, using the same field names listed above:

${contact.trigger || "@@CONTACT_SUBMIT@@"}{"field":"value", ...}

Rules for this trigger line:
- Put it as plain text on its own line, exactly as shown above.
- Do NOT wrap it in a bullet, list item, heading, code block, or
  any other markdown formatting.
- Do not add any text after the JSON on that line.
- Do not explain the trigger to the user — it is stripped out
  before they see the message.
- Only emit it ONCE, the single time the user confirms. If the
  user says "yes" again afterward for any reason, do not emit
  the trigger a second time for the same details — just
  acknowledge them normally.

Never say the message was sent, received, or delivered
yourself. Only the application knows whether delivery actually
succeeded — after you emit the trigger, the app handles telling
the user whether it went through.
`;
    }


    // --------------------------------------------------------
    // BOOKING
    // --------------------------------------------------------

    if (booking.enabled && capabilities.booking) {

      prompt += `

BOOKING:

Booking assistance is enabled.

When the user clearly wants to book an appointment,
reservation, consultation, demonstration, or similar action,
you should identify the booking intent.

Booking trigger:
${booking.trigger || "#booking"}

Important:

Do NOT claim that a booking has been completed.

The booking interface must actually confirm completion.

If appropriate, emit the booking trigger:
${booking.trigger || "#booking"}
`;
    }


    // --------------------------------------------------------
    // SUGGESTIONS
    // --------------------------------------------------------

    const suggestionsCfg = config.suggestions || {};

    if (suggestionsCfg.enabled) {

      prompt += `

FOLLOW-UP SUGGESTIONS:

After your reply, think of ${suggestionsCfg.count || 3} short things the
USER might want to say next (a few words each, no numbering, no emoji).

End your reply with this exact trigger on its own line, followed
immediately by a single-line JSON array of those strings:

${suggestionsCfg.trigger || "@@SUGGESTIONS@@"}["...", "...", "..."]

Rules:
- Plain text on its own line, no markdown around it, nothing after it.
- Never explain the trigger — it's stripped before the user sees it.
- These are things the USER would say next, not things you'd say.
`;
    }


    // --------------------------------------------------------
    // BUSINESS DATA
    // --------------------------------------------------------

    const context =
      buildBusinessContext();


    if (context) {

      prompt += `

BUSINESS DATA:

The following information is provided by the website owner.

Use it as factual context.

Do not invent information that is not present.

If information is missing, clearly say that you don't have
that information.

${context}
`;
    }


    return prompt.trim();
  }


  // ==========================================================
  // BOOKING TRIGGER
  // ==========================================================

  function detectBookingTrigger(text) {

    if (!booking.enabled) {
      return text;
    }

    const trigger =
      booking.trigger || "#booking";

    if (!text.includes(trigger)) {
      return text;
    }


    // Remove the internal trigger from visible text.
    const cleanText =
      text
        .replaceAll(trigger, "")
        .trim();


    // Tell the UI to open booking.
    openBooking();


    return cleanText;
  }


  // ==========================================================
  // OPEN BOOKING
  // ==========================================================

  function openBooking() {

    if (!booking.enabled) return;


    /*
     * Custom event allows the template owner to connect
     * ANY booking UI without changing chat.js.
     */

    window.dispatchEvent(
      new CustomEvent(
        "ai:booking",
        {
          detail: {
            config: booking
          }
        }
      )
    );


    // --------------------------------------------------------
    // Optional iframe behavior
    // --------------------------------------------------------

    if (
      booking.method === "iframe" &&
      booking.iframe?.enabled &&
      booking.url
    ) {

      openBookingIframe();
    }
  }


  function openBookingIframe() {

    if (
      booking.method !== "iframe" ||
      !booking.iframe?.enabled ||
      !booking.url
    ) {
      return;
    }

    let container =
      document.getElementById("ai-booking-container");

    if (container) return;

    // ------------------------------------------------------
    // CONTAINER
    // ------------------------------------------------------

    container = document.createElement("div");

    container.id = "ai-booking-container";

    container.style.cssText = `
      position:fixed;
      inset:0;
      z-index:1000000;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
      background:rgba(15,23,42,.35);
      backdrop-filter:blur(10px);
    `;


    // ------------------------------------------------------
    // MODAL
    // ------------------------------------------------------

    const modal =
      document.createElement("div");

    modal.style.cssText = `
      position:relative;
      width:min(720px,100%);
      height:min(700px,90vh);
      overflow:hidden;
      background:#fff;
      border-radius:20px;
      box-shadow:0 25px 70px rgba(0,0,0,.25);
    `;


    // ------------------------------------------------------
    // CLOSE BUTTON
    // ------------------------------------------------------

    const closeBtn =
      document.createElement("button");

    closeBtn.type = "button";
    closeBtn.setAttribute(
      "aria-label",
      "Close booking"
    );

    closeBtn.textContent = "×";

    closeBtn.style.cssText = `
      position:absolute;
      right:12px;
      top:12px;
      z-index:2;
      width:32px;
      height:32px;
      border:0;
      border-radius:50%;
      cursor:pointer;
      background:#fff;
      box-shadow:0 2px 10px rgba(0,0,0,.12);
      font-size:20px;
      line-height:1;
    `;


    // ------------------------------------------------------
    // IFRAME
    // ------------------------------------------------------

    const iframe =
      document.createElement("iframe");

    iframe.src = booking.url;

    iframe.title =
      booking.iframe.title ||
      "Booking";

    iframe.loading = "lazy";

    iframe.style.cssText = `
      width:100%;
      height:100%;
      border:0;
    `;


    // ------------------------------------------------------
    // CLOSE
    // ------------------------------------------------------

    const closeBooking = () => {
      container.remove();
    };

    closeBtn.addEventListener(
      "click",
      closeBooking
    );


    // Optional ESC support
    const handleEscape = event => {

      if (event.key === "Escape") {

        closeBooking();

        document.removeEventListener(
          "keydown",
          handleEscape
        );
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );


    // ------------------------------------------------------
    // BUILD
    // ------------------------------------------------------

    modal.appendChild(closeBtn);
    modal.appendChild(iframe);

    container.appendChild(modal);

    document.body.appendChild(container);
  }


  // ==========================================================
  // CONTACT SUBMIT TRIGGER
  // ==========================================================
  //
  // Mirrors detectBookingTrigger, but the trigger is followed by
  // a JSON payload of the fields the AI collected. We parse and
  // strip it, then hand the payload off to submitContactLead.
  //
  // IMPORTANT: this function only EXTRACTS the data from the
  // AI's reply. It never itself claims success — that only
  // happens after the real network request resolves, inside
  // submitContactLead.

  // Tracks a fingerprint of the last successfully-submitted
  // lead so a repeated/duplicated trigger in the same session
  // doesn't fire a second real submission.
  let lastSubmittedFingerprint = null;

  function detectContactTrigger(text) {

    const contactCfg =
      config.contact || {};

    if (!contactCfg.enabled) {
      return { cleanText: text, payload: null };
    }

    const trigger =
      contactCfg.trigger || "@@CONTACT_SUBMIT@@";

    let triggerIndex =
      text.indexOf(trigger);

    let matchLength =
      trigger.length;

    // --------------------------------------------------------
    // FALLBACK: if the exact trigger string isn't found (e.g.
    // it got mangled by markdown formatting somewhere upstream),
    // look for a trailing JSON object that actually contains the
    // configured contact fields. This keeps the feature working
    // even if the literal marker gets damaged in transit.
    // --------------------------------------------------------

    if (triggerIndex === -1) {

      const genericJsonMatch =
        text.match(/\{[^{}]*"(?:name|email|phone|message)"[\s\S]*\}\s*$/);

      if (!genericJsonMatch) {
        return { cleanText: text, payload: null };
      }

      triggerIndex = genericJsonMatch.index;
      matchLength = 0;
    }

    const afterTrigger =
      text.slice(triggerIndex + matchLength).trim();

    let payload = null;

    try {

      const jsonMatch =
        afterTrigger.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        payload = JSON.parse(jsonMatch[0]);
      }

    } catch (error) {
      console.warn(
        "[AI Chat] Could not parse contact payload:",
        error
      );
    }

    // Strip the trigger AND any leftover markdown list/heading
    // marker immediately before it (e.g. "- ", "* ", "# ").
    let cleanText =
      text.slice(0, triggerIndex);

    cleanText =
      cleanText.replace(/[#*\-]\s*$/, "").trim();

    // --------------------------------------------------------
    // DEDUP: same payload as last time already submitted?
    // Return it as "cleanText only" (no payload) so it doesn't
    // fire a second real network request.
    // --------------------------------------------------------

    if (payload) {

      const fingerprint =
        JSON.stringify(payload);

      if (fingerprint === lastSubmittedFingerprint) {
        return { cleanText, payload: null };
      }
    }

    return { cleanText, payload };
  }


  // ==========================================================
  // SUGGESTIONS TRIGGER
  // ==========================================================

  function detectSuggestionsTrigger(text) {

    const cfg = config.suggestions || {};

    if (!cfg.enabled) {
      return { cleanText: text, suggestions: null };
    }

    const trigger = cfg.trigger || "@@SUGGESTIONS@@";

    const idx = text.indexOf(trigger);

    if (idx === -1) {
      return { cleanText: text, suggestions: null };
    }

    const after = text.slice(idx + trigger.length).trim();

    let suggestions = null;

    try {

      const match = after.match(/\[[\s\S]*\]/);

      if (match) {

        const parsed = JSON.parse(match[0]);

        if (Array.isArray(parsed)) {

          suggestions = parsed
            .filter(s => typeof s === "string" && s.trim())
            .slice(0, cfg.count || 3);
        }
      }

    } catch (error) {
      console.warn("[AI Chat] Could not parse suggestions:", error);
    }

    let cleanText = text.slice(0, idx);

    cleanText = cleanText.replace(/[#*\-]\s*$/, "").trim();

    return { cleanText, suggestions };
  }


  function renderSuggestionChips(suggestions) {

    if (!messages || !suggestions?.length) return;

    document.querySelectorAll(".suggestion-row")
      .forEach(el => el.remove());

    const row = document.createElement("div");

    row.className = "suggestion-row";

    row.innerHTML = suggestions
      .map(s => `<button type="button" class="prompt-chip">${escapeHTML(s)}</button>`)
      .join("");

    messages.appendChild(row);

    scrollToBottom();
  }


  // ==========================================================
  // SUBMIT CONTACT LEAD
  // ==========================================================
  //
  // Sends the collected fields to whatever provider is
  // configured in contact.delivery. Nothing here requires a
  // secret key — Formspree endpoints and Web3Forms access keys
  // are designed to be used directly from the browser and are
  // restricted by allowed domain on the provider's side, not by
  // secrecy. Buyers plug in their own values; nothing is shared
  // between installs.

  async function submitContactLead(payload) {

    const delivery =
      (config.contact && config.contact.delivery) || {};

    const failureMessage =
      delivery.failureMessage ||
      "That didn't go through automatically — please reach out directly instead.";

    if (!delivery.enabled || delivery.provider === "none") {

      console.warn(
        "[AI Chat] Contact delivery is disabled. " +
        "Enable it in ai-config.js under contact.delivery."
      );

      return {
        ok: false,
        message: failureMessage
      };
    }

    try {

      let response;

      if (delivery.provider === "formspree") {

        if (!delivery.endpoint) {
          throw new Error("Formspree endpoint is not configured.");
        }

        response = await fetch(delivery.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

      } else if (delivery.provider === "web3forms") {

        if (!delivery.accessKey) {
          throw new Error("Web3Forms access key is not configured.");
        }

        response = await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              access_key: delivery.accessKey,
              ...payload
            })
          }
        );

      } else if (delivery.provider === "webhook") {

        if (!delivery.endpoint) {
          throw new Error("Webhook endpoint is not configured.");
        }

        response = await fetch(delivery.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

      } else {

        throw new Error(
          `Unknown contact.delivery.provider: "${delivery.provider}"`
        );
      }

      if (!response.ok) {
        throw new Error(
          `Delivery request failed with status ${response.status}`
        );
      }

      return { ok: true };

    } catch (error) {

      console.error(
        "[AI Chat] Contact delivery failed:",
        error
      );

      return {
        ok: false,
        message: failureMessage
      };
    }
  }


  // ==========================================================
  // SEND MESSAGE (text + optional attachments)
  // ==========================================================

  async function sendMessage() {

    if (!textarea || isSending) {
      return;
    }


    const message =
      textarea.value.trim();


    if (!message) {
      return;
    }


    isSending = true;

    sendBtn?.setAttribute(
      "disabled",
      "true"
    );


    // --------------------------------------------------------
    // USER MESSAGE
    // --------------------------------------------------------

    addMessage(
      message,
      "user"
    );


    textarea.value = "";

    textarea.style.height = "24px";

    // Programmatic value changes don't fire a native 'input'
    // event, but the widget script listens for 'input' to swap
    // the send/mic icon based on whether there's text. Without
    // this, the icon stays stuck on "send" after the first
    // message even though the box is now empty.
    textarea.dispatchEvent(
      new Event("input", { bubbles: true })
    );


    // --------------------------------------------------------
    // CLEAR ATTACHMENT PREVIEW
    // --------------------------------------------------------
    //
    // Captured first so the actual files still get sent to the
    // AI, THEN cleared from the UI-facing array immediately —
    // not gated on the network request succeeding, otherwise a
    // slow or failed AI response leaves the image stuck in the
    // input area.

    const pendingAttachments =
      window.chatAttachments || [];

    window.chatAttachments = [];

    window.dispatchEvent(
      new CustomEvent("ai:attachments-sent")
    );


    // --------------------------------------------------------
    // HISTORY
    // --------------------------------------------------------

    conversationHistory.push({
      role: "user",
      content: message
    });

    trimHistory();


    // --------------------------------------------------------
    // TYPING
    // --------------------------------------------------------

    setTyping(true);


    try {

      const attachments =
        await encodeAttachments(pendingAttachments);

      const response =
        await fetch(
          "/api/ai",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              message,

              history:
                conversationHistory,

              system:
                buildSystemPrompt(),

              attachments
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.error ||
          "AI request failed."
        );
      }


      let reply =
        data?.message || "";


      if (!reply) {

        throw new Error(
          "The AI returned an empty response."
        );
      }


      // ------------------------------------------------------
      // BOOKING TRIGGER
      // ------------------------------------------------------

      reply =
        detectBookingTrigger(reply);


      // ------------------------------------------------------
      // CONTACT SUBMIT TRIGGER
      // ------------------------------------------------------

      const contactResult =
        detectContactTrigger(reply);

      reply = contactResult.cleanText;


      const suggestionsResult =
        detectSuggestionsTrigger(reply);

      reply = suggestionsResult.cleanText;


      if (reply) {

        addMessage(
          reply,
          "assistant"
        );
      }


      conversationHistory.push({
        role: "assistant",
        content: reply
      });

      trimHistory();


      if (suggestionsResult.suggestions) {
        renderSuggestionChips(suggestionsResult.suggestions);
      }


      if (contactResult.payload) {

        lastSubmittedFingerprint =
          JSON.stringify(contactResult.payload);

        submitContactLead(contactResult.payload)
          .then(result => {

            const confirmation =
              result.ok
                ? "Sent — thanks, someone will get back to you soon."
                : result.message;

            addStatusMessage(
              confirmation,
              result.ok ? "success" : "warning"
            );

            conversationHistory.push({
              role: "assistant",
              content: confirmation
            });

            trimHistory();
          });
      }


    } catch (error) {

      console.error(
        "Chat error:",
        error
      );

      addMessage(
        "Sorry, something went wrong. Please try again.",
        "assistant"
      );

    } finally {

      setTyping(false);

      isSending = false;

      sendBtn?.removeAttribute(
        "disabled"
      );

      textarea?.focus();
    }
  }


  // ==========================================================
  // SEND VOICE MESSAGE
  // ==========================================================
  //
  // Called by the widget's mic recorder once a recording stops.
  // Sends the raw audio straight to /api/ai — no separate
  // transcription endpoint. The server tries native audio input
  // first, then falls back to Whisper (see ai.js) if configured.
  //
  // Exposed on window so the widget script (which owns the
  // MediaRecorder) can call it without this file needing to
  // know anything about recording.

  async function sendVoiceMessage(audioBlob, mimeType) {

    if (isSending) return;

    isSending = true;

    sendBtn?.setAttribute("disabled", "true");

    setTyping(true);

    try {

      const base64Data =
        await new Promise((resolve, reject) => {

          const reader = new FileReader();

          reader.onload = () =>
            resolve(reader.result.split(",")[1]);

          reader.onerror = reject;

          reader.readAsDataURL(audioBlob);
        });


      const response =
        await fetch(
          "/api/ai",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              message: "",

              history:
                conversationHistory,

              system:
                buildSystemPrompt(),

              audio: {
                data: base64Data,
                mimeType: mimeType || "audio/webm"
              }
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.error ||
          "Voice request failed."
        );
      }


      // Show what the user "said" — the real transcript if
      // Whisper ran as a fallback, or a generic placeholder if
      // a provider (e.g. Gemini) handled the audio natively
      // with no transcript returned.

           const userLabel =
        data?.transcript || null;

      if (userLabel) {
        addMessage(userLabel, "user");
      } else {
        addVoiceMessagePlaceholder();
      }
      conversationHistory.push({
        role: "user",
        content: data?.transcript || "[voice message]"
      });

      trimHistory();


      let reply =
        data?.message || "";


      if (!reply) {

        throw new Error(
          "The AI returned an empty response."
        );
      }


      reply =
        detectBookingTrigger(reply);


      const contactResult =
        detectContactTrigger(reply);

      reply = contactResult.cleanText;


      const suggestionsResult =
        detectSuggestionsTrigger(reply);

      reply = suggestionsResult.cleanText;


      if (reply) {

        addMessage(
          reply,
          "assistant"
        );
      }


      conversationHistory.push({
        role: "assistant",
        content: reply
      });

      trimHistory();


      if (suggestionsResult.suggestions) {
        renderSuggestionChips(suggestionsResult.suggestions);
      }


      if (contactResult.payload) {

        lastSubmittedFingerprint =
          JSON.stringify(contactResult.payload);

        submitContactLead(contactResult.payload)
          .then(result => {

            const confirmation =
              result.ok
                ? "Sent — thanks, someone will get back to you soon."
                : result.message;

            addStatusMessage(
              confirmation,
              result.ok ? "success" : "warning"
            );

            conversationHistory.push({
              role: "assistant",
              content: confirmation
            });

            trimHistory();
          });
      }


    } catch (error) {

      console.error(
        "Voice message error:",
        error
      );


      addMessage(
        "Sorry, I couldn't process that voice message. Please try again.",
        "assistant"
      );

    } finally {

      setTyping(false);

      isSending = false;

      sendBtn?.removeAttribute(
        "disabled"
      );
    }
  }

  window.sendVoiceMessage = sendVoiceMessage;


  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  sendBtn?.addEventListener(
    "click",
    () => {

      const text =
        textarea?.value.trim();

      if (!text) {
        return;
      }

      sendMessage();
    }
  );


  // ==========================================================
  // ENTER TO SEND
  // ==========================================================

  textarea?.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();
      }
    }
  );


  // ==========================================================
  // QUICK PROMPTS
  // ==========================================================

  document.addEventListener(
    "click",
    event => {

      const chip =
        event.target.closest(
          ".prompt-chip"
        );

      if (!chip) return;


      const text =
        chip.textContent.trim();


      if (!text) return;


      chip.closest(".suggestion-row")?.remove();


      textarea.value =
        text
          .replace(/^✨\s*/, "")
          .replace(/^⚡\s*/, "");


      textarea.dispatchEvent(
        new Event(
          "input",
          {
            bubbles: true
          }
        )
      );


      sendMessage();
    }
  );

  // ==========================================================
  // RESTART CONVERSATION
  // ==========================================================

  window.addEventListener("ai:reset", () => {

    conversationHistory = [];

    lastSubmittedFingerprint = null;

    if (messages) {
      messages.innerHTML = "";
    }

    addMessage(
      assistant.welcomeMessage ||
        "Hey there! 👋 How can I help you today?",
      "assistant"
    );
  });


  // ==========================================================
  // INITIALIZATION
  // ==========================================================

  const welcomeTimeEl =
    document.getElementById("chat-welcome-time");

  if (welcomeTimeEl) {
    welcomeTimeEl.textContent = formatTime();
  }

  console.log(
    `[AI Chat] ${assistant.name || "Assistant"} initialized.`
  );

});
