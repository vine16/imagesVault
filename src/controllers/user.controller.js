export default class UserController {
  getRegister(req, res) {
    return res.render("register", {
      errorMessage: null,
    });
  }

  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
    });
  }
}
