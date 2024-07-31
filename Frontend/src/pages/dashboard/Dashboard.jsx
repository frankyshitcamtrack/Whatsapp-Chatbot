import { lazy, Suspense } from 'react';
import StatisticCard from '../../components/card/StatCard';
import digitalMarketingIcon from "/assets/digital-marketing.svg";
import publicityMailIcon from "/assets/publicite-par-e-mail.svg";
import socialMediaIcon from "/assets/social-media-marketing.svg";
import classes from './dashboard.module.css';
import ChartContainer from '../../components/chart-container/ChartContainer';
const PieChart = lazy(() => import('../../components/chart'));
import Preloader from '../../components/preloader/Preloader';


function Dashboard() {
  return (
    <div className={classes.container}>
      <div className={classes.container_items}>
        <StatisticCard icon={digitalMarketingIcon} color="#CCEBFA" title="PUSH MEDIA FILE" value="55" />
        <ChartContainer title="Dernier campagne Push media File">
          <Suspense fallback={<Preloader />}>
            <PieChart colors={['--blue-100', '--gray-500']} values={[120, 7]} label={['reçu', 'Non reçu']} />
          </Suspense>
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={publicityMailIcon} color="#F9E0D7" title="PUSH NEWSLETTER" value="10" />
        <ChartContainer title="Dernier campagne Push newsletter">
          <Suspense fallback={<Preloader />}>
            <PieChart colors={['--pink-100', '--gray-500']} values={[50, 12]} label={['reçu', 'Non reçu']} />
          </Suspense>
        </ChartContainer>
      </div>
      <div className={classes.container_items}>
        <StatisticCard icon={socialMediaIcon} color="#00000029" title="PUSH MARKETING " value="05" />
        <ChartContainer title="Derniere campagne Push Marketing">
          <Suspense fallback={<Preloader />}>
            <PieChart colors={['--gray-200', '--gray-500']} values={[86, 20]} label={['reçu', 'Non reçu']} />
          </Suspense>
        </ChartContainer>
      </div>
    </div>
  );
}

export default Dashboard;