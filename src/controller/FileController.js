const File = require('../models/File');
const Box = require('../models/Box');


// classe de controle
class FileController {
    // Jeito mais facil de lidar com request assincrona
    async store(req, res) {
        // pegando a box pelo o id que foi passado pelo parametro
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            // Path é o caminho criado no multer config
            path: req.file.key
        });

        // adicionando um arquivo para a box   
        box.files.push(file);

        await box.save();

        // pega todos os usuarios conectados na box e avisa sobre o arquivo
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }

    async show(req, res){
        const file = await File.findById(req.params.id);

        return res.json(file);
    }
}

// Exporta a instancia da classe
module.exports = new FileController();