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
      register: "/auth/register",
      login: "/auth/login",
      logout: "/auth/logout",
      verify: (email: string, activationCode: string) =>
        `/auth/verify?email=${email}&activationCode=${activationCode}`,
      verifyMFA: () => "/2fa/verify-code",
    },
    contact: "/contact"
  }
}

export default routes
