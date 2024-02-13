/*function firstBotMessage(){
    let firstMess = "Hola"

}

const Chatcontroller = {};
const connection = require('../database/db');

var OptionsButtons = [];
var DialogCharacter = [];
var results = [];


/*Chatcontroller.firstOptions = (req, res) => {
    OptionsButtons = ['Muy Bien', 'Bien', 'No tan Bien', 'Mal', 'Prefiero no contestar', 'Excelente', 'Para el orto'];
    DialogCharacter = 'Me alegra mucho verte, ¿Como te sientes hoy?';
    results.push(OptionsButtons, DialogCharacter);
    res.render("Chat", {data: results});
}

Chatcontroller.secondOptions = (req, res) => {
    OptionsButtons = ['Jugar', 'Hablar', 'Necesito un consejo', 'Chistes', 'Amor', 'Adivinanzas!'];
    DialogCharacter = 'Dime, que quieres hacer ahora?';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.TalkOptions = (req, res) => {
    OptionsButtons = ['Problemas', 'Familia', 'Amigos', 'Mascotas', 'Amor', 'Juegos!'];
    DialogCharacter = 'Dime, ¿De qué quieres hablar?';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.TipOptions = (req, res) => {
    OptionsButtons = ['Problemas', 'Familia', 'La Vida', 'Bullying', 'Amor', '']; //FALTA
    DialogCharacter = 'Decime, ¿Sobre qué necesitas un consejo?'
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.Chistes = (req, res) => { //Ni puta idea
    OptionsButtons = ['', '', ' ', '', '', '']; 
    DialogCharacter = '';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.LoveOptions = (req, res) => {
    OptionsButtons = ['', '', ' ', '', '', '']; 
    DialogCharacter = 'Ten en cuenta que el gran amor y los grandes logros, requieren grandes riesgos';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.RiddleOptions = (req, res) => {
    OptionsButtons = ['', '', ' ', '', '', '']; 
    DialogCharacter = 'Tengo agujas, y no se coser, tengo números y no se leer... ¿Qué soy?';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.TipOptions = (req, res) => {
    OptionsButtons = ['', '', ' ', '', '', '']; 
    DialogCharacter = '';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}

Chatcontroller.TipOptions = (req, res) => {
    OptionsButtons = ['', '', ' ', '', '', '']; 
    DialogCharacter = '';
    results.push(OptionsButtons, DialogCharacter);
    res.render("", {data: results});
}


Chatcontroller.getTime = (req, res)=>{
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if(hours < 10){
        hours = '0' + hours
    }

    if(minutes < 10){
        minutes = '0' + minutes
     }

    let time = hours + ':' + minutes;
    return time;
}

module.exports = Chatcontroller;

*/