import axios from 'axios';
const baseUrl="http://localhost:8000/api/ymanebot"

//for production
//const baseUrl="/api/ymanebot" 

async function getDiscussions(){
  const res = await fetch(`${baseUrl}/discussions`);
  const data = await res.json();
  return data;
}


async function getDiscussionbyId(id){
    const res = await fetch(`${baseUrl}/single-discussion/${id}`);
    const data =await res.json();
    return data;
}


export {getDiscussions,getDiscussionbyId}
