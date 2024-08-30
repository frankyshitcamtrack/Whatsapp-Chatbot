function removeDuplicateObjects(arr){
    const mapObjects = new Map(
        arr.map(c => [c.id, c])
      );
      const uniqObjects =[...mapObjects.values()];
    
      return uniqObjects;
    }