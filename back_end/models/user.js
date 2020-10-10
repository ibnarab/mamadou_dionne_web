const mongoose = require('mongoose');

var User = mongoose.model('User', {
    login: { type: String,required: true },
    nom: { type: String,required: true},
    prenom: { type: String,required: true},
    numero: { type: String,required: true},
    localisation: { type: String,required: true},
    password: { type: String,required: true},
    cni: { type: String,required: true},
    dateDeliv: { type: Number,required: true}
});

module.exports = { User };