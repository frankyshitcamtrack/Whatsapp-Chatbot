import { createContext, useEffect } from 'react';
import { useState } from 'react';


const Context = createContext();

export default function MainContext({children}){
    const [displaySidebar,setDisplaySidebar]=useState(false);
    const [isLoged,setIsLoged] =useState(false);
    const [pathName,setPathName] =useState('');
    const [title,setiTle] =useState('');
    const [previewCampaign,setPreviewCampaign]=useState(false);
    const[dropdownDisplay,setDropdownDisplay] =useState(false);


    function displayDropdown(){
        setDropdownDisplay(prevDropdownDisplay=>!prevDropdownDisplay)
    }

    function displaySider(){
       setDisplaySidebar(prevDisplay=>!prevDisplay)
    }
  
    function login(){
        setIsLoged((prevState)=>!prevState);
    }

    function updatePathName(path){
        setPathName(path);
    }

    function displayPreviewCampaign(){
        setPreviewCampaign(prevCampaign=>!prevCampaign)
    }

    function getTitle(path){
        switch(path){
            case 'dashboard':setiTle('Dashboard')
                    break;
            case 'campaign':setiTle('Creer Une Campagne')
                    break;
            case 'report': setiTle('Historiques')
                    break;
            case 'setting':setiTle('Configuration')
                    break;
    
            default:  ''
        }
    }

    useEffect(()=>{
       getTitle(pathName)
    },[pathName])
 
      return (
          <Context.Provider
              value={
                  {
                    displaySidebar,
                    displaySider,
                    isLoged,
                    login,
                    updatePathName,
                    title,
                    previewCampaign,
                    displayPreviewCampaign,
                    dropdownDisplay,
                    displayDropdown,
                  }
              }>
              {children}
          </Context.Provider>
      )
}

export {Context} ;