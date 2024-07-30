import { Context } from "../../context/Context";
import { useContext } from "react";
import ShadowContainer from "../shadow-container/ShadoContainer";
import Button from "../Button";
import classes from "./PreviewCampaign.module.css";

function PreviewCampaign({text,urlMedia,campaignType,numberOfContacts,handleSubmit,title}) {
    const {displayPreviewCampaign}=useContext(Context);
    return ( 
    <ShadowContainer display={()=>displayPreviewCampaign()} title={title}>
         <div className={classes.preview_content}>
                   <p>{text}</p>
                   <img alt="media messages" src={urlMedia}/>
                </div>
                <div className={classes.campaign_type}>
                     <p>Type de campagne: <span>{campaignType}</span></p> <p className={classes.divider}>|</p> <p >A envoyer: <span>{numberOfContacts}</span> Contacts</p>
                </div>
                <div className={classes.preview_btn}>
                    <Button type="button"  className={classes.btn_edit} handleClick={()=>displayPreviewCampaign}>Edit</Button>
                    <Button type="button"  className={classes.btn_submit} handleClick={handleSubmit}>Envoyer</Button>
                </div>
    </ShadowContainer>
    );
}

export default PreviewCampaign;