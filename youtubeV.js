const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const axios = require('axios');
const readline = require('readline');

const urlsToDownload = [
    "https://www.tokyvideo.com/es/video/pelicula-la-ballena-online-en-hd-en-espanol-latino"
];

const outputFolder = '/home/estudiante/Documentos/Pagina_Web/public/assets/playerAssets';
const infoFilePath = `${outputFolder}/songs_info.json`;

// Nueva función para obtener la portada de YouTube Music
async function getYouTubeMusicThumbnail(videoId) {
  const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const response = await axios.get(apiUrl);
  return response.data.thumbnail_url;
}

async function downloadAndConvertToMp3(url, outputFolder, songName, artist) {
  try {
    await fs.ensureDir(outputFolder);

    const videoInfo = await ytdl.getInfo(url);
    const originalVideoTitle = videoInfo.videoDetails.title;
    const videoTitle = songName.replace(/[^a-zA-Z0-9]/g, '_');
    const videoPath = `${outputFolder}/${videoTitle}.mp4`;
    const audioPath = `${outputFolder}/${videoTitle}.mp3`;
    const imgPath = `${outputFolder}/${videoTitle}.jpg`;

    console.log(`Título original del video: ${originalVideoTitle}`);
    
    const videoStream = ytdl(url, { quality: 'highestaudio' });
    videoStream.pipe(fs.createWriteStream(videoPath));

    await new Promise((resolve, reject) => {
      videoStream.on('end', resolve);
      videoStream.on('error', (err) => reject(`Error al descargar el video: ${err.message}`));
    });

    const videoId = ytdl.getVideoID(url);
    const imgUrl = await getYouTubeMusicThumbnail(videoId);
    const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(imgPath, imgResponse.data);
    console.log(`Portada descargada.`);
    
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoPath)
        .audioCodec('libmp3lame')
        .toFormat('mp3')
        .on('end', async () => {
          fs.unlinkSync(videoPath);
          console.log(`Conversión de ${url} a MP3 completada.`);
          console.log("______________________________________________________________________________")

          const songInfo = {
            img: `resources/assets/playerAssets/${videoTitle}.jpg`,
            name: songName,
            artist: artist,
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

    return Promise.resolve();
  } catch (error) {
    console.error(`Error al procesar ${url}: ${error}`);
    return Promise.resolve();
  }
}

async function processUrls() {
  for (const url of urlsToDownload) {
    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title;
    const videoArtist = videoInfo.videoDetails.author.name;

    console.log(`Título del video: ${videoTitle} , Artista: ${videoArtist}`);
  
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const songName = await new Promise((resolve) => {
      rl.question('Ingrese el nombre de la canción (sin espacios): ', (answer) => {
        resolve(answer.trim());
      });
    });

    const artist = await new Promise((resolve) => {
      rl.question('Ingrese el nombre del artista (sin espacios): ', (answer) => {
        resolve(answer.trim());
      });
    });

    rl.close();

    await downloadAndConvertToMp3(url, outputFolder, songName, artist);
  }

  console.log('Proceso de descarga y conversión completado.');
}

processUrls();

