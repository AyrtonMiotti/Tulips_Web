let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement('audio');

let VolumeIcon = document.querySelector('.fa-volume-up')

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        "img": "resources/assets/playerAssets/Hasta_mi_final.jpg",
        "name": "Hasta mi final",
        "artist": "Il Divo",
        "music": "resources/assets/playerAssets/Hasta_mi_final.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_encanta.jpg",
        "name": "Me encanta",
        "artist": "Matias Valdez",
        "music": "resources/assets/playerAssets/Me_encanta.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Nada_har__cambiar_mi_amor_por_t_.jpg",
        "name": "Nada hará cambiar mi amor por tí",
        "artist": "Sergio Denis",
        "music": "resources/assets/playerAssets/Nada_har__cambiar_mi_amor_por_t_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Tu__siempre_tu.jpg",
        "name": "Tu, siempre tu",
        "artist": "Franco Simone",
        "music": "resources/assets/playerAssets/Tu__siempre_tu.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Regresa_a_m_.jpg",
        "name": "Regresa a mí",
        "artist": "Il Divo",
        "music": "resources/assets/playerAssets/Regresa_a_m_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Solo_con_verte.jpg",
        "name": "Solo con verte",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/Solo_con_verte.mp3"
      },
      {
        "img": "resources/assets/playerAssets/El_color_de_tus_ojos.jpg",
        "name": "El color de tus ojos",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/El_color_de_tus_ojos.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Pi_nsalo.jpg",
        "name": "Piénsalo",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/Pi_nsalo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Volver_a_vernos.jpg",
        "name": "Volver a vernos",
        "artist": "Matías Valdez",
        "music": "resources/assets/playerAssets/Volver_a_vernos.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Te_Amo_y_m_s.jpg",
        "name": "Te Amo y más",
        "artist": "El libro de la vida",
        "music": "resources/assets/playerAssets/Te_Amo_y_m_s.mp3"
      },
      {
        "img": "resources/assets/playerAssets/El_amor_de_mi_vida.jpg",
        "name": "El amor de mi vida",
        "artist": "La Adictiva",
        "music": "resources/assets/playerAssets/El_amor_de_mi_vida.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Quiero.jpg",
        "name": "Quiero",
        "artist": "Los Rebujitos",
        "music": "resources/assets/playerAssets/Quiero.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Perfecta.jpg",
        "name": "Perfecta",
        "artist": "Banda Los Recoditos",
        "music": "resources/assets/playerAssets/Perfecta.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Lo_quiero_todo.jpg",
        "name": "Lo quiero todo",
        "artist": "Matías Valdez",
        "music": "resources/assets/playerAssets/Lo_quiero_todo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Un_bonito_final.jpg",
        "name": "Un bonito final",
        "artist": "Los Rebujitos",
        "music": "resources/assets/playerAssets/Un_bonito_final.mp3"
      },
      {
        "img": "resources/assets/playerAssets/como_t_.jpg",
        "name": "como tú",
        "artist": "Trulala",
        "music": "resources/assets/playerAssets/como_t_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Hermosa_experiencia.jpg",
        "name": "Hermosa experiencia",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/Hermosa_experiencia.mp3"
      },
      {
        "img": "resources/assets/playerAssets/A_La_Antig_ita.jpg",
        "name": "A La Antigüita",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/A_La_Antig_ita.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Por_siempre_mi_amor.jpg",
        "name": "Por siempre mi amor",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/Por_siempre_mi_amor.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Hasta_que_me_olvides.jpg",
        "name": "Hasta que me olvides",
        "artist": "Luis Miguel",
        "music": "resources/assets/playerAssets/Hasta_que_me_olvides.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Fr_a_como_el_viento.jpg",
        "name": "Fría como el viento",
        "artist": "Luis Miguel",
        "music": "resources/assets/playerAssets/Fr_a_como_el_viento.mp3"
      },
      {
        "img": "resources/assets/playerAssets/La_mejor_de_todas.jpg",
        "name": "La mejor de todas",
        "artist": "Banda El Recodo",
        "music": "resources/assets/playerAssets/La_mejor_de_todas.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Mi_raz_n_de_ser.jpg",
        "name": "Mi razón de ser",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/Mi_raz_n_de_ser.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Mi_meta_contigo.jpg",
        "name": "Mi meta contigo",
        "artist": "Banda Los Sebastianes",
        "music": "resources/assets/playerAssets/Mi_meta_contigo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Mi_mayor_anhelo.jpg",
        "name": "Mi Mayor Anhelo",
        "artist": "Banda Ms",
        "music": "resources/assets/playerAssets/Mi_mayor_anhelo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Ese_hombre_soy_yo.jpg",
        "name": "Ese Hombre Soy Yo",
        "artist": "Lucas Sugo",
        "music": "resources/assets/playerAssets/Ese_hombre_soy_yo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Darte_un_beso.jpg",
        "name": "Darte un beso",
        "artist": "Prince Royce",
        "music": "resources/assets/playerAssets/Darte_un_beso.mp3"
      },
      {
        "img": "resources/assets/playerAssets/La_mejor_de_todas.jpg",
        "name": "La mejor de todas",
        "artist": "Banda El Recodo",
        "music": "resources/assets/playerAssets/La_mejor_de_todas.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Siempre_te_voy_a_querer.jpg",
        "name": "Siempre te voy a querer",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Siempre_te_voy_a_querer.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Dime_como_quieres.jpg",
        "name": "Dime como quieres",
        "artist": "Cristian Nodal y Ángela Aguilar",
        "music": "resources/assets/playerAssets/Dime_como_quieres.mp3"
      },
      {
        "img": "resources/assets/playerAssets/_A_d_nde_vamos_.jpg",
        "name": "¿A dónde vamos?",
        "artist": "Matías Valdez",
        "music": "resources/assets/playerAssets/_A_d_nde_vamos_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Latidos.jpg",
        "name": "Latidos",
        "artist": "Matías Valdez",
        "music": "resources/assets/playerAssets/Latidos.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Si_me_dices_que_s_.jpg",
        "name": "Si me dices que sí",
        "artist": "La Konga",
        "music": "resources/assets/playerAssets/Si_me_dices_que_s_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Locura.jpg",
        "name": "Locura",
        "artist": "Jorge Rojas",
        "music": "resources/assets/playerAssets/Locura.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Durmiendo_en_tu_ombligo.jpg",
        "name": "Durmiendo en tu ombligo",
        "artist": "Ulises Bueno",
        "music": "resources/assets/playerAssets/Durmiendo_en_tu_ombligo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Eres_perfecta.jpg",
        "name": "Eres perfecta",
        "artist": "Luciano Pereyra",
        "music": "resources/assets/playerAssets/Eres_perfecta.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Cuando_menos_lo_esperaba.jpg",
        "name": "Cuando menos lo esperaba",
        "artist": "Dale Q va",
        "music": "resources/assets/playerAssets/Cuando_menos_lo_esperaba.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Perfect.jpg",
        "name": "Perfect",
        "artist": "Ed Sheeran",
        "music": "resources/assets/playerAssets/Perfect.mp3"
      },
      {
        "img": "resources/assets/playerAssets/A_thousand_years.jpg",
        "name": "A thousand years",
        "artist": "Christina Perri",
        "music": "resources/assets/playerAssets/A_thousand_years.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Aunque_ya_no_vuelva_a_verte.jpg",
        "name": "Aunque ya no vuelva a verte",
        "artist": "Destino San Javier",
        "music": "resources/assets/playerAssets/Aunque_ya_no_vuelva_a_verte.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Una_mujer_como_tu.jpg",
        "name": "Una mujer como tu",
        "artist": "Luciano Pereyra-Los Ángeles Azules",
        "music": "resources/assets/playerAssets/Una_mujer_como_tu.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Killer_Bomb_n.jpg",
        "name": "Killer Bombón",
        "artist": "Lit Killah",
        "music": "resources/assets/playerAssets/Killer_Bomb_n.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Bomb_n_asesino.jpg",
        "name": "Bombón asesino",
        "artist": "Los Palmeras",
        "music": "resources/assets/playerAssets/Bomb_n_asesino.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Nena.jpg",
        "name": "Nena",
        "artist": "Marama",
        "music": "resources/assets/playerAssets/Nena.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Ni_a_Bonita.jpg",
        "name": "Niña Bonita",
        "artist": "Chino & Nacho",
        "music": "resources/assets/playerAssets/Ni_a_Bonita.mp3"
      },
      {
        "img": "resources/assets/playerAssets/El_Amor_de_Mi_Vida.jpg",
        "name": "El Amor de Mi Vida",
        "artist": "Los Ángeles Azules, María Becerra",
        "music": "resources/assets/playerAssets/El_Amor_de_Mi_Vida.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Hasta_El_Final.jpg",
        "name": "Hasta El Final",
        "artist": "David Bisbal",
        "music": "resources/assets/playerAssets/Hasta_El_Final.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Destino_o_Casualidad.jpg",
        "name": "Destino o Casualidad",
        "artist": "Melendi, Ha-Ash",
        "music": "resources/assets/playerAssets/Destino_o_Casualidad.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_Enamor__de_T_.jpg",
        "name": "Me Enamoré de Tí",
        "artist": "David Bisbal",
        "music": "resources/assets/playerAssets/Me_Enamor__de_T_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Ave_Mar_a.jpg",
        "name": "Ave María",
        "artist": "David Bisbal",
        "music": "resources/assets/playerAssets/Ave_Mar_a.mp3"
      },
      {
        "img": "resources/assets/playerAssets/La_Promesa.jpg",
        "name": "La Promesa",
        "artist": "Melendi",
        "music": "resources/assets/playerAssets/La_Promesa.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Como_T_.jpg",
        "name": "Como Tú",
        "artist": "Luciano Pereyra",
        "music": "resources/assets/playerAssets/Como_T_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Mi_Persona_Favorita.jpg",
        "name": "Mi Persona Favorita",
        "artist": "Río Roma",
        "music": "resources/assets/playerAssets/Mi_Persona_Favorita.mp3"
      },
      {
        "img": "resources/assets/playerAssets/La_Llave.jpg",
        "name": "La Llave",
        "artist": "Abel Pintos",
        "music": "resources/assets/playerAssets/La_Llave.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Te_Voy_a_Amar.jpg",
        "name": "Te Voy a Amar",
        "artist": "Axel",
        "music": "resources/assets/playerAssets/Te_Voy_a_Amar.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Si_Supieras.jpg",
        "name": "Si Supieras",
        "artist": "Trulala",
        "music": "resources/assets/playerAssets/Si_Supieras.mp3"
      },
      {
        "img": "resources/assets/playerAssets/When_a_Man_Loves_a_Woman.jpg",
        "name": "When a Man Loves a Woman",
        "artist": "Michael Bolton",
        "music": "resources/assets/playerAssets/When_a_Man_Loves_a_Woman.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Y_Que_Hacer_Para_Verte.jpg",
        "name": "Y Que Hacer Para Verte",
        "artist": "Los Rebujitos",
        "music": "resources/assets/playerAssets/Y_Que_Hacer_Para_Verte.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Bailando_Bachata.jpg",
        "name": "Bailando Bachata",
        "artist": "Chayanne",
        "music": "resources/assets/playerAssets/Bailando_Bachata.mp3"
      },
      {
        "img": "resources/assets/playerAssets/_Y_c_mo_es__l_.jpg",
        "name": "¿Y cómo es él?",
        "artist": "Lucas Sugo",
        "music": "resources/assets/playerAssets/_Y_c_mo_es__l_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/D_jame_Intentar.jpg",
        "name": "Déjame Intentar",
        "artist": "Lucas Sugo",
        "music": "resources/assets/playerAssets/D_jame_Intentar.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Como_vos__no_hay_dos.jpg",
        "name": "Como vos, no hay dos",
        "artist": "Sabroso",
        "music": "resources/assets/playerAssets/Como_vos__no_hay_dos.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Sin_Principio_ni_Final.jpg",
        "name": "Sin Principio ni Final",
        "artist": "Abel Pintos",
        "music": "resources/assets/playerAssets/Sin_Principio_ni_Final.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Sin_Ti.jpg",
        "name": "Sin Ti",
        "artist": "Trulala",
        "music": "resources/assets/playerAssets/Sin_Ti.mp3"
      },
      {
        "img": "resources/assets/playerAssets/No_Te_Apartes_de_M_.jpg",
        "name": "No Te Apartes de Mí",
        "artist": "Vicentico",
        "music": "resources/assets/playerAssets/No_Te_Apartes_de_M_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Cama_y_Mesa.jpg",
        "name": "Cama y Mesa",
        "artist": "Roberto Carlos",
        "music": "resources/assets/playerAssets/Cama_y_Mesa.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Quiero_Gritar_Que_Te_Amo.jpg",
        "name": "Quiero Gritar Que Te Amo",
        "artist": "La Bande del Sol Naciente",
        "music": "resources/assets/playerAssets/Quiero_Gritar_Que_Te_Amo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Chica_Sexy.jpg",
        "name": "Chica Sexy",
        "artist": "Banda XXI",
        "music": "resources/assets/playerAssets/Chica_Sexy.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Aunque_est_s_con__l.jpg",
        "name": "Aunque estés con él",
        "artist": "La Konga",
        "music": "resources/assets/playerAssets/Aunque_est_s_con__l.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Dime_Que_Me_Quieres.jpg",
        "name": "Dime Que Me Quieres",
        "artist": "Banda El Recodo",
        "music": "resources/assets/playerAssets/Dime_Que_Me_Quieres.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_Muero_Por_Conocerte.jpg",
        "name": "Me Muero Por Conocerte",
        "artist": "Alex Ubago & Amaia Montero",
        "music": "resources/assets/playerAssets/Me_Muero_Por_Conocerte.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Cu_nto_Te_Amo.jpg",
        "name": "Cuánto Te Amo",
        "artist": "Gary",
        "music": "resources/assets/playerAssets/Cu_nto_Te_Amo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Tan_Enamorados.jpg",
        "name": "Tan Enamorados",
        "artist": "Ricardo Montaner",
        "music": "resources/assets/playerAssets/Tan_Enamorados.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_Voy_Enamorando.jpg",
        "name": "Me Voy Enamorando",
        "artist": "Chino & Nacho ft. Farruko",
        "music": "resources/assets/playerAssets/Me_Voy_Enamorando.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Creo_en_Ti.jpg",
        "name": "Creo en Ti",
        "artist": "Reik",
        "music": "resources/assets/playerAssets/Creo_en_Ti.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_Cambiaste_la_Vida.jpg",
        "name": "Me Cambiaste la Vida",
        "artist": "Río Roma",
        "music": "resources/assets/playerAssets/Me_Cambiaste_la_Vida.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Sue_o_Su_Boca.jpg",
        "name": "Sueño Su Boca",
        "artist": "La Rosa",
        "music": "resources/assets/playerAssets/Sue_o_Su_Boca.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_Siento_Vivo.jpg",
        "name": "Me Siento Vivo",
        "artist": "David Bisbal",
        "music": "resources/assets/playerAssets/Me_Siento_Vivo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Loca_Conmigo.jpg",
        "name": "Loca Conmigo",
        "artist": "Trulala",
        "music": "resources/assets/playerAssets/Loca_Conmigo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Por_Eso_Te_Amo.jpg",
        "name": "Por Eso Te Amo",
        "artist": "Río Roma",
        "music": "resources/assets/playerAssets/Por_Eso_Te_Amo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/No_te_vayas.jpg",
        "name": "No te vayas",
        "artist": "Matías Valdez ft. La Konga",
        "music": "resources/assets/playerAssets/No_te_vayas.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Volv__a_Nacer.jpg",
        "name": "Volví a Nacer",
        "artist": "Carlos Vives",
        "music": "resources/assets/playerAssets/Volv__a_Nacer.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Vente_Pa_Ca.jpg",
        "name": "Vente Pa'Ca",
        "artist": "Ricky Martin",
        "music": "resources/assets/playerAssets/Vente_Pa_Ca.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Noche_Loca.jpg",
        "name": "Noche Loca",
        "artist": "Rombai ft. Marama",
        "music": "resources/assets/playerAssets/Noche_Loca.mp3"
      },
      {
        "img": "resources/assets/playerAssets/El_Embrujo.jpg",
        "name": "El Embrujo",
        "artist": "Los Palmeras",
        "music": "resources/assets/playerAssets/El_Embrujo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Lo_Mejor_de_Mi_Vida_Eres_T_.jpg",
        "name": "Lo Mejor de Mi Vida Eres Tú",
        "artist": "Ricky Martin",
        "music": "resources/assets/playerAssets/Lo_Mejor_de_Mi_Vida_Eres_T_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Eres_la_Persona_Correcta_en_el_Momento_Equivocado.jpg",
        "name": "Eres la Persona Correcta en el Momento Equivocado",
        "artist": "Río Roma",
        "music": "resources/assets/playerAssets/Eres_la_Persona_Correcta_en_el_Momento_Equivocado.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Paisaje.jpg",
        "name": "Paisaje",
        "artist": "Gilda",
        "music": "resources/assets/playerAssets/Paisaje.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Te_Esperaba.jpg",
        "name": "Te Esperaba",
        "artist": "Carlos Rivera",
        "music": "resources/assets/playerAssets/Te_Esperaba.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Pero_Te_Conoc_.jpg",
        "name": "Pero Te Conocí",
        "artist": "Reik",
        "music": "resources/assets/playerAssets/Pero_Te_Conoc_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Tus_Abrazos.jpg",
        "name": "Tus Abrazos",
        "artist": "Lucas Sugo ft. Matías Valdez",
        "music": "resources/assets/playerAssets/Tus_Abrazos.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Una_Lady_Como_T_.jpg",
        "name": "Una Lady Como Tú",
        "artist": "Manuel Turizo",
        "music": "resources/assets/playerAssets/Una_Lady_Como_T_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Simplemente_Gracias.jpg",
        "name": "Simplemente Gracias",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Simplemente_Gracias.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Contigo.jpg",
        "name": "Contigo",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Contigo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Ni_Mand_ndote_a_Hacer.jpg",
        "name": "Ni Mandándote a Hacer",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Ni_Mand_ndote_a_Hacer.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Amor_del_Bueno.jpg",
        "name": "Amor del Bueno",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Amor_del_Bueno.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Me_Cambiaste_la_Vida.jpg",
        "name": "Me Cambiaste la Vida",
        "artist": "Río Roma",
        "music": "resources/assets/playerAssets/Me_Cambiaste_la_Vida.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Mi_Sorpresa_Fuiste_T_.jpg",
        "name": "Mi Sorpresa Fuiste Tú",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Mi_Sorpresa_Fuiste_T_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/B_same_Bonito.jpg",
        "name": "Bésame Bonito",
        "artist": "Carmen DeLeon",
        "music": "resources/assets/playerAssets/B_same_Bonito.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Por_Si_Volvieras.jpg",
        "name": "Por Si Volvieras",
        "artist": "Jorge Rojas",
        "music": "resources/assets/playerAssets/Por_Si_Volvieras.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Te_Volver_a_a_Elegir.jpg",
        "name": "Te Volvería a Elegir",
        "artist": "Calibre 50",
        "music": "resources/assets/playerAssets/Te_Volver_a_a_Elegir.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Besarte_de_Nuevo.jpg",
        "name": "Besarte de Nuevo",
        "artist": "Destino San Javier, Banda XXI",
        "music": "resources/assets/playerAssets/Besarte_de_Nuevo.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Uno_X_Uno.jpg",
        "name": "Uno X Uno",
        "artist": "Manuel Carrasco",
        "music": "resources/assets/playerAssets/Uno_X_Uno.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Grande_Amore.jpg",
        "name": "Grande Amore",
        "artist": "Il Volo",
        "music": "resources/assets/playerAssets/Grande_Amore.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Escondidos.jpg",
        "name": "Escondidos",
        "artist": "La Adictiva",
        "music": "resources/assets/playerAssets/Escondidos.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Mi_Marciana.jpg",
        "name": "Mi Marciana",
        "artist": "Alejandro Sanz",
        "music": "resources/assets/playerAssets/Mi_Marciana.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Yo_Me_Enamor_.jpg",
        "name": "Yo Me Enamoré",
        "artist": "Amar Azul",
        "music": "resources/assets/playerAssets/Yo_Me_Enamor_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Amor_Sincero.jpg",
        "name": "Amor Sincero",
        "artist": "Alexander Acha",
        "music": "resources/assets/playerAssets/Amor_Sincero.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Entra_en_Mi_Vida.jpg",
        "name": "Entra en Mi Vida",
        "artist": "Sin Bandera",
        "music": "resources/assets/playerAssets/Entra_en_Mi_Vida.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Por_Ti_Volar_.jpg",
        "name": "Por Ti Volaré",
        "artist": "Andrea Bocelli",
        "music": "resources/assets/playerAssets/Por_Ti_Volar_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/_C_mo_Pagarte_.jpg",
        "name": "¿Cómo Pagarte?",
        "artist": "Carlos Rivera",
        "music": "resources/assets/playerAssets/_C_mo_Pagarte_.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Tu_Amor_Por_Siempre.jpg",
        "name": "Tu Amor Por Siempre",
        "artist": "Axel",
        "music": "resources/assets/playerAssets/Tu_Amor_Por_Siempre.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Eterno_Amor.jpg",
        "name": "Eterno Amor",
        "artist": "Los Manseros Santiagueños",
        "music": "resources/assets/playerAssets/Eterno_Amor.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Propuesta_Indecente.jpg",
        "name": "Propuesta Indecente",
        "artist": "Romeo Santos",
        "music": "resources/assets/playerAssets/Propuesta_Indecente.mp3"
      },
      {
        "img": "resources/assets/playerAssets/Torero.jpg",
        "name": "Torero",
        "artist": "Chayanne",
        "music": "resources/assets/playerAssets/Torero.mp3"
      },
      {
        "img": "resources/assets/playerAssets/I_Was_Made_For_Lovin__You.jpg",
        "name": "I Was Made For Lovin' You",
        "artist": "KISS",
        "music": "resources/assets/playerAssets/I_Was_Made_For_Lovin__You.mp3"
      }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset()

    curr_track.src = music_list[track_index].music;
    curr_track.load()

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Reproduciendo canción " + (track_index + 1) + " de " + music_list.length;

    updateTimer = setInterval(setUpdate, 100);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    let a;

    function populate(a){
        for(let i = 0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x]
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ',' + Color2 + ')';
    document.body.style.background = gradient;    
    document.body.style.backgroundAttachment = "fixed";
    
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    randomIcon.classList.add("randomActive");
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove("randomActive");
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

let old_random_index = 0;

function nextTrack(){
    if(track_index < music_list.length -1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Math.floor(Math.random() * (music_list.length));
        while(old_random_index == random_index){
             random_index = Math.floor(Math.random() * (music_list.length));
        }
        old_random_index = random_index;
        //let random_index2 = Number.parseInt(Math.random() * (music_list.length));
        console.log("Numero random: " + random_index)
        track_index = random_index;
        console.log("Index " + track_index);        
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    pauseTrack();
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
    return playTrack();
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10){currentSeconds = "0" + currentSeconds;}
        if(durationSeconds < 10){durationSeconds = "0" + durationSeconds;}
        if(currentMinutes < 10){currentMinutes = "0" + currentMinutes;}
        if(durationMinutes < 10){durationMinutes = "0" + durationMinutes;}

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}


function setNewIcon(){
    if(volume_slider.value <= 50){
        VolumeIcon.classList.add('fa-volume-down');
        VolumeIcon.classList.remove('fa-volume-up');
        VolumeIcon.classList.remove('fa-volume-mute');
    }
    if(volume_slider.value == 1){
        VolumeIcon.classList.add('fa-volume-mute');
        VolumeIcon.classList.remove('fa-volume-up');
        VolumeIcon.classList.remove('fa-volume-down');
        
    }
    if(volume_slider.value > 50){
        VolumeIcon.classList.add('fa-volume-up');
        VolumeIcon.classList.remove('fa-volume-down');
        VolumeIcon.classList.remove('fa-volume-mute');
    }
}


function MaxVolume(){
    curr_track.volume = 1;  
    volume_slider.value = "100";
    setNewIcon();
}

function MinVolume(){
    curr_track.volume = 0;  
    volume_slider.value = "0";
    setNewIcon();
}


//Funciones Menú
var menuIcon = document.querySelector('.menuIcon');
var menuBar = document.querySelector('.menubar');
// Función para cambiar la visibilidad del menúIcon
function toggleMenuIconVisibility() {
  menuIcon.style.visibility = 'hidden';
}

// Función para restablecer la visibilidad del menúIcon
function resetMenuIconVisibility() {
  menuIcon.style.visibility = 'visible';
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

// Agrega un event listener para el evento unload que se dispara antes de que la página se descargue
