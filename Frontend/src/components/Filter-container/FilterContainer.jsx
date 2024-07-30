import classes from './filtercontainer.module.css';
import { useState } from 'react';
import plus from '/assets/plus.png';
import minus from '/assets/minus.png'

function FilterContainer({title,children}) {
    const [open,setOpen] =useState(false);
    function handleDisplay(){
        setOpen(prevOpen=>!prevOpen)
    }
    return ( 
        <div className={classes.main_filtercontainer}>
           <div className={classes.header}>
            <p>{title}</p>
            {!open && <img  alt='+icon' src={plus}  onClick={handleDisplay}/>}
            {open &&  <img alt='-icon'  src={minus} onClick={handleDisplay} />}
           </div>
            {
                open &&
                <div className={classes.content}>
                {children}
                </div>
            }
          
        </div>
     );
}

export default FilterContainer;