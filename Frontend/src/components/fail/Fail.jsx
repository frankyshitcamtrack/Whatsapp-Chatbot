import classes from './fail.module.css'
import failIcon from '/assets/fail.svg'

function Fail({title}) {
    return ( 
        <div className={classes.container}>
            <img alt='fail icon' src={failIcon}/>
            <p>{title}</p>
        </div>
     );
}

export default Fail;