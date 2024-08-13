

function hashPass(password){
    return bcrypt.hash(password,saltRound,(err,hash)=>{
        if(err){
            console.log(err)
        }
        return hash;
    })
}

function comPareHash(password,data){
 return bcrypt.compare(password,data)
}

module.exports={hashPass,comPareHash}