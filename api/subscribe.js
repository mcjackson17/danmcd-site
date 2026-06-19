const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2/publications';

module.exports = async function subscribe(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.error('Missing beehiiv environment variables.');
    return response.status(500).json({ error: 'Newsletter signup is temporarily unavailable.' });
  }

  let body = request.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return response.status(400).json({ error: 'Invalid request.' });
    }
  }

  const email = String(body.email || '').trim().toLowerCase();
  const website = String(body.website || '').trim();

  // Honeypot fields are filled by bots, not people.
  if (website) return response.status(200).json({ ok: true });

  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  try {
    const beehiivResponse = await fetch(
      `${BEEHIIV_API_URL}/${encodeURIComponent(publicationId)}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'danmcd.io',
          utm_medium: 'website',
          utm_campaign: 'site_optin',
          referring_site: request.headers.referer || 'https://danmcd.io',
        }),
      },
    );

    const result = await beehiivResponse.json().catch(() => ({}));

    if (!beehiivResponse.ok) {
      console.error('beehiiv subscription failed', beehiivResponse.status, result);
      const message = beehiivResponse.status === 400
        ? 'That email could not be subscribed. Please check it and try again.'
        : 'Newsletter signup is temporarily unavailable.';
      return response.status(beehiivResponse.status).json({ error: message });
    }

    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error('beehiiv request error', error);
    return response.status(500).json({ error: 'Newsletter signup is temporarily unavailable.' });
  }
};
