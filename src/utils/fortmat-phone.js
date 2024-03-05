function phoneFormat(number){
    let newNumber='';
    const arrNumber= number.toString();
    const index = 3;
    const newArrNumber = [...arrNumber.slice(0,index),6,...arrNumber.slice(index)];
    newArrNumber.map(item=>{
       return newNumber+=item;
    })
    return +newNumber;
 }
 

module.exports= phoneFormat