function convertArrayObject(array){
    return array.map(i => {
      if(i){
        return  i.reduce((obj, item, index) => {
          obj[index] = item;
          return obj;
        }, {})
      }
    })
}

module.exports={convertArrayObject}