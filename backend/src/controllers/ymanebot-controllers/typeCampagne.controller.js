const { deleteTypeCampagne,getTypeCampagne,getTypeCampagneById,insertTypeCampagne,updateTypeCampagne} = require('../../models/ymanebot-models/typeCampagne.model');

//business Unit controllers
async function httpInsertTypeCampagne(req, res) {
    const name = req.body.name;
    try {
        if (!name) {
            return res.status(400).json({
                error: 'Missing require Campagne Type property'
            })
        }

        insertTypeCampagne(name);

        return res.status(201).json({
            ok: true
        });

    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetTypeCampagne(req, res) {
    try {
        return res.status(200).json(await getTypeCampagne());
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpGetTypeCampagneById(req, res) {
    const id =+req.params.id;
    try {
        return res.status(200).json(await getTypeCampagneById(id));
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpUpdateTypeCampagne(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    try {
        if (!name || !id) {
            return res.status(400).json({
                error: 'Missing require Campagne type property'
            })
        }else{
            const campagneType = await getTypeCampagneById(id);
            if (campagneType.length > 0) {
                await updateTypeCampagne(id,name);
                return res.status(201).json({
                    ok: true
                });
            } else {
                return res.status(400).json({
                    error: 'Missing Campagne type'
                })
            }
        }    
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpDeleteTypeCampagne(req, res) {
    const id = req.body.id;
    try {
        await deleteTypeCampagne(id);
        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}




module.exports = {httpInsertTypeCampagne,httpGetTypeCampagne,httpUpdateTypeCampagne,httpGetTypeCampagneById,httpDeleteTypeCampagne}
