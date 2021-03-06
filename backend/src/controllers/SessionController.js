const connection = require('../database/connection');
const { create } = require('./IncidentController');

module.exports = {
    async create(req, res){
        const { email, senha } = req.body

        const ong = await connection('ongs')
            .where('email', email)
            .where('senha', senha)
            .select('id')
            .select('name')
            .first()

        if(!ong){
            return res.status(400).json({ error: 'No ONG found with this ID' })
        }

        return res.json(ong)
    }
}