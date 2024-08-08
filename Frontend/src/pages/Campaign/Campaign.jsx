import { Context } from "../../context/Context";
import { useContext,useEffect,useState } from "react";
import {addCampagne,getCampagnebyId,getCampagnes} from "../../services/campagnes.service";
import {getTypeCampagne} from "../../services/typeCampagne.service";
import {getContacts} from "../../services/cantacts.service";
import {getTypesContacts} from "../../services/typeContact-service"
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import classes from "./campaign.module.css";
import ShadowContainer from "../../components/shadow-container/ShadoContainer";
import Success from '../../components/success/Sucess';
import Preloader from '../../components/preloader/Preloader';
import Fail from "../../components/fail/Fail";


function Campaign() {
    const [typeCampagnes,setTypeCampagnes] = useState([]);
    const [campaign,setCampaign] = useState({
      name:'',
      idTypeCampagnes:'',
      content_text:'',
      content_media:'',
      idType_contact:'',
      id_user:'',
      contacts:[],
      nombres_contacts:0,
      recu:0,
      non_recu:0,
      media:""
    });
    const [imageLabel,setImageLabel]=useState('Ajouter un media');
    const [contactService,setContactService]=useState([]);
    const [typeContacts,setTypeContacts]=useState([]);
    const [typeCampaignName,setTypeCampaignName]=useState('');
    const [displayOtherInput,setDisplayOtherInput]=useState(false);
    const { previewCampaign, displayPreviewCampaign } = useContext(Context);
    const [fail,setDisplayFail]= useState(false);
    const [errorMessage,setErrorMessag]=useState('');
    const [loading,setLoading] = useState(false);
    const [success,setDisplaySuccess]= useState(false);
 

    
    
     function handleSubmit(){
        setLoading(prevLoading=>!prevLoading); ;

        addCampagne(campaign).then((res)=>{
           if(res.status===201){
             setDisplaySuccess(prevSuccess=>!prevSuccess);
           }else if(res.status===500){
              setErrorMessag("Une erreur est survenu au niveau du serveur");
              setDisplayFail(prevFail=>!prevFail);
           }else{
             setErrorMessag(res.statusText);
             setDisplayFail(prevFail=>!prevFail);
           }
        }) 

        setLoading(prevLoading=>!prevLoading); 
     }


     function handlePreview(event){
        event.preventDefault();
        setDisplaySuccess(false);
        setDisplayFail(false);
        displayPreviewCampaign();
        console.log(campaign);
     }


     function handleMedia(e) {
        const rawImage=e.target.files[0]
        const urlMedia=URL.createObjectURL(rawImage);
        setImageLabel(rawImage.name);
        
        const formData = new FormData();
        formData.append('media-file', rawImage);

        setCampaign(previewCampaign=>({...previewCampaign,content_media:urlMedia,media:rawImage}))
    }
   


     async function GetTypeCampaign(){
        const typecampaign = await getTypeCampagne();
        setTypeCampagnes(typecampaign);
     }



     async function GetTypeContact() {
        const typeCont = await getTypesContacts();
        const filterTypeContact = typeCont.filter(item=>item.typeContact_name!=="autre")
        setTypeContacts(filterTypeContact);
     }



     async function GetAllContacts(){
        const contacts = await getContacts();
        setContactService(contacts);
     }



    async function handleCampaign (event) {
        event.preventDefault();
        const { name, value } = event.target;
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            [name]: value,
        }));

        if(name==="idType_contact" && value==="autre"){
            setDisplayOtherInput(true);
        }  
        
        if(name==="idType_contact" && value!=="autre"){
            setDisplayOtherInput(false);
            const contact = contactService.filter(item=>item.idType_contact=== +value);
            const tel = contact.map(item=>item.tel);
            setCampaign(previewCampaign=>({...previewCampaign,contacts:tel,nombres_contacts:tel.length}));

        }

        if(name==='contacts'){
            const arrayContact= value.split(",");
            setCampaign(previewCampaign=>({...previewCampaign,contacts:arrayContact,nombres_contacts:arrayContact.length}))
        }

        if(name==='idTypeCampagnes'){
            if(value){
             const typeCampaignN=typeCampagnes.filter(item=>item.id=== +value)[0].name;
             setTypeCampaignName(typeCampaignN);
            }
        }

    };


    useEffect(()=>{
        GetTypeCampaign();
        GetAllContacts();
        GetTypeContact();
    },[])

    return (
        <>
            <form className={classes.form_container} onSubmit={handlePreview}>
                <Input type="text" name="name" placeholder="Saisissez le nom de votre campagne" className={classes.input} handleChange={handleCampaign}/>
                <select name="idTypeCampagnes" className={`${classes.input} ${classes.select_input}`} onChange={handleCampaign} required>
                    <option value=''>Sélectionnez le type de campagne</option>
                    {typeCampagnes.length > 0 ?
                        typeCampagnes.map((tc) => (
                            <option key={tc.id} value={tc.id}>
                                {tc.name}
                            </option>
                        )) : ''
                    }
                </select>
                <select name="idType_contact" className={`${classes.input} ${classes.select_input}`} onChange={handleCampaign} required>
                    <option value=''>Sélectionnez la cible</option>
                    {typeContacts.length > 0 ?
                        typeContacts.map((tc) => (
                            <option key={tc.id} value={tc.id}>
                                {tc.typeContact_name}
                            </option>
                         )) : ''
                      } 
                    <option key="autre" value="autre">autre</option>
                </select>
                {
                   displayOtherInput && 
                   <TextArea id="contact" name="contacts" className={classes.content} placeholder="Saisissez les contacts au bon format séparé d'une virgule" rows={5} handleChange={handleCampaign}/>
                }
                <TextArea id="content_text" name="content_text" className={classes.content} placeholder="Saisissez le contenu du message" rows={20} handleChange={handleCampaign} />
                <div className={classes.btn}>
                    <span className={classes.btn_holder}>
                        <input type="file" id="file_submit" name="media" hidden onChange={handleMedia} />
                        <label className={classes.input_filelabel} htmlFor="file_submit">{imageLabel}</label>
                    </span>
                    <button type='submit' className={classes.btn_submit}>Prévisualiser</button>
                </div>
            </form>
            {
                previewCampaign &&
                <ShadowContainer display={displayPreviewCampaign} title="Prévisualisation du push">
                        {loading && <Preloader/>}
                        {success && <Success title="Votre push marketing a été envoyé avec succès."/>}
                        {fail && <Fail title={errorMessage} />}
                        {
                            (!loading && !success && !fail) &&
                            <>
                                <div className={classes.preview_content}>
                                    <p>{campaign.content_text}</p>
                                    <img alt="media messages" src={campaign.content_media} />
                                </div>
                                <div className={classes.campaign_type}>
                                    <p>Type de campagne: <span>{ typeCampaignName }</span></p> <p className={classes.divider}>|</p> <p >A envoyer: <span>{campaign.contacts.length}</span> Contacts</p>
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