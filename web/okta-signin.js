let authClient = new OktaAuth({
    url: `https://${oktaDomain}`,
    clientId: `${clientId}`,
    redirectUri: window.location.href,
    issuer: `https://${oktaDomain}/oauth2/default`
  });

function sendLoginRequest(idToken) {
  const loginRequest = new CustomEvent('login-request', { 
      detail: {
          token: idToken.value
      }
  });
  window.dispatchEvent(loginRequest);
}

function getIdToken() {
  if (authClient.token.isLoginRedirect()) {
    // Parse token from redirect url
    authClient.token.parseFromUrl()
      .then(data => {
        const { idToken } = data.tokens;
        // Store parsed token in Token Manager
        authClient.tokenManager.add('idToken', idToken);
        sendLoginRequest(idToken);
      });
  } else {
    // Attempt to retrieve ID Token from Token Manager
    authClient.tokenManager.get('idToken')
      .then(idToken => {
        if (idToken) {
          sendLoginRequest(idToken);
        } else {
          // You're not logged in, you need a sessionToken
          authClient.token.getWithRedirect({
            responseType: 'id_token'
          });
        }
      })
  }
}

window.addEventListener('login-widget', (e) => {
  getIdToken();
}, false);

window.addEventListener('logout', (e) => {
  authClient.signOut();
}, false);
