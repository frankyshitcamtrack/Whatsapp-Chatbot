import { createContext, useEffect } from 'react';
import { useState } from 'react';
import {getCampagnes}from '../services/campagnes.service';
import {getDiscussionbyTypeCampaignNameAndStatusDiscussions} from '../services/discussions.service';




const Context = createContext();

// eslint-disable-next-line react/prop-types
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
    // eslint-disable-next-line no-unused-vars
    const [isLogIn,setIsLogIn] = useState(false);

    const [typeCampagne,setTypeCampagne] = useState({pushMediaFile:0,pushNewsLetter:0,pushMarketing:0});

    const [pushMedia,setPushMedia]=useState({recu:0,nonRecu:0,encour:0,supprimé:0});
    const [pushMarketing,setPushMarketing]=useState({recu:0,nonRecu:0,encour:0,supprimé:0});
    const [pushNewsLetter,setPushNewsLetter]=useState({recu:0,nonRecu:0,encour:0,supprimé:0});
    

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
        setCurrentUser(null);
        setIsLogIn(false)
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
            case 'settings/utilisateurs':setiTle('Utilisateurs')
                    break;
            case 'settings/type-campagne':setiTle('Types de Campagne')
                    break;
            default:  ''
        }
    }

async function GetTypeCampagneCount(){
    const campagnes = await getCampagnes();
    if(campagnes.length>0){
      const countPushMediaFile = campagnes.filter(item=>{
        const name = item.name.toString().toLowerCase();
        return (name.includes('push media') || name==="push media");
      }).length

      const countPushNewsLetter = campagnes.filter(item=>{
        const name = item.name.toString().toLowerCase();
        return (name.includes('push newsletter') ||  name==="push newsletter");
      }).length

      const countPushMarketing = campagnes.filter(item=>{
        const name = item.name.toString().toLowerCase();
        return (name.includes('push marketing') || name==="push marketing");
      }).length

      setTypeCampagne({pushMediaFile:countPushMediaFile,pushNewsLetter:countPushNewsLetter,pushMarketing:countPushMarketing});
    }
  }


async function getStatusMessageByTypeampaign() {
     await getDiscussionbyTypeCampaignNameAndStatusDiscussions()
     .then((res)=>{
        const discussions = res;
        console.log(discussions);
        setPushMedia({recu:discussions['pushMedia'].received,nonRecu:discussions['pushMedia'].failed,encour:discussions['pushMedia'].pending,supprimé:discussions['pushMedia'].deleted});
        setPushMarketing({recu:discussions['pushMarketing'].received,nonRecu:discussions['pushMarketing'].failed,encour:discussions['pushMarketing'].pending,supprimé:discussions['pushMarketing'].deleted});
        setPushNewsLetter({recu:discussions['newsletter'].received,nonRecu:discussions['newsletter'].failed,encour:discussions['newsletter'].pending,supprimé:discussions['newsletter'].deleted});
     });
}

 
    useEffect(() => {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }, [currentUser])
    

    useEffect(()=>{
       getTitle(pathName)
    },[pathName])

    useEffect(()=>{
        getStatusMessageByTypeampaign();
        GetTypeCampagneCount();
    },[])
    
      return (
          <Context.Provider
              value={
                  {
                    title,
                    currentUser,
                    typeCampagne,
                    pushMedia,
                    pushMarketing,
                    pushNewsLetter,
                    displaySidebar,
                    dropdownDisplay,
                    previewCampaign,
                    displaySider,
                    updatePathName,
                    displayPreviewCampaign,
                    displayDropdown,
                    loginAuth ,
                    logout,
                  }
              }>
              {children}
          </Context.Provider>
      )
}

export {Context};