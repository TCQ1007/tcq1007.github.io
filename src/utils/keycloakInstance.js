import Keycloak from "keycloak-js";


export const keycloakInstance = new Keycloak({
  url: "https://usw2.auth.ac/auth",
  realm: "twillcloud",
  clientId: "LoginWeb",
});

export const init = () => {
  keycloakInstance
    .init({ checkLoginIframe: false, onLoad: "login-required" })
    .then((authorizated) => {
      console.log("init" + authorizated);
      console.log("isTokenExpired" + keycloakInstance.isTokenExpired());
      if(authorizated) {
        startTokenRefreshLoop()
      }
    });
};

export function startTokenRefreshLoop() {
  setInterval(() => {
      keycloakInstance.updateToken(30) // 在令牌过期前 30 秒进行刷新
      .then(refreshed => {
        if (refreshed) {
          console.log('Token refreshed successfully');
        } else {
          console.log('Token is still valid');
        }
      })
      .catch(err => {
        console.error('Failed to refresh token', err);
        keycloak.login(); // 如果刷新失败，重新登录
      });
  }, 10000); // 每 10 秒检查一次令牌
}
  


