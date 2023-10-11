const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

router.get("/create", (req, res) => {
  //console.log(req.user); // after authMiddleware set-up we will be able to see who is the user that hit the create cube button
  res.render("cube/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id, // this is id of the user who sends the current request and becomes owner of the cube
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  if (!cube) {
    return res.redirect("/404");
  }

  res.render("cube/details", { cube });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getAll().lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { cube, accessories, hasAccessories });
});

router.get("/:cubeId/delete", async (req, res) => {
  // display the form data again before delete
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  res.render("cube/delete", {cube});
});

module.exports = router;
