import { createContext } from 'react';
import { useState } from 'react';

const Context = createContext();

export default function MainContext({children}){
    const [displaySidebar,setDisplaySidebar]=useState(false);
 

    function displaySider(){
       setDisplaySidebar(prevDisplay=>!prevDisplay)
    }
  
      return (
          <Context.Provider
              value={
                  {
                    displaySidebar,
                    displaySider
                  }
              }>
              {children}
          </Context.Provider>
      )
}

export {Context} ;