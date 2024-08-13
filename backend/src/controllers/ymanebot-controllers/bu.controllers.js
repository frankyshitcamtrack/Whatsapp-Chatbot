const { insertBU, getBU, deleteBU, updateBU, getBuById } = require('../../models/ymanebot-models/bu.model');

//business Unit controllers
async function httpInsertBU(req, res) {
    const BU = req.body;
    try {
        if (!BU.name) {
            return res.status(400).json({
                error: 'Missing require Business unit property'
            })
        }

        await insertBU(BU.name);

        return res.status(201).json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



async function httpGetBu(req, res) {
    try {
        return res.status(200).json(await getBU());
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



async function httpUpdateBu(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    try {
        if (!name || !id) {
            return res.status(400).json({
                error: 'Missing require Business unit property'
            })
        }else{
            const bu = await getBuById(id);
            if (bu.length > 0) {
                await updateBU(id,name);
                return res.status(201).json({
                    ok: true
                });
            } else {
                return res.status(400).json({
                    error: 'Missing Business unit'
                })
            }
        }    
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



async function httpGetBuById(req, res) {
    const id = +req.params.id;
    try {
        return res.status(200).json(await getBuById(id));
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



async function httpDeleteBu(req, res) {
    const id = req.body.id;
    try {
        await deleteBU(id);
        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



module.exports = { httpInsertBU, httpGetBu, httpUpdateBu,httpGetBuById,httpDeleteBu}
