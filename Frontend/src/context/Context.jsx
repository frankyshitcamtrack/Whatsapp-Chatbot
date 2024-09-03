import { createContext, useEffect } from 'react';
import { useState } from 'react';


const Context = createContext();

export default function MainContext({children}){

    const getInitialState = () => {
        const currentUser = localStorage.getItem("currentUser");
        return currentUser ? JSON.parse(currentUser) : null
    }
    const [displaySidebar,setDisplaySidebar]=useState(false);
    const [currentUser,setCurrentUser]=useState(getInitialState);
    const [pathName,setPathName] =useState('');
    const [title,setiTle] =useState('');
    const [previewCampaign,setPreviewCampaign]=useState(false);
    const[dropdownDisplay,setDropdownDisplay] =useState(false);
    const [isLogIn,setIsLogIn] = useState(false);
    
    

    function displayDropdown(){
        setDropdownDisplay(prevDropdownDisplay=>!prevDropdownDisplay)
    }

    function displaySider(){
       setDisplaySidebar(prevDisplay=>!prevDisplay)
    }
  
    const loginAuth = (user) => {
        setCurrentUser(user);
        setIsLogIn(true);
    }
    
    const logout = () => {
        setCurrentUser(null)
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
 
    useEffect(() => {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }, [currentUser])

    useEffect(()=>{
       getTitle(pathName)
    },[pathName])

    
      return (
          <Context.Provider
              value={
                  {
                    displaySidebar,
                    displaySider,
                    updatePathName,
                    title,
                    previewCampaign,
                    displayPreviewCampaign,
                    dropdownDisplay,
                    displayDropdown,
                    loginAuth ,
                    logout,
                    currentUser
                  }
              }>
              {children}
          </Context.Provider>
      )
}

export {Context} ;