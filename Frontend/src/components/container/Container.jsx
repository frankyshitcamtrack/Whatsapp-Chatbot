import classes from './container.module.css';

function Container({title,children}) {
    return (
          <div className={classes.content}>
            <div className={classes.title}><p>{title}</p></div>
               {children}
          </div>
    );
}

export default Container;