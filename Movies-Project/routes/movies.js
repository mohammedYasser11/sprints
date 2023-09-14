const express = require("express");

const { body, validationResult } = require("express-validator");
                
const Movie = require('../schemas/movies');

const router = express.Router();

// Validation middleware for the request body
const validateRequestBody = [
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
  body("category").trim().isLength({ min: 1 }).withMessage("Category is required"),
  body("lang").trim().isLength({ min: 1 }).withMessage("Language is required"),
  body("year").isInt({ min: 1900 }).withMessage("Invalid year"),
  body("rate").isFloat({ min: 0, max: 10 }).withMessage("Invalid rating"),
];

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({}).select("name category lang year rate");
    res.send(movies);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", validateRequestBody, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const body = req.body;

    const newMovie = new Movie({
      name: body.name,
      category: body.category,
      lang: body.lang,
      year: body.year,
      rate: body.rate,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if(!id){
        res.send({error: true, message: "id is not defined"});
        return;
    }

    const movie = await Movie.findOneAndUpdate({_id: id}, { ...body }, {new: true});
    res.send(movie);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if(!id){
        res.send({error: true ,message: "id is not defined"});
        return;
    }

    const result = await Movie.findByIdAndDelete(id);
    res.send(result);
});

module.exports = router;
