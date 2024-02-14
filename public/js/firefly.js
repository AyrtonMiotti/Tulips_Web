// Lista de URLs de imágenes de fondo
var listaImagenes = [
    '/resources/assets/images/fireImages/FondoP.jpg',
    '/resources/assets/images/fireImages/fondoE.png',
    '/resources/assets/images/fireImages/fondoR.jpg',
    '/resources/assets/images/fireImages/fondoD.jpg',
    '/resources/assets/images/fireImages/fondoT.jpg'
    // Agrega aquí más URLs de imágenes según sea necesario
  ];
  
  function cambiarFondo() {
    // Seleccionar aleatoriamente una URL de la lista
    var indiceAleatorio = Math.floor(Math.random() * listaImagenes.length);
    var urlAleatoria = listaImagenes[indiceAleatorio];
    
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


  