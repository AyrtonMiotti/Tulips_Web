DROP DATABASE if_exist Tulips;
CREATE DATABASE if_not_exists Tulips;
USE Tulips;


CREATE TABLE CancionesEnReproduccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    artista VARCHAR(255) NOT NULL,
    ruta VARCHAR(255) NOT NULL
);