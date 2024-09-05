import { Context } from "../../context/Context";
import { useContext, useEffect, useState,useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { addCampagne } from "../../services/campagnes.service";
import { getTypeCampagne } from "../../services/typeCampagne.service";
import { getContacts } from "../../services/cantacts.service";
import { getTypesContacts } from "../../services/typeContact-service"
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import classes from "./campaign.module.css";
import ShadowContainer from "../../components/shadow-container/ShadoContainer";
import Success from '../../components/success/Sucess';
import Preloader from '../../components/preloader/Preloader';
import Fail from "../../components/fail/Fail";


function Campaign() {
    const { previewCampaign, displayPreviewCampaign,currentUser } = useContext(Context);
    const [motsRestant,setMotsRestant]=useState(1000);
    const [actualLength,setActualLength]=useState(0);
    const navigate = useNavigate();
    const initialCampaign = {
        name: '',
        idTypeCampagnes: '',
        content_text: '',
        content_media: '',
        idType_contact: '',
        id_user: currentUser.id,
        contacts: [],
        nombres_contacts: 0,
        media: "",
        mediaType:""
    };
    const [typeCampagnes, setTypeCampagnes] = useState([]);
    const [campaign, setCampaign] = useState(initialCampaign);
    const [imageLabel, setImageLabel] = useState('Ajouter un media');
    const [contactService, setContactService] = useState([]);
    const [typeContacts, setTypeContacts] = useState([]);
    const [typeCampaignName, setTypeCampaignName] = useState('');
    const [displayOtherInput, setDisplayOtherInput] = useState(false);
    const [fail, setDisplayFail] = useState(false);
    const [errorMessage, setErrorMessag] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setDisplaySuccess] = useState(false);
    const [disable,setDisable] = useState(false);

    
    async function handleSubmit() {
      try{
        setLoading(true);
        addCampagne(campaign).then((res) => {
            if (res.status===201) {
                setLoading(false);
                setDisplaySuccess(prevSuccess => !prevSuccess);
                setMediaUploaded(false);
                setTimeout(()=>{
                  navigate('/report');
                },1000)
            } else if (res.status === 500) {
                setLoading(false);
                setErrorMessag("Une erreur est survenu au niveau du serveur");
                setDisplayFail(true);
                setCampaign(initialCampaign)
            } else {
                setLoading(false);
                setErrorMessag(res.statusText);
                setDisplayFail(true);
                setCampaign(initialCampaign)
            }
        })
      }catch(error){
        setLoading(false);
        setErrorMessag("Une erreur est survenu au niveau du serveur");
        setDisplayFail(true);
        setCampaign(initialCampaign)
      }
        
       // setCampaign({ ...initialCampaign })
    }

    function handlePreview(event) {
            event.preventDefault();
            setDisable(false);
            setDisplaySuccess(false);
            setDisplayFail(false);
            setLoading(false);
            displayPreviewCampaign();
    }

    function handleMedia(e) {
        const rawImage = e.target.files[0];
        const typeMedia =rawImage.type;
        const type =rawImage.type.split("/")[1];
        const size=rawImage.size
        const urlMedia = URL.createObjectURL(rawImage);
        setImageLabel(rawImage.name);
        const formData = new FormData();
        formData.append('media-file', rawImage);
        
        setCampaign(previewCampaign => ({ ...previewCampaign, content_media: urlMedia, media: rawImage,mediaType:typeMedia }));
        if((type==="jpeg" && size < 5242880) || (type==="png" && size < 5242880) || (type==="mp4" && size < 16777216) || (type==="3gp" && size < 16777216)){
            setDisable(false);
        }else{
         setDisable(true);
        }
    }

    async function GetTypeCampaign() {
        const typecampaign = await getTypeCampagne();
        setTypeCampagnes(typecampaign);
    }

    async function GetTypeContact() {
        const typeCont = await getTypesContacts();
        const filterTypeContact = typeCont.filter(item => item.typeContact_name !== "autre")
        setTypeContacts(filterTypeContact);
    }

    async function GetAllContacts() {
        const contacts = await getContacts();
        setContactService(contacts);
    }


    async function handleCampaign(event) {
        event.preventDefault();
        const { name, value } = event.target;
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            [name]: value,
        }));

        if (name === "idType_contact" && value === "autre") {
            setDisplayOtherInput(true);
            setCampaign(previewCampaign => ({ ...previewCampaign, idType_contact: 5 }));
        }

        if (name === "idType_contact" && value !== "autre") {
            setDisplayOtherInput(false);
            const contact = contactService.filter(item => item.idType_contact === +value);
            const tel = contact.map(item => item.tel);
            setCampaign(previewCampaign => ({ ...previewCampaign, contacts: tel, nombres_contacts: tel.length }));
        }

        if (name === 'contacts') {
            const arrayContact = value.split(",");
            setCampaign(previewCampaign => ({ ...previewCampaign, contacts: arrayContact, nombres_contacts: arrayContact.length }))
        }

        if (name === 'idTypeCampagnes') {
            if (value) {
                const typeCampaignN = typeCampagnes.filter(item => item.id === +value)[0].name;
                setTypeCampaignName(typeCampaignN);
            }
        }

        if(name==='content_text'){
            if(value){
                const contentLength = value.length;
                setActualLength(contentLength)
                calculateWordleft(contentLength);
            }
        }

    };

    function calculateWordleft(contentLength){
        if(contentLength>actualLength){
            setMotsRestant(item=>(--item));
        }else if(contentLength<actualLength){
            setMotsRestant(item=>(++item));
        }else if(contentLength===actualLength){
            setMotsRestant(1000)
        }
      
    }

 


    useEffect(() => {
        GetTypeCampaign();
        GetAllContacts();
        GetTypeContact();
    }, [])

 
    return (

        <>
            <form className={classes.form_container} onSubmit={handlePreview}>
                <Input type="text" name="name" placeholder="Saisissez le nom de votre campagne" className={classes.input} handleChange={handleCampaign} />
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
                    <TextArea id="contact" name="contacts" className={classes.content} placeholder="Saisissez les contacts au bon format séparé d'une virgule" rows={5} handleChange={handleCampaign} />
                }
                <div className={classes.contentGroup}>
                <TextArea id="content_text" name="content_text" className={classes.content} placeholder="Saisissez le contenu du message" rows={20} handleChange={handleCampaign} maxValue={1000}/>
                <p className={classes.numberOfWords}>{motsRestant<=0?0:motsRestant} Mots Restants</p>
                </div>
               
                <div className={classes.btn}>
                    <span className={classes.btn_holder}>
                        <input type="file" id="file_submit" name="media" hidden onChange={(e)=>{handleMedia(e)}} />
                        <label className={classes.input_filelabel} htmlFor="file_submit">{imageLabel}</label>
                    </span>
    
                    <button type='submit' className={classes.btn_submit} disabled={disable}>Prévisualiser</button>
                </div>
                {disable && <p className={classes.typeMediaError}>Bien vouloir inserer un media valide (image de type jpeg et png et de taille maximale 5MB et video type mp4 et 3gp et de taille maximale 15 MB)</p>}
            </form>
            {
                previewCampaign &&
                <ShadowContainer display={displayPreviewCampaign} title="Prévisualisation du push">
                    {loading && <Preloader />}
                    {success && <Success title="Votre push marketing a été envoyé avec succès." />}
                    {fail && <Fail title={errorMessage} />}
                    {
                        (!loading && !success && !fail) &&
                        <>
                            <div className={classes.preview_content}>
                                <p>{campaign.content_text}</p>
                                {
                                    (campaign.mediaType==='image/jpeg'||campaign.mediaType==='image/jpg' || campaign.mediaType==='image/png') &&
                                    <img alt="media campaign" src={campaign.content_media} />
                                }
                                {
                                    (campaign.mediaType==='video/mp4' || campaign.mediaType==='video/3gp' ) &&
                                        <video controls autoPlay>
                                            <source src={campaign.content_media} type="video/mp4"/>
                                        </video>
                                }

                                {
                                   (campaign.mediaType==='') && ''
                                }
                            </div>
                            <div className={classes.campaign_type}>
                                <p>Type de campagne : <span>{typeCampaignName}</span></p> <p className={classes.divider}>|</p> <p >A envoyer : <span>{campaign.contacts.length}</span> Contacts</p>
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