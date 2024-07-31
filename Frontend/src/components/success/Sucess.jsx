import classes from './success.module.css'
import successIcon from '/assets/success.svg'
function Success({title}) {
    return ( 
        <div className={classes.container}>
            <img alt='success icon' src={successIcon}/>
            <p>{title}</p>
        </div>
     );
}

export default Success;