const Lixo = require("../models/Lixo");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newLixo = new Lixo(req.body);

  try {
    const savedLixo = await newLixo.save();
    res.status(200).json(savedLixo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
try {
    const updatedLixo = await Lixo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedLixo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try{
    await Lixo.findByIdAndDelete(req.params.id)
    res.status(200).json("Lixo has been deleted...")
  }catch(err){
    res.status(500).json(err)
  }
});

//GET USER LIXO
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const lixo = await Lixo.findOne({userId: req.params.userId});
    res.status(200).json(lixo);
  } catch(err){
    res.status(500).json(err);
  }
});  

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {

  try {
    const lixos = await Lixo.find();
    res.status(200).json(lixos);
  } catch(err){
    res.status(500).json(err);
  }
});  

module.exports = router;