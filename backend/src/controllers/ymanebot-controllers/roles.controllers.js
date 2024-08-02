const {deleteRole,insertRole,updateRole,getRoles} = require('../../models/ymanebot-models/roles.model');

//business Unit controllers

async function httpGetRoles(req, res) {
    try {
        return res.status(200).json(await getRoles());
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



async function httpInsertRole(req, res) {
    const name= req.body.name;
    try {
        if (!name) {
            return res.status(400).json({
                error: 'Missing require Role property'
            })
        }
        await insertRole(name);

        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}
 

async function httpUpdateRole(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    try {
        await updateRole(id,name);
        return res.status(201).json({
            ok: true
        })
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpDeleteRole(req, res) {
    const id = req.body.id;
    try {
        await deleteRole(id);
        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}




module.exports = {httpInsertRole,httpDeleteRole,httpUpdateRole,httpGetRoles}
