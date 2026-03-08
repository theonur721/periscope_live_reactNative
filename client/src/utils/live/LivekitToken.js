import axios from 'axios';

export const fetchLivekitToken = async ({ apiBase, identity, room, role }) => {
  const res = await axios.get(
    `${apiBase}/api/livekit/token?identity=${identity}&room=${room}&role=${role}`,
    { timeout: 15000 },
  );

  const rawUrl = res?.data?.url;
  const rawToken = res?.data?.token;

  if (!rawUrl || !rawToken) {
    throw new Error('Token response eksik (url/token yok)');
  }

  console.log('TOKEN RESPONSE:', res.data);
  console.log('LIVEKIT URL(https):', rawUrl);
  console.log('TOKEN LEN:', String(rawToken).length);

  return {
    url: String(rawUrl), // ✅ https 그대로
    token: String(rawToken), // ✅ jwt
    data: res.data,
  };
};
