const chargeJson = {};
const connection = require('../databases/db'); // Importa la conexión
const fs = require('fs');

chargeJson.charge = (req, res) => {
  // Nombre del archivo JSON
  const archivoJSON = '/home/estudiante/Documentos/Pagina_Web2/public/assets/playerAssets/songs_info.json';

  // Leer el archivo JSON
  fs.readFile(archivoJSON, 'utf8', (error, data) => {
    if (error) {
      console.error('Error al leer el archivo JSON:', error);
      return;
    }

    // Convertir el JSON a objetos JavaScript
    const canciones = JSON.parse(data);

    // Conectar a la base de datos


    // Crear la tabla si no existe
    const crearTablaSQL = `CREATE TABLE IF NOT EXISTS canciones (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            img VARCHAR(255),
                            name VARCHAR(255),
                            artist VARCHAR(255),
                            music VARCHAR(255)
                        )`;
    connection.query(crearTablaSQL, (error) => {
    if (error) {
        console.error('Error al crear la tabla:', error);
        return;
    }
    else{
      console.log("Tabla creada correctamente.")
    }

    // Insertar datos en la tabla
    const insertarSQL = 'INSERT INTO canciones (img, name, artist, music) VALUES ?';
    const valores = canciones.map(cancion => [cancion.img, cancion.name, cancion.artist, cancion.music]);
    connection.query(insertarSQL, [valores], (error, resultados) => {
        if (error) {
        console.error('Error al insertar datos en la tabla:', error);
        return;
        }
        
        console.log('Datos insertados correctamente en la tabla.');
        
        // Cerrar la conexión a la base de datos
        connection.end();
    });
    });
  });
}

module.exports = chargeJson;
