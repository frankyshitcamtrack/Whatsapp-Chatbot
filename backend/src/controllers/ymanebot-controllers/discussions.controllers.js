const {getDiscussionById,getDiscussions,insertDiscussion}=require('../../models/ymanebot-models/discussions.model')



async function httpGetDiscussions(req,res){
    try {
        return res.status(200).json(await getDiscussions());
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpGetDiscussionById(req,res){
   const id = +req.params.id;
    try {
        return res.status(200).json(await getDiscussionById(id));
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpInsertDiscussion(req,res){
    const {id_discussion,message,numero,status,id_push_campaign} = req.body;
    try {
       const insert= await insertDiscussion(id_discussion,message,numero,status,id_push_campaign);
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


module.exports={httpInsertDiscussion,httpGetDiscussionById,httpGetDiscussions}