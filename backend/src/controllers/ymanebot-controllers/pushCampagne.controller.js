const {getCampagne,getCampagneById,insertCampagne}=require('../../models/ymanebot-models/pushCampagne.model');
const { developement } = require("../../config/whatsappApi");
const {downloadVideo}=require("../../utils/download");
const {downloadImage}=require('../../utils/downloadImg')
const {v4 : uuidv4} =require('uuid')




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
    const id = +req.params.id;
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