var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");

router.get("/peliculas", function (req, res, next) {
  try {
    //Impresión de las peliculas en consola
    console.log(peliculas);
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.get("/peliculas/comedia", (req, res) => {
  try {
    // Filter to get every movie that has 'comedia' on its gender
    function comedyMovies(movies) {
      return movies.comedia.includes("Comedia");
    }

    // Array of the movies that are comedy
    var comedia = comedyMovies(peliculas);

    res.status(200).json({
      data: comedia,
      cantidad: comedia.length,
      message: 'Those are the comedy movies'
    });
  } catch (error) {
    res.status(400).json({
      message: "Something has happened"
    });
  }
});

router.get("/peliculas/ubicacion", (req, res) => {
  try {
    var location = req.param('location').toString()
    function locationMovies(movies) {
      return movies.ubicacion == location;
    }
    let moviesFiltered = locationMovies(peliculas);
    res.status(200).json({
      data: moviesFiltered,
      cantidad: moviesFiltered.length,
      message: 'Those are the movies that match your param.'
    });
  } catch (error) {
    res.status(400).json({
      message: "Something has happened"
    });
  }
});

router.get("/peliculas/nombre", (req, res) => {
  try {
    var name_string = req.param('name').toString();
    function movieByName(movies) {
      return movies.nombre == name_string
    }
    var filtered = movieByName(peliculas);
    res.status(200).json({
      data: filtered,
      cantidad: filtered.length,
      message: "This is the movie that match the name that you typed"
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something has happened"
    });
  }
});

router.get("/peliculas/anio", (req, res) => {
  try {
    var year1 = req.param('year1');
    var year2 = req.param('year2');
    var auxArray = [];
    for (var i = (peliculas.length - 1); i--;) {
      if (parseInt(peliculas[i].anio, 10) > year1 && parseInt(peliculas[i].anio, 10) < year2) {
        auxArray.push(peliculas[i]);
      }
    }
    res.status(200).json({
      data: auxArray,
      count: auxArray.length,
      message: 'These are the movies between the two years typed'
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something has happened"
    });
  }
})

router.delete("/peliculas", function (req, res, next) {
  for (var i = (peliculas.length - 1); i--;) {
    if (peliculas[i].genero == "") {
      peliculas.splice(i, 1)
    }
  }
  res.status(200).json({
    data: peliculas,
    count: peliculas.length,
    message: "The movies without any gender have been removed"
  });
});

module.exports = router;
