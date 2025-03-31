const routes = {
  home: "/",
  auth: {
    login: "/login",
    register: "/register"
  },
  contact: "/contact",
  img: {
    lootopia: "/img/lootopia.png",
    notFound: "/img/404.png",
    trasureNoBg: "/img/treasure-removebg-preview.png"
  },
  api: {
    auth: {
      register: "/users/register",
      login: "/users/login",
      logout: "/users/logout",
      verify: (email: string, activationCode: string) =>
        `/users/verify?email=${email}&activationCode=${activationCode}`,
       verifyMFA: () => "/2fa/verify-code",
      validateToken: "/users/validateToken",
      refreshToken: "/users/refresh"
    },
    contact: "/contact"
  }
}

export default routes
