import axios from "axios";

import baseUrl from "../config"



async function getDiscussions(){
  try{
    const res = await axios(`${baseUrl}/discussions`);
    const data = await res.json();
    console.log(data);
    return data;
  }catch(error){
    console.log(error);
    return error
  }
 
}


async function getDiscussionbyId(id){
    const res = await axios(`${baseUrl}/single-discussion/${id}`);
    const data =await res.json();
    return data;
}


export {getDiscussions,getDiscussionbyId}
