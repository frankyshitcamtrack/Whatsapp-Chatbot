import { lazy, Suspense, useEffect, useState } from 'react';
import {getCampagnes}from '../../services/campagnes.service';
import {getDiscussions} from '../../services/discussions.service';
import {getTypeampagneById} from '../../services/typeCampagne.service'
import StatisticCard from '../../components/card/StatCard';
import digitalMarketingIcon from "/assets/digital-marketing.svg";
import publicityMailIcon from "/assets/publicite-par-e-mail.svg";
import socialMediaIcon from "/assets/social-media-marketing.svg";
import classes from './dashboard.module.css';
import ChartContainer from '../../components/chart-container/ChartContainer';
//import Chart from '../../components/chart';
const Chart = lazy(()=>import('../../components/chart'));
import Preloader from '../../components/preloader/Preloader';


function Dashboard() {
  const [typeCampagne,setTypeCampagne] = useState({pushMediaFile:0,pushNewsLetter:0,pushMarketing:0});
  const [pushMedia,setPushMedia]=useState({recu:0,nonRecu:0,encour:0,supprimé:0});
  const [pushMarketing,setPushMarketing]=useState({recu:0,nonRecu:0,encour:0,supprimé:0});
  const [pushNewsLetter,setPushNewsLetter]=useState({recu:0,nonRecu:0,encour:0,supprimé:0});
 
  useEffect(()=>{
     GetTypeCampagneCount()
     getStatusMessageByTypeampaign()
  },[])
 
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

  return (
    <div className={classes.container}>
      <div className={classes.container_items}>
        <StatisticCard icon={digitalMarketingIcon} color="#FFBB28" title="PUSH MEDIA FILE" value={typeCampagne.pushMediaFile} />
        <ChartContainer title="Derniere campagne Push media File" titleClass={classes.header_dashboard}>
          <Suspense fallback={<Preloader/>}>
             < Chart colors={[ "#FFBB28","#FF0000","#808080","#330c0c"]} values={[{ name: "reçu", value: pushMedia.recu }, { name: "Non reçu", value: pushMedia.nonRecu }, { name: "En cour", value: pushMedia.encour },{ name: "Supprimé", value: pushMedia.supprimé}]} />
          </Suspense>
           
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={publicityMailIcon} color='#00C49F' title="PUSH NEWSLETTER" value={typeCampagne.pushNewsLetter} />
        <ChartContainer title="Derniere campagne Push newsletter" titleClass={classes.header_dashboard}>
          <Suspense fallback={<Preloader/>}>
             <Chart colors={['#00C49F',"#FF0000","#808080","#330c0c"]} values={[{ name: "reçu", value: pushNewsLetter.recu }, { name: "Non reçu", value: pushNewsLetter.nonRecu }, { name: "En cour", value: pushNewsLetter.encour },{ name: "Supprimé", value: pushNewsLetter.supprimé}]}  />
          </Suspense>
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={socialMediaIcon} color="#0088FE" title="PUSH MARKETING " value={typeCampagne.pushMarketing} />
        <ChartContainer title="Derniere campagne Push Marketing" titleClass={classes.header_dashboard}>
          <Suspense fallback={<Preloader/>}>
            <Chart colors={["#0088FE","#FF0000","#808080","#330c0c"]} values={[{ name: "reçu", value: pushMarketing.recu }, { name: "Non reçu", value: pushMarketing.nonRecu }, { name: "En cour", value: pushMarketing.encour },{ name: "Supprimé", value: pushMarketing.supprimé}]}/>
          </Suspense>
        </ChartContainer>
      </div>
    </div>
  );
}

export default Dashboard;