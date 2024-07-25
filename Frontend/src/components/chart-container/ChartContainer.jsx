import classes from './chartcontainer.module.css'

function ChartContainer({children,title}) {
    return ( 
            <div className={classes.container}>
              <div className={classes.title}><p>{title}</p></div>
               {children}
            </div>
     );
}

export default ChartContainer;