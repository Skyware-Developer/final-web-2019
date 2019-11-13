var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");

router.get("/peliculas", function(req, res, next) {
  try {
    //Impresión de las peliculas en consola
    console.log(peliculas);
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.delete("/peliculas", function(req, res, next) {
  res.status(200).send({
    mensaje: "ESTOY EN EL ENDPOINT DE DELETE"
  });
});

module.exports = router;
