import ChartContainer from "../chart-container/ChartContainer";
import classes from "./shadowcontainer.module.css";


function ShadowContainer({title,children,display}) {
 
    return (
        <div className={classes.preview_container} onClick={()=>display()}>
            <ChartContainer title={title} handleCloseTag={()=>display} closeTag>
               {children}
            </ChartContainer>
        </div>
    );
}

export default ShadowContainer;