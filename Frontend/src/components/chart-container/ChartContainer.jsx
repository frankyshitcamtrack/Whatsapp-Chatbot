import classes from './chartcontainer.module.css'

function ChartContainer({children,title,closeTag,handleCloseTag,titleClass}) {
    return ( 
            <div className={classes.container}>
              <div className={classes.title}>
                <p className={titleClass}>{title}</p > 
                {closeTag && <button className={classes.closeTag} onClick={()=>handleCloseTag()}>X</button>} </div>
               {children}
            </div>
     );
}

export default ChartContainer;