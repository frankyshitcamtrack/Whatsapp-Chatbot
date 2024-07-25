import classes from './statcard.module.css'

function StatisticCard({icon,color,title,value}) {
    return (
        <div className={classes.statistic_container} style={{border:`1px solid ${color}`}}>
            <div className={classes.icon_container} style={{backgroundColor:color}}>
               <img alt={title} src={icon} />
            </div>
            <div className={classes.values_container}>
               <p>{title}</p>
               <h1>{value}</h1>
            </div>
        </div>
    );
}

export default StatisticCard;