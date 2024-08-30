function removeDuplicateObjects(arr){
const mapObjects = new Map(
    arr.map(c => [c.id, c])
  );
  const uniqObjects =[...mapObjects.values()];

  return uniqObjects;
}


function removeDuplicateObjectsUsers(arr){
  var mapObjects = new Map(
    arr.map(c => [c.user_id, c])
  );
  const uniqObjects =[...mapObjects.values()];

  return uniqObjects;
}

export {removeDuplicateObjects,removeDuplicateObjectsUsers}