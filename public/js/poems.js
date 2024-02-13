  //Funciones Menú
  var menuIcon = document.querySelector('.menuIcon');
  var menuBar = document.querySelector('.menubar');
  var book = document.getElementById('flipbook');
  // Función para cambiar la visibilidad del menúIcon
  function toggleMenuIconVisibility() {
    menuIcon.style.visibility = 'hidden';
    book.style.zIndex = '-1'; 
    console.log("No error");
    
  }
  
  // Función para restablecer la visibilidad del menúIcon
  function resetMenuIconVisibility() {
    menuIcon.style.visibility = 'visible';
    book.style.zIndex = ''; 
    
  }
  
  // Evento de clic en el menú desplegable
  menuBar.addEventListener('click', toggleMenuIconVisibility);
  
  // Evento de clic en cualquier lugar del documento
  document.addEventListener('click', function(event) {
    // Verificar si el clic no ocurrió dentro del menú desplegable
    if (!menuBar.contains(event.target)) {
        // Restablecer la visibilidad del menúIcon
        resetMenuIconVisibility();
    }
  });
