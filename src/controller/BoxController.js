const Box = require('../models/Box');

// classe de controle
class BoxController {
    // Jeito mais facil de lidar com request assincrona
    async store(req, res){
        // pega o corpo da requisição e cria uma Box
        const box = await Box.create(req.body);
        return res.json(box);
    }

    async show(req, res){
        // pega a box do banco e pega os file que estão relacionados
        const box = await Box.findById(req.params.id).
            populate({
                path: 'files',
                options: { sort: {createdAt: -1} }
            });
        return res.json(box);
    }
}

// Exporta a instancia da classe
module.exports = new BoxController();