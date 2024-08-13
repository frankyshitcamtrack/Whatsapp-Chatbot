import { lazy, Suspense, useEffect, useState } from 'react';
import {getCampagnes}from '../../services/campagnes.service';
import StatisticCard from '../../components/card/StatCard';
import digitalMarketingIcon from "/assets/digital-marketing.svg";
import publicityMailIcon from "/assets/publicite-par-e-mail.svg";
import socialMediaIcon from "/assets/social-media-marketing.svg";
import classes from './dashboard.module.css';
import ChartContainer from '../../components/chart-container/ChartContainer';
const PieChart = lazy(() => import('../../components/chart'));
import Preloader from '../../components/preloader/Preloader';


function Dashboard() {
  const [typeCampagne,setTypeCampagne] = useState({pushMediaFile:0,pushNewsLetter:0,pushMarketing:0});

  useEffect(()=>{
     GetTypeCampagneCount()
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

      setTypeCampagne({pushMediaFile:countPushMediaFile,pushNewsLetter:countPushNewsLetter,pushMarketing:countPushMarketing})
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.container_items}>
        <StatisticCard icon={digitalMarketingIcon} color="#CCEBFA" title="PUSH MEDIA FILE" value={typeCampagne.pushMediaFile} />
        <ChartContainer title="Derniere campagne Push media File" titleClass={classes.header_dashboard}>
          <Suspense fallback={<Preloader />}>
            <PieChart colors={['--blue-100', '--gray-500']} values={[120, 7]} label={['reçu', 'Non reçu']} />
          </Suspense>
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={publicityMailIcon} color="#F9E0D7" title="PUSH NEWSLETTER" value={typeCampagne.pushNewsLetter} />
        <ChartContainer title="Derniere campagne Push newsletter" titleClass={classes.header_dashboard}>
          <Suspense fallback={<Preloader />}>
            <PieChart colors={['--pink-100', '--gray-500']} values={[50, 12]} label={['reçu', 'Non reçu']} />
          </Suspense>
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={socialMediaIcon} color="#00000029" title="PUSH MARKETING " value={typeCampagne.pushMarketing} />
        <ChartContainer title="Derniere campagne Push Marketing" titleClass={classes.header_dashboard}>
          <Suspense fallback={<Preloader />}>
            <PieChart colors={['--gray-200', '--gray-500']} values={[86, 20]} label={['reçu', 'Non reçu']} />
          </Suspense>
        </ChartContainer>
      </div>
    </div>
  );
}

export default Dashboard;