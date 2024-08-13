import { useEffect, useState } from 'react';
import {addTypeCampagne,deleteTypeCampagne,getTypeCampagne,getTypeampagneById,updateTypeCampagne} from '../../services/typeCampagne.service';
import {removeDuplicateObjects} from '../../utils/removeDuplicateObjects';
import {getCampagnesWiithExistUsersAndTC} from '../../services/campagnes.service'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './setting.module.css';
import Button from '../../components/Button';
import ShadowContainer from '../../components/shadow-container/ShadoContainer';
import Input from '../../components/Input';
import Success from '../../components/success/Sucess';
import Fail from '../../components/fail/Fail';
import Preloader from '../../components/preloader/Preloader';


function TypeCampagne() {
    const [typeCampagnes, setTypeCampagnes] = useState([]);
    const [formData,setFormData]=useState({tc_name:''});
    const [displayForm,setDisplayForm]=useState(false);
    const [loading,setLoading] = useState(false);
    const [success,setDisplaySuccess]= useState(false);
    const [fail,setDisplayFail]= useState(false);
    const [errorMessage,setErrorMessag]=useState('');



    function displayAddForm(){
        setDisplayForm(prevDisplayForm=>!prevDisplayForm);
        setDisplaySuccess(false);
        setDisplayFail(false);
    }

       
    const handleChange= (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    }; 
     
  
    async function handleSubmit(event){
        setLoading(true);
        event.preventDefault();
        addTypeCampagne(formData).then((res)=>{
           if(res.status===201 || res.status===200 || res.status===204){
            setLoading(false) 
            setDisplaySuccess(prevSuccess=>!prevSuccess);
           }else if(res.status===500){
              setLoading(false) 
              setErrorMessag("Une erreur est survenu au niveau du serveur");
              setDisplayFail(prevFail=>!prevFail);
           }else{
             setLoading(false) 
             setErrorMessag(res.statusText);
             setDisplayFail(prevFail=>!prevFail);
           }
        })
        .then(async ()=>{
            await GetTypeampagne();
        }) 
}


    async function deleteTypeC(id){
        const el = {id:id};
        if (window.confirm('Etes vous sure de vouloir suprimer cette donnée?'))
        deleteTypeCampagne(el);
        await GetTypeampagne();
    }


    async function GetTypeampagne(){
        const typeCampains=[]
        const TC = await getTypeCampagne();
       
        //getAllCampagnes
        const campaigns = await getCampagnesWiithExistUsersAndTC();
        
        //create arr of push campaign
        campaigns.map(item=>typeCampains.push({id:item.idType_campagnes,name:item.name}));
        
        TC.map(item=>typeCampains.push({id:item.id,name:item.name}));
        
        //remove duplicate arr
        const removeDuplicate= removeDuplicateObjects(typeCampains);

        const listTyeCampaignWithCountPushs =removeDuplicate.map(item=>{
            const countPushs = campaigns.filter(el=>el.name===item.name).length;
            return {id:item.id,name:item.name,Nombre_push_cree:countPushs}
          })

        setTypeCampagnes(listTyeCampaignWithCountPushs);
    }


    useEffect(()=>{
     setLoading(true)
     GetTypeampagne();
     setTimeout(()=>{
        setLoading(false)
    },2000)  
    },[])



    const actionBodyTemplate = (rowData) => {
        return (
             <Button className={classes.delete_button} handleClick={() => deleteTypeC(rowData.id)} />
        );
    };
   
    return (
        <>
            <Button type="button" className={classes.btn_display} handleClick={displayAddForm}>Ajouter un type de campgne</Button>
            <div className={classes.card}>
                {
                loading? <div className={classes.loader_container}><Preloader/></div>   :
                <DataTable value={typeCampagnes} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="N°"></Column>
                    <Column field="name" header="Type campagne" ></Column>
                    <Column field="Nombre_push_cree" header="Nombre de push déjà envoyé" ></Column> 
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
              }
                
            </div>
            {
               displayForm &&
               <ShadowContainer title="Ajouter un nouveau type de campagne" display={displayAddForm} >
                 {loading && <Preloader/>}
                 {fail && <Fail title={errorMessage}/>}
                 {success && <Success title="Type de Campagne ajouté avec succès."/>}
                 {
                    (!loading && !success && !fail) &&
                    <form className={classes.add_form} onSubmit={handleSubmit}>
                    <Input type="text" id="submit" name="tc_name" className={classes.input_field} handleChange={handleChange} placeholder='Entrée le type de campgne' />
                    <button type="submit" className={classes.btn_submit} >Créer</button>
                    </form>
                 }
               </ShadowContainer>
            }
        </>

    );
}

export default TypeCampagne;