import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const SPOTIFY_AUTHORIZATION_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });


async function refreshAccessToken(token) {
  const encoded = Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString('base64');
  try {
    const url =
      "https://accounts.spotify.com/api/token?" +
      new URLSearchParams({
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Basic' + encoded
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: 'user-read-email playlist-read-private user-read-currently-playing',
      authorizationUrl: SPOTIFY_AUTHORIZATION_URL,
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session(session, token) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
});