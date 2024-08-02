const {getCampagne,getCampagneById,insertCampagne}=require('../../models/ymanebot-models/pushCampagne.model');



async function httpGetPushCampagne(req,res){
    try {
        return res.status(200).json(await getCampagne());
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetPushCampagneById(req,res){
    const id = req.body.id;
    try {
        return res.status(200).json(await getCampagneById(id));
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpInsertPushCampagne(req,res){
    const {name,typeCampagne,content_text,content_media,date_creation,isDelete,TypeContact} = req.body;
    try {
       const insert= await insertCampagne(name,typeCampagne,content_text,content_media,date_creation,isDelete,TypeContact);
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


module.exports={httpGetPushCampagne,httpGetPushCampagneById,httpInsertPushCampagne}