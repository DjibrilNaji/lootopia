const apiRoutes = {
  home: "/",
  api: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    verifyMFA: () => "/2fa/verify-code"
  }
}
export default apiRoutes
