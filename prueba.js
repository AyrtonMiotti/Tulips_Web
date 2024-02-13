const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');


const urlsToDownload = [
    "https://youtu.be/_6nshPcI5H4",
    "https://youtu.be/vZtrgPVnVK8",
    "https://youtu.be/iuR1pHU48xQ",
    "https://youtu.be/i0gy6tkYyPQ",
    "https://youtu.be/7UO0O6ADu4Q",
    "https://www.youtube.com/watch?v=_5SyQQ2zyZ4&list=RDEMwTl9ksQrRcG2Mb7fr2tdIw&index=6&pp=8AUB",
    "https://music.youtube.com/watch?v=xMhNFvVJjm4&feature=share",
    "https://youtu.be/9pIzV1ngldM",
    "https://youtu.be/jOx0JEC_3P4",
    "https://youtu.be/WbCXTM6urww",
    "https://youtu.be/6N4mxe8Druw",
    "https://youtu.be/wmSKc1e9N_g",
    "https://youtu.be/aRVa2HTiECU",
    "https://youtu.be/1aQwz2hdavs",
    "https://youtu.be/ozr3qQRzYl8",
    "https://youtu.be/8BDrtvy0SNM?si=AsRlYfjEP7UvR3Jp",
    "https://www.youtube.com/watch?v=hvNwhGDe1HM&ab_channel=CalibreCincuentaVEVO",
    "https://youtu.be/tcqjwadyVYw?si=qxFNWdF-bdtt-Whz",
    "https://www.youtube.com/watch?v=Tsh1zTv_zAs&ab_channel=LuisBibi%C3%A1nOficial",
    "https://www.youtube.com/watch?v=1Q2_uT-12rQ&ab_channel=CantoYoVideoLyrics",
    "https://www.youtube.com/watch?v=zcfhMuvrU5Q&ab_channel=BandaElRecodoVEVO",
    "https://youtu.be/6OzE2hTxgLU?si=hqNucYOsAIAQebrc",
    "https://youtu.be/6_0-1iqykQY?si=v3yGRL4ByKW0F095",
    "https://youtu.be/WmlJHCzvs_Y?si=ekCvC11fi2tpyTwX",
    "https://youtu.be/EHDGabaYkNY?si=qQRNngpHQrXsKJCj",
    "https://youtu.be/bdOXnTbyk0g?si=E17Ig_XFw63vEeN9",
    "https://youtu.be/LNwYMB27tA8?si=lOHFho6cltDqH3yj",
    "https://youtu.be/7RZp3jiCGYY?si=9XcnSHQXF_SuedsX",
    "https://youtu.be/ppAzxfvHtc8?si=wqWOA1KROCZqoJfc",
    "https://youtu.be/lMZDI7SbCjI?si=hCJ1IrcEAFRoAajF",
    "https://youtu.be/cT23j9PDrgs?si=T0sqSd0KjWw4eyWj",
    "https://youtu.be/sTU0NBU4kEI?si=gdfBYZczSoggSXiE",
    "https://youtu.be/54vkjhPC5hw?si=qyoXS8WTxFQUXYcm",
    "https://youtu.be/KHQ9D65FH3Y?si=ekCUUK0XtCuKEqWr",
    "https://youtu.be/Ekb0BaZJJww?si=U2MlsK-8PZvGPZvS",
    "https://youtu.be/sf_ulJPWRPI?si=FzR38c3mzk-_yNXI",
    "https://youtu.be/uykVjml3TH0?si=Xf35icsG40dmas6Y",
    "https://youtu.be/jRMIdSCoHkQ?si=Ll7STHv38tBVOY2E",
    "https://youtu.be/qQkJe0zzf9w?si=wyhsQTIz2HCiTcQN",
    "https://youtu.be/uQhEp6kOxWA?si=p8Y7nzQbGHRsEssz",
    "https://youtu.be/D6GXRdZECko?si=uFFhx5MnFuI1CulN",
    "https://youtu.be/oYN5EtQRkuk?si=ndYPyZGlkUp2djn_",
    "https://youtu.be/UeFC_9oGqWg?si=ilo3viOxe5HXh9BZ",
    "https://youtu.be/teON5axS2UM?si=HKrGUy9Q2KwzSOJs",
    "https://youtu.be/Oe1fRwgGu5E?si=BsGDwCnrjNK5wdK8",
    "https://youtu.be/CaSCapHZhc0?si=xgZg5gcRVmCnE3oq",
    "https://youtu.be/KwckAs1qhkA?si=fuRbH4btZz2sEe3L",
    "https://youtu.be/D9W4DLjmoOM?si=uSMbuyX80Ior2B0S",
    "https://youtu.be/cQOy0UXAxys?si=EXAnp8vNS0Hny9Ag",
    "https://youtu.be/gra-sIV1n4U?si=GzVol2fAF3FQ2WGN",
    "https://youtu.be/w8SOcXfnQ_8?si=d6saHumQruwfohfc",
    "https://youtu.be/Z0MzSY5RTYI?si=JK2_rKPlDUYeiV5R",
    "https://youtu.be/AJKzOgv5YNU?si=h7v1l84FB_Du8qhs",
    "https://youtu.be/FnVpFkkKbyQ?si=9qH8m3vwXQfot4Md",
    "https://youtu.be/-G9XTSP75uA?si=mpPcIw0nut9T2fL-",
    "https://youtu.be/KZh60U1PqSE?si=lKr5Qr--pPBnnmeY",
    "https://youtu.be/KwckAs1qhkA?si=8UgREFkrwehD_jKk",
    "https://youtu.be/gq1Gewd-KTk?si=I61efSAsWCK6_ELF",
    "https://youtu.be/RCdUCEXnTRQ?si=faysSWXNbz53dD4q",
    "https://youtu.be/HtH0uOWXWAY?si=QZw3NAeQtDds_1K-",
    "https://youtu.be/dsLjyLn859g?si=-a1OBICEGt3M71Vw",
    "https://youtu.be/jiQFGGyfH8E?si=UZsDRY_FbDLRIUVt",
    "https://youtu.be/hGCuT0zD8gk?si=klH6cgl-CscGvAoE",
    "https://youtu.be/TqZcelwiix8?si=N2dZlyt9tdTEzt2l",
    "https://youtu.be/-n7G5Dqb3UM?si=Wzu8ld_qc0djMNNt",
    "https://youtu.be/TC6fWjq-EjA?si=OQ9GbMMUqoQcRRx7",
    "https://youtu.be/kB7MeaEJa8A?si=dSM95J6FyjUjBA4U",
    "https://youtu.be/8wUXSmg376E?si=t-wreuh8WiXoNW32",
    "https://youtu.be/JMXlYUEUo54?si=nYOnmxtIBZIdVsBV",
    "https://youtu.be/HAEUiNvMJr4?si=vpTbTch_rAYBsnfT",
    "https://youtu.be/L4fOU2zfqug?si=k3033UQmQW-UXTom",
    "https://youtu.be/rHmMLZrwAmc?si=bQ79hbKNG3VmI_t4",
    "https://youtu.be/kB7MeaEJa8A?si=dSM95J6FyjUjBA4U",
    "https://youtu.be/Gj33x2xQ4gk?si=c-fHXC2KBM3TnY62",
    "https://youtu.be/aOpjoFuQCqc?si=9Kv6bHGHRJYfxYjW",
    "https://youtu.be/vwPz_uPahMM?si=TPv75MYUPLnnu_5V",
    "https://youtu.be/0yr75-gxVtM?si=0aVHYWf4c2q6LlDC",
    "https://youtu.be/snFhcHHdzT0?si=_7vg0OwyUx1yjIEP",
    "https://youtu.be/_X3PPuF_yOE?si=PWSMITEDqTLsqDjY",
    "https://youtu.be/v0dK_hxnbe8?si=CmEO4y-RukM8Y4yz",
    "https://youtu.be/En_8DHofe-s?si=oc0RwZ1nioBjxQ79",
    "https://youtu.be/MKmaEzqXnXg?si=9s-8oUnqWYz7Edbi",
    "https://youtu.be/J5sBfESTu2U?si=8HWwv80t5XhtKU91",
    "https://youtu.be/lNcGGCMYMpk?si=hKFdrZt7qtMAWqBe",
    "https://youtu.be/CJ_zRSv3Hr8?si=71bviT5aGlFyUsqB",
    "https://youtu.be/iOe6dI2JhgU?si=7RQP0jk4yRKy87Gx",
    "https://youtu.be/3RDSrFCy-Wk?si=g7kKGHcHw7bt_UTu",
    "https://youtu.be/9pOtpCJ6aX8?si=JGACVz1CJEhENJiS",
    "https://youtu.be/2fQY-0B7jLY?si=oZM7wuqFqZG8KKPU",
    "https://youtu.be/Uq7edT5TxdM?si=ASp8j5C25f-8aLpW",
    "https://youtu.be/BAuwMLmDrfA?si=Z5Q210jz9OLffXbe",
    "https://youtu.be/Rir_fuLX7HM?si=9KBKvIDnT0eJfQLl",
    "https://youtu.be/rcRX1ma5Zh4?si=TxzFXwp2nDVG9gdj",
    "https://youtu.be/8vUkB55MPDE?si=MQPnB87Jh6beLEkL",
    "https://youtu.be/VYtJAuoZxcc?si=LPRmWose62K0EaCW",
    "https://youtu.be/zAcv4E0qyhE?si=3OahPiqcPwn0ffBv",
    "https://youtu.be/hvNwhGDe1HM?si=3iVEnjOE1CfN_vO0",
    "https://youtu.be/ik3JlXP8-64?si=iAFZmSjjROdaKHbh",
    "https://youtu.be/0KStf4ya3DM?si=fqPfA6c95nnNfJiF",
    "https://youtu.be/dI78Wf4k-LI?si=SHHHspbl4sIOAYyi",
    "https://youtu.be/iv6sii5mqg0?si=OanZc21c_lZNKN24",
    "https://youtu.be/MuYlqcNGlYE?si=_e757Kezmn0m33Ur",
    "https://youtu.be/_X3PPuF_yOE?si=Tz8B3Hf2dHaHwgOB",
    "https://youtu.be/0KStf4ya3DM?si=fqPfA6c95nnNfJiF",
    "https://youtu.be/pGGJwaGpxCU?si=SZ6GE7cznwPpgoLE",
    "https://youtu.be/fNq--n9JQmE?si=qkD0DBh3ZVlYo5HR",
    "https://youtu.be/nwhDZvwaioQ?si=FFIcVtjA4SwlosoE",
    "https://youtu.be/RNuk52UDkOs?si=9E1ywB8ry9uKBE5m",
    "https://youtu.be/Vj1190w58UM?si=gGtdlxS5k9sW9-iy",
    "https://youtu.be/3DQATvwX4aI?si=ZyUGlFTzpXBKi7dy",
    "https://youtu.be/mFSwwKWH4nY?si=9GQd68QMxgiI4HbH",
    "https://youtu.be/VOcHCx2_oF4?si=UYVx6XDmJ4snGcVA",
    "https://youtu.be/MOXcXy3fxAQ?si=TtrcRAxNyn6uaobr"
  // Agrega más URLs según sea necesario
];

const outputFolder = '/home/estudiante/Documentos/Pagina_Web/public/assets/playerAssets';

async function downloadAndConvertToMp3(url, outputFolder) {
  try {
    // Crear la carpeta de salida si no existe
    await fs.ensureDir(outputFolder);

    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
    const videoPath = `${outputFolder}/${videoTitle}.mp4`;
    const audioPath = `${outputFolder}/${videoTitle}.mp3`;

    // Descargar el video de YouTube
    const videoStream = ytdl(url, { quality: 'highestaudio' });
    videoStream.pipe(fs.createWriteStream(videoPath));

    await new Promise((resolve, reject) => {
      videoStream.on('end', resolve);
      videoStream.on('error', (err) => reject(`Error al descargar el video: ${err.message}`));
    });

    // Convertir el video a MP3
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoPath)
        .audioCodec('libmp3lame')
        .toFormat('mp3')
        .on('end', () => {
          // Eliminar el archivo MP4 después de la conversión
          fs.unlinkSync(videoPath);
          console.log(`Conversión de ${url} a MP3 completada.`);
          resolve();
        })
        .on('error', (err) => reject(`Error al convertir a MP3: ${err.message}`))
        .save(audioPath);
    });
  } catch (error) {
    console.error(`Error al procesar ${url}: ${error}`);
  }
}

// Recorrer la lista de URLs
async function processUrls() {
  for (const url of urlsToDownload) {
    await downloadAndConvertToMp3(url, outputFolder);
  }
}

// Ejecutar la función
processUrls();
