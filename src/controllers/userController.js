const router = require("express").Router();

const userManager = require("../managers/userManager");

// render page
router.get("/register", (req, res) => {
  res.render("users/register");
});

// upon fill the form, invoke method register and redirect the page
router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  await userManager.register({ username, password, repeatPassword });

  res.redirect("/users/login");
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userManager.login(username, password);

  //create cookie to be provided to the browser upon log-in
  res.cookie("username", user.username);

  res.redirect("/");
});

module.exports = router;
