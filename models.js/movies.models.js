const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
     title: {
        type: String
     },
     releaseYear: {
        type: Number
     },
     genre: [{
        type: String
     }],
     director: {
        type: String
     },
     actors: [{
        type: String
     }],
     language: {
        type: String
     },
     country: {
        type: String
     },
     rating: {
        type: Number
     },
     plot: {
        type: String
     },
     awards: {
        type: String
     },
     posterUrl: {
        type: String
     },
     trailerUrl: {
        type: String
     },
},{
    timestamps: true
})

const MovieModel = mongoose.model("movieModel", movieSchema)

module.exports = MovieModel;
