function phoneFormat(number){
   let newNumber='';
   const arrNumber= number.toString();
   const index = 3;
   const numberArr=[...arrNumber]
   const findIndex = numberArr[index];
 
   if(findIndex!=="6"){
       console.log(numberArr);
       const newArrNumber = [...arrNumber.slice(0,index),6,...arrNumber.slice(index)];
       newArrNumber.map(item=>{
          return newNumber+=item;
       })
       return +newNumber;
   }else{
   
    return number
   }
}


module.exports= phoneFormat