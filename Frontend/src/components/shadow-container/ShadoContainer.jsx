import ChartContainer from "../chart-container/ChartContainer";
import classes from "./shadowcontainer.module.css";


function ShadowContainer({title,children,display}) {
 
    return (
        <div className={classes.preview_container}>
            <ChartContainer title={title} handleCloseTag={display} titleClass={classes.titleShadow} closeTag>
               {children}
            </ChartContainer>
        </div>
    );
}

export default ShadowContainer;