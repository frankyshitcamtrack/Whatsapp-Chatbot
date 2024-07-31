import { Context } from "../../context/Context";
import { useContext,useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import classes from "./campaign.module.css";
import campaignImg from "/assets/campaign.jpeg";
import ShadowContainer from "../../components/shadow-container/ShadoContainer";
import Success from '../../components/success/Sucess';
import Preloader from '../../components/preloader/Preloader';

function Campaign() {
    const { previewCampaign, displayPreviewCampaign } = useContext(Context)
    const [loading,setLoading] = useState(false);
    const [success,setDisplaySuccess]= useState(false);

    const dummyText = `orem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius feugiat bibendum. Aliquam tincidunt neque a vulputate placerat. Maecenas purus urna, dignissim quis metus id, blandit laoreet metus. Nam venenatis dolor in risus molestie accumsan. Ut tempus, tortor nec consectetur vestibulum, neque urna tempor leo, quis vulputate elit tellus vel nunc. Cras arcu mauris, cursus eget justo sed, hendrerit placerat purus. Sed vel lorem magna. 
    Quisque vestibulum metus in lectus dictum consequat. Vestibulum sed metus turpis. Sed magna urna, viverra id purus et, consectetur semper lacus. Nam sed venenatis velit.`

    function handleSubmit(){
        setLoading(prevLoading=>!prevLoading)
        setTimeout(()=>{
         setLoading(prevLoading=>!prevLoading)
         setDisplaySuccess(prevSuccess=>!prevSuccess)
        },4000)
     }

     function handlePreview(){
        setDisplaySuccess(false);
        displayPreviewCampaign();
     }
   
   
   
    return (
        <>
            <form className={classes.form_container}>
                <Input type="text" name="nom" placeholder="Saisissez le nom de votre campagne" className={classes.input} />
                <Select name="type" className={`${classes.input} ${classes.select_input}`} optionStyle={classes.option_style} defaultOption="Sélectionnez le type de campagne" options={['option1', 'option2', 'option3']} />
                <Select name="cible" className={`${classes.input} ${classes.select_input}`} optionStyle={classes.option_style} defaultOption="Sélectionnez la cible" options={['option1', 'option2', 'option3']} />
                <TextArea id="content" name="contenu" className={classes.content} placeholder="Saisissez le contenu du message" rows={20} />
                <div className={classes.btn}>
                    <span className={classes.btn_holder}>
                        <input type="file" id="file_submit" hidden />
                        <label className={classes.input_filelabel} htmlFor="file_submit">Ajouter un media</label>
                    </span>
                    <Button type='button' className={classes.btn_submit} handleClick={handlePreview}>Prévisualiser</Button>
                </div>
            </form>
 
            {
                previewCampaign &&
                <ShadowContainer display={displayPreviewCampaign} title="Prévisualisation du push">
                        {loading && <Preloader/>}
                        {success && <Success title="Votre push marketing a été envoyé avec succès."/>}
                        {
                            (!loading && !success) &&
                            <>
                                <div className={classes.preview_content}>
                                    <p>{dummyText}</p>
                                    <img alt="media messages" src={campaignImg} />
                                </div>
                                <div className={classes.campaign_type}>
                                    <p>Type de campagne: <span>Push Marketing</span></p> <p className={classes.divider}>|</p> <p >A envoyer: <span>500</span> Contacts</p>
                                </div>
                                <div className={classes.preview_btn}>
                                    <Button type="button" className={classes.btn_edit} handleClick={displayPreviewCampaign}>Edit</Button>
                                    <Button type="button" className={classes.btn_submit} handleClick={handleSubmit}>Envoyer</Button>
                                </div>
                            </>
                        }
              </ShadowContainer>

            }
          
        </>

    );
}

export default Campaign;