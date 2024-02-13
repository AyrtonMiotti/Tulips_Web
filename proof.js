const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const axios = require('axios');

const urlsToDownload = [
    "https://youtu.be/_6nshPcI5H4",
    "https://youtu.be/vZtrgPVnVK8",
    // Agrega más URLs según sea necesario
];

const outputFolder = '/home/estudiante/Documentos/Pagina_Web/public/assets/playerAssets';
const infoFilePath = `${outputFolder}/songs_info.json`;

async function downloadAndConvertToMp3(url, outputFolder) {
  try {
    // Crear la carpeta de salida si no existe
    await fs.ensureDir(outputFolder);

    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
    const videoPath = `${outputFolder}/${videoTitle}.mp4`;
    const audioPath = `${outputFolder}/${videoTitle}.mp3`;
    const imgPath = `${outputFolder}/${videoTitle}.jpg`;

    // Descargar el video de YouTube
    const videoStream = ytdl(url, { quality: 'highestaudio' });
    videoStream.pipe(fs.createWriteStream(videoPath));

    await new Promise((resolve, reject) => {
      videoStream.on('end', resolve);
      videoStream.on('error', (err) => reject(`Error al descargar el video: ${err.message}`));
    });

    // Descargar la imagen
    const imgUrl = videoInfo.videoDetails.thumbnails[0].url;
    const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(imgPath, imgResponse.data);
    console.log(`Imagen descargada.`);

    // Convertir el video a MP3
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoPath)
        .audioCodec('libmp3lame')
        .toFormat('mp3')
        .on('end', async () => {
          // Eliminar el archivo MP4 después de la conversión
          fs.unlinkSync(videoPath);
          console.log(`Conversión de ${url} a MP3 completada.`);

          // Guardar información en el archivo JSON
          const songInfo = {
            img: `resources/assets/playerAssets/${videoTitle}.jpg`,
            name: videoTitle,
            artist: videoInfo.videoDetails.author.name,
            music: `resources/assets/playerAssets/${videoTitle}.mp3`,
          };

          let songsInfo = [];
          try {
            const existingInfo = await fs.readFile(infoFilePath, 'utf-8');
            songsInfo = JSON.parse(existingInfo);
          } catch (error) {
            // El archivo probablemente no existe, lo dejamos vacío
          }

          songsInfo.push(songInfo);
          await fs.writeFile(infoFilePath, JSON.stringify(songsInfo, null, 2), 'utf-8');

          resolve();
        })
        .on('error', (err) => reject(`Error al convertir a MP3: ${err.message}`))
        .save(audioPath);
    });

    return Promise.resolve(); // Resuelve la promesa después de completar el procesamiento
  } catch (error) {
    console.error(`Error al procesar ${url}: ${error}`);
    return Promise.resolve(); // Asegura que la promesa siempre se resuelva incluso si hay un error
  }
}

// Recorrer la lista de URLs
async function processUrls() {
  const downloadPromises = urlsToDownload.map((url) => downloadAndConvertToMp3(url, outputFolder));
  // Esperar a que todas las promesas se completen antes de continuar
  await Promise.all(downloadPromises);
  console.log('Proceso de descarga y conversión completado.');
  if (await Promise.all(downloadPromises)) {
    console.log('Se cumplió la condición. Interrumpiendo el bucle.');
    return;
  }

}

// Ejecutar la función
processUrls();
