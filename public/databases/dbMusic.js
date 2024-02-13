const connection = require('./db.js');
// Función para crear la tabla si no existe

async function crearTablaSQL() {
    try {
        // Consulta SQL para crear la tabla si no existe
        const crearTablaSQL = `
            CREATE TABLE IF NOT EXISTS CancionesEnReproduccion (
                id INT AUTO_INCREMENT PRIMARY KEY,
                imagen VARCHAR(255),
                nombre VARCHAR(255),
                artista VARCHAR(255),
                musica VARCHAR(255)
            )
        `;

        // Ejecutar la consulta SQL
        await connection.query(crearTablaSQL);
        console.log('Tabla creada correctamente.');
    } catch (error) {
        throw new Error('Error al crear la tabla: ' + error);
    }
};
// Función para guardar la canción en reproducción en la base de datos
// Función para limpiar la tabla de CancionesEnReproduccion
async function limpiarTablaCancionesEnReproduccion() {
    try {
        // Consulta SQL para eliminar todos los registros de la tabla
        const limpiarTablaSQL = `DELETE FROM CancionesEnReproduccion`;

        // Ejecutar la consulta SQL
        await connection.query(limpiarTablaSQL);

        console.log('Tabla CancionesEnReproduccion limpiada correctamente.');
    } catch (error) {
        throw new Error('Error al limpiar la tabla CancionesEnReproduccion: ' + error);
    }
}

// Función para guardar la canción en reproducción en la base de datos
async function guardarCancionEnReproduccion(cancionReproduccion) {
    console.log("Llega al menos xD")
    try {
        // Limpiar la tabla antes de insertar la nueva canción
        await limpiarTablaCancionesEnReproduccion();

        // Insertar la nueva canción en reproducción
        const insertarCancionSQL = `INSERT INTO CancionesEnReproduccion (id, imagen, nombre, artista, musica) VALUES (?, ?, ?)`;
        const valores = [cancionReproduccion.nombre, cancionReproduccion.artista, cancionReproduccion.ruta];
        await connection.query(insertarCancionSQL, valores);

        console.log('Canción en reproducción guardada correctamente.');
    } catch (error) {
        throw new Error('Error al guardar la canción en reproducción: ' + error);
    }
}

// Función para recuperar la canción en reproducción desde la base de datos
async function obtenerCancionEnReproduccion() {
    try {
        // Consultar la canción en reproducción desde la base de datos
        const result = await connection.query('SELECT * FROM CancionesEnReproduccion ORDER BY id DESC LIMIT 1');
        const cancion = result[0];

        return cancion;
    } catch (error) {
        throw new Error('Error al recuperar la canción en reproducción: ' + error);
    }
}

module.exports = {
    crearTablaSQL,
    guardarCancionEnReproduccion,
    obtenerCancionEnReproduccion
};