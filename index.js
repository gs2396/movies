const express = require("express")
const app = express()
const { initializeDatabase } = require("./db/db.connect")
//const fs = require("fs")

const MovieModel = require("./models.js/movies.models")
app.use(express.json())

initializeDatabase()
//const jsonData = fs.readFileSync("movies.json")

//const moviesData = JSON.parse(jsonData)

const newMovie =   {
    "title": "Dilwale Dulhania Le Jayenge",
    "releaseYear": 1995,
    "genre": ["Romance", "Drama"],
    "director": "Aditya Chopra",
    "actors": ["Shah Rukh Khan", "Kajol"],
    "language": "Hindi",
    "country": "India",
    "rating": 9.1,
    "plot": "A young man and woman fall in love on a Europe trip.",
    "awards": "Multiple Filmfare Awards",
    "posterUrl": "https://example.com/poster1.jpg",
    "trailerUrl": "https://example.com/trailer1.mp4"
  };

  async function createNewMovie(newMovie){                                            //(1)
    try{
        const movie = new MovieModel(newMovie)
        const saveMovie = await movie.save()
        return saveMovie;

    }catch(error){
        console.log(error)
    }
  }

  app.post("/movies", async(req, res)=> {
    try{
        const movie = await createNewMovie(req.body)
        if(movie){
            res.status(201).json({message: "Movie Added Successfully.", movie: movie})
        } 

    }catch(error){
        res.status(500).json({error: "Failed to add movie."})
    }
  })

  async function readAllMovies(){                                                   //(2)
    try{
        const allMovies = await MovieModel.find()
        return allMovies

    }catch(error){
        console.log(error)
    }
  }

  app.get("/movies", async(req, res)=> {
    try{
        const movie = await readAllMovies(req.body)
        if(movie.length != 0){
            res.json(movie)
        } else {
            res.status(404).json({error: "Movie not found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch movies."})
    }
  })

  async function readMovieByTitle(movieTitle){                                       //(3)
    try{
        const movieByTitle = await MovieModel.findOne({title: movieTitle})
        return movieByTitle;

    }catch(error){
        console.log(error)
    }

  }

  app.get("/movies/title/:movieTitle", async(req, res)=> {
    try{
        const movie = await readMovieByTitle(req.params.movieTitle)
        if(movie){
            res.json(movie)
        } else [
            res.status(404).json({error: "Movie not found."})
        ]

    }catch(error){
        res.status(500).json({error: "Failed to fetch movie by title."})
    }
  })

  async function readAllMoviesByLanguage(movieLanguage){                                  //(4)
    try{
        const language = await MovieModel.find({language: movieLanguage})
        return language;

    }catch(error){
        console.log(error)
    }
  }

  app.get("/movies/language/:movieLanguage", async(req, res)=> {
    try{
        const movie = await readAllMoviesByLanguage(req.params.movieLanguage)
        if(movie){
            res.json(movie)
        } else {
            res.status(404).json({error: "movie not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch movies."})
    }
  })

  async function updateMovieByTitle(movieTitle, dataToUpdate){                                          //(5)
    try{
        const updatedMovie = await MovieModel.findOneAndUpdate({title: movieTitle}, dataToUpdate, {new: true})
        return updatedMovie;

    }catch(error){
        console.log(error)
    }
  }
  app.post("/movies/:movieTitle", async(req, res)=> {
    try{
        const updateMovie = await updateMovieByTitle(req.params.movieTitle, req.body)
        if(updateMovie){
            res.status(200).json({message: "Movie updated successfully.", movie: updateMovie})
        } else {
            res.status(404).json({error: "Movie not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to update movie."})
    }
  })

  async function deleteMovie(movieId){
    try{
        const deleted = await MovieModel.findByIdAndDelete(movieId)
        return deleted

    }catch(error){
        console.log(error)
    }
  }
  app.delete("/movies/:movieId", async(req, res)=> {
    try{
        const deletedMovie = await deleteMovie(req.params.movieId)
        if(deletedMovie){
            res.status(200).json({message: "Movie deleted successfully."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to delete movie."})
    }
  })


  const PORT = 4000;

  app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
  })

