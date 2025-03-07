const routes = {
  home: "/",
  auth: {
    login: "/login",
    register: "/register"
  },
  img: {
    lootopia: "/img/lootopia.png",
    notFound: "/img/404.png",
    trasureNoBg: "/img/treasure-removebg-preview.png"
  },
  api: {
    auth: {
      register: "/users/register",
      verify: (email: string, activationCode: string) =>
        `/users/verify?email=${email}&activationCode=${activationCode}`
    }
  }
}

export default routes
