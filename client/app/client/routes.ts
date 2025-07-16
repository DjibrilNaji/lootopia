const routes = {
  home: "/",
  auth: {
    login: "/login",
    register: "/register"
  },
  contact: "/contact",
  profile: "/profile",
  account: "/account",
  backoffice: "/backoffice",
  hunts: {
    create: "/hunts/create",
    list: "/hunts",
    myHunts: (username: string) => `/hunts/${username}/list`,
    one: (name: string) => `/hunts/${name}`,
    edit: (name: string) => `/hunts/edit/${name}`
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
      desactivate: "/auth/desactivate",
      delete: "/auth/delete",
      verify: (email: string, activationCode: string) =>
        `/auth/verify?email=${email}&activationCode=${activationCode}`,
      verifyMFA: () => "/2fa/verify-code",
      updatePassword: "/auth/update-password"
    },
    contact: "/contact",
    hunt: {
      create: (email: string) => `/hunts/create?email=${email}`,
      update: (email: string) => `/hunts/update?email=${email}`,
      all: (email?: string) => `/hunts?email=${email ?? ""}`,
      one: (slug: string) => `/hunts/${slug}`
    },
    user: {
      update: (userId: number) => `/users/${userId}`,
      one: (email: string) => `/users/${email}`,
      delete: (userId: number) => `/users/${userId}`,
      all: "/users",
      getAllDataLength: "/users/data-length"
    }
  }
}

export default routes
