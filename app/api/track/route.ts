// app/api/track/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

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

    // Prioritize client-side referrer (document.referrer), fall back to HTTP header
    const effectiveReferrer = clientReferrer || headerReferrer;
    const detectedSource = parseSource(effectiveReferrer, utmSource);

    const { error } = await supabaseServer.from('visitor_tracks').insert({
      referrer: effectiveReferrer || 'direct',
      source: detectedSource,
      path: clientPath || '/',
      user_agent: userAgent,
    });

    if (error) {
      console.error('Supabase track error:', error);
      return NextResponse.json({ error: 'Failed to record visit' }, { status: 500 });
    }

    return NextResponse.json({ success: true, source: detectedSource });
  } catch (err) {
    console.error('Tracking API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}