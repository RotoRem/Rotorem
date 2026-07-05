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

async function getAccessToken(env) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error('Failed to refresh access token.');
  }

  return data.access_token;
}

async function listAccounts(accessToken) {
  const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error('Failed to list accounts.');
  }

  return data.accounts || [];
}

async function listLocations(accessToken, accountName) {
  const url = new URL(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`);

  url.searchParams.set('readMask', [
    'name',
    'title',
    'storefrontAddress',
    'metadata',
    'phoneNumbers',
    'websiteUri',
    'regularHours',
  ].join(','));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(`Failed to list locations for ${accountName}.`);
  }

  return data.locations || [];
}

const env = loadEnv();

for (const key of ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN']) {
  if (!env[key]) {
    throw new Error(`Missing ${key} in .env`);
  }
}

const accessToken = await getAccessToken(env);
const accounts = await listAccounts(accessToken);

const result = [];

for (const account of accounts) {
  const locations = await listLocations(accessToken, account.name);

  result.push({
    account,
    locations,
  });
}

console.log(JSON.stringify(result, null, 2));