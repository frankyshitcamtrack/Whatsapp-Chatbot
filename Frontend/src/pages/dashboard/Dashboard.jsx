import StatisticCard from '../../components/card/StatCard';
import digitalMarketingIcon from "/assets/digital-marketing.svg";
import publicityMailIcon from "/assets/publicite-par-e-mail.svg";
import socialMediaIcon from "/assets/social-media-marketing.svg";
import classes from './dashboard.module.css';
import ChartContainer from '../../components/chart-container/ChartContainer';
import PieChart from '../../components/chart';

function Dashboard() {
    return (
        <div className={classes.container}>
        <div className={classes.container_items}>
          <StatisticCard icon={digitalMarketingIcon} color="#CCEBFA"  title="PUSH MEDIA FILE" value="55"/>
          <ChartContainer title="Dernier campagne Push media File">
            <PieChart colors={['--blue-100','--gray-500']} values={[120,7]} labels={['reçu', 'Non reçu']}/>
          </ChartContainer>
        </div>
        <div className={classes.container_items}>
          <StatisticCard icon={publicityMailIcon} color="#F9E0D7"  title="PUSH NEWSLETTER" value="10" />
          <ChartContainer title="Dernier campagne Push newsletter">
            <PieChart colors={['--pink-100','--gray-500']} values={[50,12]} labels={['reçu', 'Non reçu']}/>
          </ChartContainer>
        </div>
         <div className={classes.container_items}>
          <StatisticCard icon={socialMediaIcon} color="#00000029"  title="PUSH MARKETING " value="05"  />
          <ChartContainer title="Derniere campagne Push Marketing">
            <PieChart colors={['--gray-200','--gray-500']} values={[86,20]} labels={['reçu', 'Non reçu']}/>
          </ChartContainer>
        </div>
        </div> 
    );
}

export default Dashboard;