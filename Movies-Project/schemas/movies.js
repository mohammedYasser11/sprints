const mongoose = require("mongoose");

const moviesSchema =new  mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    lang: {type: String, required: true},
    year: {type: Number, required: true},
    rate: {type: Number, required: true},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
});

const Movie = mongoose.model("movies", moviesSchema);

module.exports = Movie;