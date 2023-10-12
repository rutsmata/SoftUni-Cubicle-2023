const router = require("express").Router();

const userManager = require("../managers/userManager");
const { extractErrorMsgs } = require("../utils/errorHandler");

// render page
router.get("/register", (req, res) => {
  res.render("users/register");
});

// upon fill the form, invoke method register and redirect the page
router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;



  try {
    

    await userManager.register({ username, password, repeatPassword });

    res.redirect("/users/login");

  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("users/register", { errorMessages });
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userManager.login(username, password);

    //create cookie to be provided to the browser upon log-in
    res.cookie("auth", token, { httpOnly: true });

    res.redirect("/");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("users/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
