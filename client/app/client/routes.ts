const routes = {
  home: "/",
  auth: {
    login: "/login",
    register: "/register"
  },
  contact: "/contact",
  profile: "/profile",
  account: "/account",
  hunts: {
    create: "/hunts/create",
    list: "/hunts",
    one: (name: string) => `/hunts/${name}`
  },
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
      updatePassword: "/auth/update-password"
    },
    contact: "/contact",
    hunt: {
      create: (email: string) => `/hunts/create?email=${email}`,
      all: "/hunts",
      one: (slug: string) => `/hunts/${slug}`
    },
    user: {
      update: (userId: number) => `/users/${userId}`,
      one: (email: string) => `/users/${email}`
    }
  }
}

export default routes
