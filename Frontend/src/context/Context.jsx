import { createContext, useEffect } from 'react';
import { useState } from 'react';
import {getCampagnes}from '../services/campagnes.service';
import {getDiscussions} from '../services/discussions.service';
import {getTypeampagneById} from '../services/typeCampagne.service'



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
    //get All stored messages
    const discussions = await getDiscussions();
    if (discussions.length > 0) {
      //add typecampagaign name for every object of message
      const updateNameTypeCampaign = await Promise.all(discussions.map(async (item) => {
        const typeCampagne = await getTypeampagneById(item.idType_campagnes);
        if (typeCampagne && typeCampagne.length > 0) {
          const name = typeCampagne[0].name.toString().toLowerCase();
          return { ...item,name_typeCampaign: name };
        }
      })) ;

      if (updateNameTypeCampaign && updateNameTypeCampaign.length > 0) {
        const removeUndefinedUpdateNameTypeCampaign = updateNameTypeCampaign.filter(item=>item!== undefined);
        
        //group all messages by type campaign
        const groupDiscussionByPushMedia = removeUndefinedUpdateNameTypeCampaign.filter( (item) => {
            const name = item.name_typeCampaign.toString().toLowerCase();;
            return (name.includes('push media') || name === "push media");
        });


        const groupDiscussionByPushMarketing = removeUndefinedUpdateNameTypeCampaign.filter((item) => {
            const name = item.name_typeCampaign.toString().toLowerCase();
            return (name.includes('push marketing') || name === "push marketing");
        });


        const groupDiscussionByPushNewsLetter = removeUndefinedUpdateNameTypeCampaign.filter((item) => {
            const name = item.name_typeCampaign.toString().toLowerCase();
            return (name.includes('push newsletter') || name === "push newsletter");
        });
        

        const countpushMarketingReceivedMessage= groupDiscussionByPushMarketing.filter(item=>(item.status==='delivered'||item.status==='read'|| item.status==='sent')).length;
        const countpushMarketingNotReceivedMessage= groupDiscussionByPushMarketing.filter(item=>(item.status==='failed')).length;
        const countpushMarketingPendingMessage= groupDiscussionByPushMarketing.filter(item=>(item.status==='accepted')).length;
        const countpushMarketingDeletedMessage= groupDiscussionByPushMarketing.filter(item=>(item.status==='deleted')).length;

        const countPushMediaReceivedMessage= groupDiscussionByPushMedia.filter(item=>(item.status==='delivered'||item.status==='read'|| item.status==='sent')).length;
        const countPushMediaNotReceivedMessage= groupDiscussionByPushMedia.filter(item=>(item.status==='failed')).length;
        const countPushMediaPendingMessage= groupDiscussionByPushMedia.filter(item=>(item.status==='accepted')).length;
        const countPushMediaDeletedMessage= groupDiscussionByPushMedia.filter(item=>(item.status==='deleted')).length;

        const countPushNewsLetterReceivedMessage= groupDiscussionByPushNewsLetter.filter(item=>(item.status==='delivered'||item.status==='read'|| item.status==='sent')).length;
        const countPushNewsLetterNotReceivedMessage= groupDiscussionByPushNewsLetter.filter(item=>(item.status==='failed')).length;
        const countPushNewsLetterPendingMessage= groupDiscussionByPushNewsLetter.filter(item=>(item.status==='accepted')).length;
        const countPushNewsLetterDeletedMessage= groupDiscussionByPushNewsLetter.filter(item=>(item.status==='deleted')).length;
    
        setPushMarketing({recu:countpushMarketingReceivedMessage,nonRecu:countpushMarketingNotReceivedMessage,encour:countpushMarketingPendingMessage,supprimé:countpushMarketingDeletedMessage});
        setPushMedia({recu:countPushMediaReceivedMessage,nonRecu:countPushMediaNotReceivedMessage,encour:countPushMediaPendingMessage,supprimé:countPushMediaDeletedMessage});
        setPushNewsLetter({recu:countPushNewsLetterReceivedMessage,nonRecu:countPushNewsLetterNotReceivedMessage,encour:countPushNewsLetterPendingMessage,supprimé:countPushNewsLetterDeletedMessage});
      }
    }
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