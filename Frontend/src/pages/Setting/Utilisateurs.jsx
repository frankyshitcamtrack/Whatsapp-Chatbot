import { useEffect, useState } from 'react';
import {addUser,deleteUser,getAllUsers,getUserbyId,updateUser} from '../../services/users.service'
import {getBu} from '../../services/bu.service'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './setting.module.css';
import Button from '../../components/Button';
import ShadowContainer from '../../components/shadow-container/ShadoContainer';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Success from '../../components/success/Sucess';
import Preloader from '../../components/preloader/Preloader';
import Fail from '../../components/fail/Fail';

 
function Utilisateur() {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        user_id:null,
        user_name:"",
        email: "",
        tel: "",
        password: "",
        role: "",
        bu_name: ""
    });
    const [bu,setBu]=useState([]);
    const [displayForm,setDisplayForm]=useState(false);
    const [displayUpdateForm,setDisplayUpdateForm]=useState(false);
    const [loading,setLoading] = useState(false);
    const [success,setDisplaySuccess]= useState(false);
    const [fail,setDisplayFail]= useState(false);
    const [errorMessage,setErrorMessag]=useState('');


    function displayAddForm(){
        setDisplayForm(prevDisplayForm=>!prevDisplayForm);
        setDisplaySuccess(false);
        setDisplayFail(false)
    }


    function displayEditForm(){
        setDisplayUpdateForm(prevUpdateDisplay=>!prevUpdateDisplay);
        setDisplaySuccess(false);
        setDisplayFail(false)
    }
 

      const handleChange= (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        }));
    };


    function handleSubmit(event){
        setLoading(prevLoading=>!prevLoading);
        event.preventDefault();
        addUser(user).then((res)=>{
           if(res.status===201){
             setDisplaySuccess(prevSuccess=>!prevSuccess);
           }else if(res.status===500){
              setErrorMessag("Une erreur est survenu au niveau du serveur");
              setDisplayFail(prevFail=>!prevFail);
           }else{
             setErrorMessag(res.statusText);
             setDisplayFail(prevFail=>!prevFail);
           }
        }).then(async ()=>{
            await GetUsers();
        });
        setLoading(prevLoading=>!prevLoading); 
     }


     function handleSubmitUpdate(event){
        setLoading(prevLoading=>!prevLoading);
        event.preventDefault();
        updateUser(user).then((res)=>{
           if(res.status===201){
             setDisplaySuccess(prevSuccess=>!prevSuccess);
           }else if(res.status===500){
              setErrorMessag("Une erreur est survenu au niveau du serveur");
              setDisplayFail(prevFail=>!prevFail);
           }else{
             setErrorMessag(res.statusText);
             setDisplayFail(prevFail=>!prevFail);
           }
        }).then(async ()=>{
            await GetUsers();
        });
        setLoading(prevLoading=>!prevLoading); 
     }


     async function deleteUs(id){
        const el = {user_id:id};
        if (window.confirm('Etes vous sure de vouloir suprimer cet utilisateur?'))
        await deleteUser(el);
        await GetUsers();
    }



     async function GetUsers(){
        const users= await getAllUsers();
        setUsers(users);
    }


    async function GetUserById(id){
        const us= await getUserbyId(id);
        setUser(us[0]);
        console.log(user);
        displayEditForm();
    }


    async function GetBU(){
        const businessUnit= await getBu();
        setBu(businessUnit);
    }
 
     useEffect(()=>{
        GetUsers();
        GetBU();
     },[])
     

     const actionBodyTemplate = (rowData) => {
        return (
            <>
             <Button className={classes.delete_button} handleClick={() => deleteUs(rowData.user_id)} />
             <Button className={classes.update_button} handleClick={() => GetUserById(rowData.user_id)} />
            </>
           
        );
    };

    return (
        <>
            <Button type="button" className={classes.btn_display} handleClick={displayAddForm}>Créer un utilisateur</Button>
            <div className={classes.card}>
                {
                    loading ? <Preloader /> :
                        <DataTable value={users} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="user_id" header="N°"></Column>
                            <Column field="user_name" header="Noms et Prenoms" ></Column>
                            <Column field="email" header="Adresse Mail" ></Column>
                            <Column field="tel" header="Numero de telephone" ></Column>
                            <Column field="Nombre_push_cree" header="Nombre de push crée" ></Column>
                            <Column field="bu_name" header="Departement" ></Column>
                            <Column body={actionBodyTemplate} exportable={false}></Column>
                        </DataTable>
                }
            </div>
            {
            displayForm &&
               <ShadowContainer title="Creation d'un utilisateur" display={displayAddForm} >
                {loading && <Preloader/>}
                {success && <Success title="Utilisateur cree avec succès."/>}
                {fail && <Fail title={errorMessage}/>}
                {
                  (!loading && !success && !fail) &&
                  <form className={classes.add_form} onSubmit={handleSubmit}>
                    <Input type="text" id="submit" name="user_name" className={classes.input_field} handleChange={handleChange} placeholder='Nom et Prenom' />
                    <select name="idDepartement" className={`${classes.input_field} ${classes.select_input}`} onChange={handleChange}>
                        <option>Departement</option>
                        {bu.length>0?
                            bu.map((option) => (
                                <option key={option.id}  value={option.id}>
                                    {option?.bu_name}
                                </option>
                            )):''
                        }
                    </select>
                    <Input type="email" id="submit" name="email" className={classes.input_field}  handleChange={handleChange} placeholder='Adresse mail' />
                    <Input type="number" id="submit" name="tel" className={classes.input_field} handleChange={handleChange} placeholder='Numero de telephone' />
                    <Select name="role" className={`${classes.input_field} ${classes.select_input}`} options={['admin','super_admin','user']} defaultOption="role" handleChange={handleChange}/>
                    <Input type="text" id="submit" name="password" className={classes.input_field} handleChange={handleChange} placeholder='Initial password' />
                    <button type="submit" className={classes.btn_submit}>Créer</button>
                  </form>
                }
               </ShadowContainer>
            }

            {
                displayUpdateForm  &&
                <ShadowContainer title={`Modifier utilisateur ${user.user_name}`}  display={displayEditForm} >
                    {loading && <Preloader />}
                    {success && <Success title="Utilisateur modifie avec succès." />}
                    {fail && <Fail title={errorMessage} />}
                    {
                        (!loading && !success && !fail) &&
                        <form className={classes.add_form} onSubmit={handleSubmitUpdate}>
                            <input type="text" id="submit" name="user_name" className={classes.input_field} onChange={handleChange} placeholder='Nom et Prenom' value={user.user_name}/>
                            <select name="idDepartement" className={`${classes.input_field} ${classes.select_input}`} onChange={handleChange}>
                                <option>{user.bu_name}</option>
                                {bu.length > 0 ?
                                    bu.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option?.bu_name}
                                        </option>
                                    )) : ''
                                }
                            </select>
                            <input type="email" id="submit" name="email" className={classes.input_field} onChange={handleChange} placeholder='Adresse mail' value={user.email} />
                            <input type="number" id="submit" name="tel" className={classes.input_field}  onChange={handleChange} placeholder='Numero de telephone' value={user.tel} />
                            <Select name="role" className={`${classes.input_field} ${classes.select_input}`} options={['admin', 'super_admin', 'user']} defaultOption={user.role} handleChange={handleChange}/>
                            <input type="text" id="submit" name="password" className={classes.input_field}  onChange={handleChange} placeholder='Initial password' value={user.password} />
                            <button type="submit" className={classes.btn_submit}>Modifier</button>
                        </form>
                    }
                </ShadowContainer>
            }
        </>

    );
}

export default Utilisateur;