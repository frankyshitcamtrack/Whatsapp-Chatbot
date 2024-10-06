import baseUrl from "../config"

async function getDiscussions(){
  try{
    const res = await fetch(`${baseUrl}/discussions`);
    const data = await res.json();
    return data;
  }catch(error){
    console.log(error);
    return error
  }
 
}


async function getDiscussionbyId(id){
    const res = await fetch(`${baseUrl}/single-discussion/${id}`);
    const data =await res.json();
    return data;
}


export {getDiscussions,getDiscussionbyId}
