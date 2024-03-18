var listaImagenes = [
  '/resources/assets/images/fireImages/fondoE.png',
  '/resources/assets/images/fireImages/fondoR.jpeg',
  '/resources/assets/images/fireImages/fondoD.jpeg',
  '/resources/assets/images/fireImages/fondoT.jpeg',
  '/resources/assets/images/fireImages/fondo1.jpg',
  '/resources/assets/images/fireImages/fondo2.jpg',
  '/resources/assets/images/fireImages/FondoP.jpeg'
  // Agrega aquí más URLs de imágenes según sea necesario
];

var imagenesNoUsadas = listaImagenes.slice(); // Copia la lista original para mantener un registro de las imágenes no utilizadas

function cambiarFondo() {
  if (imagenesNoUsadas.length === 0) {
      // Si ya se han utilizado todas las imágenes, reiniciar la lista de imágenes no utilizadas
      imagenesNoUsadas = listaImagenes.slice();
  }
  
  // Seleccionar aleatoriamente una URL de la lista de imágenes no utilizadas
  var indiceAleatorio = Math.floor(Math.random() * imagenesNoUsadas.length);
  var urlAleatoria = imagenesNoUsadas[indiceAleatorio];
  
  // Eliminar la imagen seleccionada de la lista de imágenes no utilizadas
  imagenesNoUsadas.splice(indiceAleatorio, 1);
  
  // Establecer la URL seleccionada como la nueva imagen de fondo
  document.body.style.backgroundImage = "url('" + urlAleatoria + "')";
}

// Evento de clic en cualquier lugar del documento
document.addEventListener('click', function(event) {
  // Verificar si el clic no ocurrió dentro del menú desplegable
  if (!menuBar.contains(event.target)) {
      // Restablecer la visibilidad del menúIcon
      cambiarFondo();
  }
});

onload = () => {cambiarFondo()};