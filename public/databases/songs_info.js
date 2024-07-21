// Definir songNameElement, songArtistElement y currentSongIndex en el ámbito global
let songNameElement;
let songArtistElement;
let currentSongIndex = 0;

// Función para cargar la lista de canciones desde el archivo JSON
const chargeJson = () => {
  // Ruta del archivo JSON
  const archivoJSON = 'resources/assets/playerAssets/songs_info.json';

  // Realizar una solicitud HTTP GET para obtener el archivo JSON
  fetch(archivoJSON)
    .then(response => {
      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON.');
      }
      // Devolver los datos JSON como un objeto JavaScript
      return response.json();
    })
    .then(canciones => {
      window.cancionesSM = canciones;
      // Crear la lista HTML de canciones
      canciones.sort((a, b) => {
        const artistA = a.name.toUpperCase().replace(/[^A-Z]/g, ''); // Convertir a mayúsculas y quitar caracteres especiales
        const artistB = b.name.toUpperCase().replace(/[^A-Z]/g, ''); // Convertir a mayúsculas y quitar caracteres especiales

        if (artistA < artistB) {
          return -1;
        }
        if (artistA > artistB) {
          return 1;
        }
        return 0;
      });

      const songListHTML = canciones.map(cancion => {
        return `<li><button>${cancion.artist} - ${cancion.name}</button></li>`;
      }).join('');

      // Insertar la lista HTML de canciones en el elemento con ID 'song-list'
      const songListElement = document.getElementById('song-list');
      if (songListElement) {
        songListElement.innerHTML = songListHTML;
      } else {
        console.error("Elemento 'song-list' no encontrado en el HTML.");
      }
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
    });
}

// Llamar a la función chargeJson cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', chargeJson);

// Obtener el elemento de audio
const audioPlay = document.getElementById('audioplayer');

// Función para cambiar la fuente de audio
function changeAudioSource(newSource) {
  audioPlay.src = newSource;
  audioPlay.play();
}

// Obtener la lista de canciones
const songList = document.getElementById('song-list');

// Agregar un manejador de eventos de clic a cada elemento <li> de la lista
songList.addEventListener('click', event => {
  const songInfo = event.target.textContent.trim(); // Eliminar espacios en blanco adicionales
  const [artist, songName] = songInfo.split(' - '); // Separar el nombre del artista y el nombre de la canción
  songNameElement = document.querySelector('.song-name');
  songArtistElement = document.querySelector('.song-artist');

  // Buscar la canción correspondiente en el arreglo 'canciones'
  const foundSong = cancionesSM.find(song => song.artist === artist && song.name === songName);
  if (foundSong) {
    // Obtener la ruta del archivo de audio de la canción encontrada
    const newAudioSource = foundSong.music;
    songNameElement.textContent = foundSong.name;
    songArtistElement.textContent = foundSong.artist;

    // Cambiar la fuente de audio del reproductor de música
    changeAudioSource(newAudioSource);

    // Actualizar el índice de la canción actual
    currentSongIndex = cancionesSM.indexOf(foundSong);

    // Remover la clase 'playing' de todos los elementos li y botones
    const lis = document.querySelectorAll('#song-list li');
    lis.forEach(li => {
      li.classList.remove('playing');
    });
  }
});

// Función para cambiar la fuente de audio al siguiente archivo de música
function playNextSong() {
  // Incrementa el índice para obtener la siguiente canción
  currentSongIndex = (currentSongIndex + 1) % cancionesSM.length; // Asegura que el índice esté en el rango correcto

  // Obtén la ruta del archivo de audio de la siguiente canción
  const nextAudioSource = cancionesSM[currentSongIndex].music;

  // Cambia la fuente de audio del reproductor de música
  changeAudioSource(nextAudioSource);

  // Actualiza el nombre y el artista de la canción
  songNameElement.textContent = cancionesSM[currentSongIndex].name;
  songArtistElement.textContent = cancionesSM[currentSongIndex].artist;

  // Remover la clase 'playing' de todos los elementos li y botones
  const lis = document.querySelectorAll('#song-list li');
  lis.forEach(li => {
    li.classList.remove('playing');
  });

  // Remover la clase 'playing' de todos los botones
  const buttons = document.querySelectorAll('#song-list button');
  buttons.forEach(button => {
    button.classList.remove('playing');
  });

  // Agregar la clase 'playing' al botón y al elemento li de la siguiente canción
  const nextButton = document.querySelector(`#song-list button:nth-child(${currentSongIndex + 1})`);
  const nextLi = nextButton.parentElement;
  nextButton.classList.add('playing');
  nextLi.classList.add('playing');
}

// Escuchar el evento 'ended' en el elemento de audio
audioPlay.addEventListener('ended', playNextSong);