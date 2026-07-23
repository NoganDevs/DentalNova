// app/api/track/route.ts
import { NextResponse } from 'next/server';
import { after } from 'next/server'; // Or import { after } from 'next/server' depending on Next.js version
import { supabaseServer } from '@/app/lib/supabaseServer';

function parseSource(referrer: string, utmSource: string | null): string {
  if (utmSource) return utmSource.toLowerCase();

  const ref = referrer.toLowerCase();
  if (!ref) return 'direct';
  if (ref.includes('instagram.com') || ref.includes('l.instagram.com')) return 'instagram';
  if (ref.includes('mail.google.com') || ref.includes('gmail')) return 'gmail';
  if (ref.includes('google.com') || ref.includes('google')) return 'google';
  if (ref.includes('t.co') || ref.includes('twitter.com') || ref.includes('x.com')) return 'x/twitter';
  if (ref.includes('linkedin.com')) return 'linkedin';
  if (ref.includes('facebook.com')) return 'facebook';

  try {
    const url = new URL(ref);
    return url.hostname;
  } catch {
    return 'other';
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientReferrer, clientPath, utmSource } = body;

    const reqHeaders = request.headers;
    const headerReferrer = reqHeaders.get('referer') || '';
    const userAgent = reqHeaders.get('user-agent') || 'unknown';

    const effectiveReferrer = clientReferrer || headerReferrer;
    const detectedSource = parseSource(effectiveReferrer, utmSource);

    // Run database insert asynchronously AFTER response is returned to client
    const logTask = async () => {
      const { error } = await supabaseServer.from('visitor_tracks').insert({
        referrer: effectiveReferrer || 'direct',
        source: detectedSource,
        path: clientPath || '/',
        user_agent: userAgent,
      });

      if (error) {
        console.error('Supabase track error:', error);
      }
    };

    // Use Next.js native background task handler if available, otherwise fire-and-forget
    if (typeof after === 'function') {
      after(logTask);
    } else {
      logTask().catch((err) => console.error('Tracking insert background error:', err));
    }

    // Immediately respond to the client so connection closes instantly
    return NextResponse.json({ success: true, source: detectedSource }, { status: 200 });
  } catch (err) {
    console.error('Tracking API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
