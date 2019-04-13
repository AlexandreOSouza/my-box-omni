const mongoose = require('mongoose');

// Criando a "tabela" File e exportando ela
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path:{
        type: String,
        required: true
    }
}, {
    timestamps: true,
    // carrega o campo virtual quando for convertido
    toObject :{
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

File.virtual('url').get(function(){
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);