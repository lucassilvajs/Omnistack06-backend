const Lead = require('../models/Lead');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        const devExist = await Lead.findOne({email});

        if(devExist) {
            return res.json(devExist)
        }

        let code           = '';
        let characters       = 'abcdefghijklmnopqrstuvwxyz0123456789'.toUpperCase();
        let charactersLength = characters.length;
        for ( let i = 0; i < 5; i++ ) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const lead = await Lead.create({
            email,
            code: `QO-${code}`
        });
    
        return res.json(lead)
    },

    async index(req, res) {
        const dev = await Dev.find();
        return res.json(dev);
    }
}
