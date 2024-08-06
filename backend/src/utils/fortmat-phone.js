function phoneFormat(number){
   let newNumber='';
   const arrNumber= number.toString();
   const index = 3;
   const numberArr=[...arrNumber]
   if(numberArr[0]==="2" &&numberArr[1]==="3" && numberArr[2]==="7"){
      const findIndex = numberArr[index];

     if(findIndex!=="6"){
         const newArrNumber = [...arrNumber.slice(0,index),6,...arrNumber.slice(index)];
         newArrNumber.map(item=>{
            return newNumber+=item;
         })
         return +newNumber;
     }else{

      return number
     }
   }else{
     
     return number
   
   }

}


function formatArrPhones(arr){
 return arr.map(item=>phoneFormat(item))
}


module.exports={phoneFormat,formatArrPhones} 