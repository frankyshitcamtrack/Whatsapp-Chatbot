import classes from './chartcontainer.module.css'

function ChartContainer({children,title,closeTag,handleCloseTag}) {
    return ( 
            <div className={classes.container}>
              <div className={classes.title}>
                <p>{title}</p > 
                {closeTag && <button className={classes.closeTag} onClick={()=>handleCloseTag()}>X</button>} </div>
               {children}
            </div>
     );
}

export default ChartContainer;