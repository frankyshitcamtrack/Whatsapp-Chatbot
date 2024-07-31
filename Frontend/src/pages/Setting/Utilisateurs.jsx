import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './setting.module.css';
import Button from '../../components/Button';
import ShadowContainer from '../../components/shadow-container/ShadoContainer';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Success from '../../components/success/Sucess';
import Preloader from '../../components/preloader/Preloader';

const DUMMY_DATA = [
    {
        id: 1,
        noms: 'Olivier Kamdem',
        departement: 'Innovation',
        login:'user@gmail.com',
        nombreDepush:15,
        actions:'Editer'
    },
    {
        id: 1,
        noms: 'Franky Shiti',
        departement: 'Innovation',
        login:'user@gmail.com',
        nombreDepush:15,
        actions:'Editer'
    },
    {
        id: 1,
        noms: 'Evelyne Totouom',
        departement: 'Communication',
        login:'user@gmail.com',
        nombreDepush:150,
        actions:'Editer'
    },
    {
        id: 1,
        noms: 'Saurele Folefack',
        departement: 'Commercial',
        login:'user@gmail.com',
        nombreDepush:20,
        actions:'Editer'
    },

]

function Utilisateur() {
    const [usersData, setUserData] = useState(DUMMY_DATA)
    const [displayForm,setDisplayForm]=useState(false);
    const [loading,setLoading] = useState(false);
    const [success,setDisplaySuccess]= useState(false)

    function displayAddForm(){
        setDisplayForm(prevDisplayForm=>!prevDisplayForm);
        setDisplaySuccess(false);
    }
    function handleChange(e){
        console.log(e.target.value)
    }

    function handleSubmit(){
        setLoading(prevLoading=>!prevLoading)
        setTimeout(()=>{
         setLoading(prevLoading=>!prevLoading)
         setDisplaySuccess(prevSuccess=>!prevSuccess)
        },4000)
     }
 
    return (
        <>
            <Button type="button" className={classes.btn_display} handleClick={displayAddForm}>Créer un utilisateur</Button>
            <div className={classes.card}>
                <DataTable value={usersData} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="N°"></Column>
                    <Column field="noms" header="Noms et Prenoms" ></Column>
                    <Column field="departement" header="Departement" ></Column>
                    <Column field="login" header="login" ></Column>
                    <Column field="nombreDepush" header="Nombre de push créer" ></Column>
                    <Column field="actions" header="Actions" ></Column>
                </DataTable>
            </div>
            {
            displayForm &&
               <ShadowContainer title="Creation d'un utilisateur" display={displayAddForm} >
                {loading && <Preloader/>}
                {success && <Success title="Utilisateur cree avec succès."/>}

                {
                  (!loading && !success) &&
                  <form className={classes.add_form}>
                    <Input type="text" id="submit" name="submit" className={classes.input_field} handleChange={handleChange} placeholder='Nom et Prenom' />
                    <Select name="departement" className={`${classes.input_field} ${classes.select_input}`} options={['Communication','SAV','Commercial','Innovation']} defaultOption="Communication" handleChange={handleChange}/>
                    <Input type="email" id="submit" name="submit" className={classes.input_field}  handleChange={handleChange} placeholder='Adresse mail' />
                    <Input type="tel" id="submit" name="submit" className={classes.input_field} handleChange={handleChange} placeholder='Numero de telephone' />
                    <Select name="role" className={`${classes.input_field} ${classes.select_input}`} options={['admin','super_admin','user']} defaultOption="user" handleChange={handleChange}/>
                    <Button type="button" className={classes.btn_submit} handleClick={handleSubmit}>Créer</Button>
                  </form>
                }
               </ShadowContainer>
            }
        </>

    );
}

export default Utilisateur;