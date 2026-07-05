import http from 'node:http';
import { URL } from 'node:url';
import { exec } from 'node:child_process';
import fs from 'node:fs';

const envPath = '.env';

function loadEnv() {
  if (!fs.existsSync(envPath)) {
    throw new Error('.env file was not found.');
  }

  const env = {};
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

    env[key] = value;
  }

  return env;
}

const env = loadEnv();

const clientId = env.GOOGLE_CLIENT_ID;
const clientSecret = env.GOOGLE_CLIENT_SECRET;
const redirectUri = env.GOOGLE_REDIRECT_URI || 'http://localhost:4321/google-gbp/callback';
const scope = env.GOOGLE_BUSINESS_SCOPE || 'https://www.googleapis.com/auth/business.manage';

if (!clientId || !clientSecret) {
  throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env');
}

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('redirect_uri', redirectUri);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', scope);
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, redirectUri);

  if (requestUrl.pathname !== '/google-gbp/callback') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Google returned error: ${error}`);
    server.close();
    return;
  }

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Missing code.');
    return;
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error(tokens);

      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Token exchange failed. Check terminal.');
      server.close();
      return;
    }

    console.log('\nGoogle OAuth tokens received:\n');
    console.log(JSON.stringify(tokens, null, 2));

    if (tokens.refresh_token) {
      console.log('\nAdd this to your .env:\n');
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    } else {
      console.log('\nNo refresh_token returned. Try deleting app access from your Google account and run again.');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Success. You can close this tab and check the terminal.');

    server.close();
  } catch (error) {
    console.error(error);

    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Unexpected error. Check terminal.');

    server.close();
  }
});

server.listen(4321, () => {
  console.log(`Listening on ${redirectUri}`);
  console.log('Opening Google OAuth URL...');

  const command =
    process.platform === 'win32'
      ? `start "" "${authUrl.toString()}"`
      : process.platform === 'darwin'
        ? `open "${authUrl.toString()}"`
        : `xdg-open "${authUrl.toString()}"`;

  exec(command);
});