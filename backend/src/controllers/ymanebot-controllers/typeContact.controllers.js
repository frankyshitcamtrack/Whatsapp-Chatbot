const { deleteTypeContact,getTypeContact,getTypeContactById,getTypeContactByName,insertTypeContact,updateTypeContact} = require('../../models/ymanebot-models/typeContact.model');


async function httpInsertTypeContact(req, res) {
    const name = req.body.name;
    try {
        if (!name) {
            return res.status(400).json({
                error: 'Missing require Contact Type property'
            })
        }

        insertTypeContact(name);

        return res.status(201).json({
            ok: true
        });

    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetTypeContact(req, res) {
    try {
        return res.status(200).json(await getTypeContact());
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpGetTypeContactById(req, res) {
    const id =+req.params.id;
    try {
        return res.status(200).json(await getTypeContactById(id));
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetTypeContactByName(req, res) {
    const name = req.params.name;
    try {
        return res.status(200).json(await getTypeContactByName(name));
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpUpdateTypeContact(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    try {
        if (!name || !id) {
            return res.status(400).json({
                error: 'Missing require Contact type property'
            })
        }else{
            const campagneType = await getTypeContactById(id);
            if (campagneType.length > 0) {
                await updateTypeContact(id,name);
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


async function httpDeleteTypeContact(req, res) {
    const id = req.body.id;
    try {
        await deleteTypeContact(id);
        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}




module.exports = {httpDeleteTypeContact,httpGetTypeContact,httpGetTypeContactById,httpInsertTypeContact,httpUpdateTypeContact,httpGetTypeContactByName}
