const {getUsers,insertUser,deleteUser,getUserById,updateUser}=require('../../models/ymanebot-models/user.model')


async function httpGetUsers(req,res){
    try {
        return res.status(200).json(await getUsers());
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetUserById(req,res){
    const id = +req.params.id;
    try {
        return res.status(200).json(await getUserById(id));
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpInsertUser(req,res){
    const {user_name,tel,email,idDepartement,role,password}= req.body;
    try {
        if (!user_name || !tel || !email || !idDepartement || !role || !password) {
            return res.status(400).json({
                error: 'Missing require User property'
            })
        }
       const insert= await insertUser(user_name,email,tel,parseInt(idDepartement),role,password);
       if(insert){
        return res.status(201).json(insert);
       }
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpUpdatetUser(req,res){
    const {user_id,user_name,tel,email,idDepartement,role,password} = req.body;
    try {
     if (!user_name || !tel || !email || !idDepartement || !role || !password) {
            return res.status(400).json({
                error: 'Missing require User property'
            })
        }
        const update= await updateUser(user_id,user_name,email,tel,parseInt(idDepartement),role,password);
        return res.status(201).json(update);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpDeleteUser(req,res){
    const id = req.body.user_id;
    try {
       const del= await deleteUser(id);
        return res.status(201).json(del);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}



module.exports={httpGetUsers,httpInsertUser,httpGetUserById,httpDeleteUser,httpUpdatetUser}