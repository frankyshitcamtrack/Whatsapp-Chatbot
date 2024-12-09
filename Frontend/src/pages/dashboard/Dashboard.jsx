import { lazy, Suspense,useContext } from 'react';
import { Context } from '../../context/Context';
import StatisticCard from '../../components/card/StatCard';
import digitalMarketingIcon from "/assets/digital-marketing.svg";
import publicityMailIcon from "/assets/publicite-par-e-mail.svg";
import socialMediaIcon from "/assets/social-media-marketing.svg";
import classes from './dashboard.module.css';
import ChartContainer from '../../components/chart-container/ChartContainer';
import Chart from '../../components/chart';
//const Chart = lazy(()=>import('../../components/chart'));
//import Preloader from '../../components/preloader/Preloader';


function Dashboard() {
 const { typeCampagne,pushMedia,pushMarketing,pushNewsLetter } = useContext(Context);
 
  return (
    <div className={classes.container}>
      <div className={classes.container_items}>
        <StatisticCard icon={digitalMarketingIcon} color="#FFBB28" title="PUSH MEDIA FILE" value={typeCampagne.pushMediaFile} />
        <ChartContainer title="Derniere campagne Push media File" titleClass={classes.header_dashboard}>
             < Chart colors={[ "#FFBB28","#FF0000","#808080","#330c0c"]} values={[{ name: "reçu", value: pushMedia.recu }, { name: "Non reçu", value: pushMedia.nonRecu }, { name: "En cour", value: pushMedia.encour },{ name: "Supprimé", value: pushMedia.supprimé}]} />
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={publicityMailIcon} color='#00C49F' title="PUSH NEWSLETTER" value={typeCampagne.pushNewsLetter} />
        <ChartContainer title="Derniere campagne Push newsletter" titleClass={classes.header_dashboard}>
             <Chart colors={['#00C49F',"#FF0000","#808080","#330c0c"]} values={[{ name: "reçu", value: pushNewsLetter.recu }, { name: "Non reçu", value: pushNewsLetter.nonRecu }, { name: "En cour", value: pushNewsLetter.encour },{ name: "Supprimé", value: pushNewsLetter.supprimé}]}  />
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={socialMediaIcon} color="#0088FE" title="PUSH MARKETING " value={typeCampagne.pushMarketing} />
        <ChartContainer title="Derniere campagne Push Marketing" titleClass={classes.header_dashboard}>
            <Chart colors={["#0088FE","#FF0000","#808080","#330c0c"]} values={[{ name: "reçu", value: pushMarketing.recu }, { name: "Non reçu", value: pushMarketing.nonRecu }, { name: "En cour", value: pushMarketing.encour },{ name: "Supprimé", value: pushMarketing.supprimé}]}/>
        </ChartContainer>
      </div>
    </div>
  );
}

export default Dashboard;