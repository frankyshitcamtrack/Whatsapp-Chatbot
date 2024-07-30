import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './setting.module.css';
import Button from '../../components/Button';
import ShadowContainer from '../../components/shadow-container/ShadoContainer';
import Input from '../../components/Input';


const DUMMY_DATA = [
    {
        id: 1,
        typeCampagne: 'PUSH MAKETING',
        nombrePush: 50,
    },
    {
        id: 1,
        typeCampagne: 'PUSH NEWSLETTER',
        nombrePush: 40,
    },
    {
        id: 1,
        typeCampagne: 'PUSH MARKETING',
        nombrePush: 410,
    }

]

function TypeCampagne() {
    const [typeCampagnes, setTypeCampagnes] = useState(DUMMY_DATA);
    const [displayForm,setDisplayForm]=useState(false);

    function displayAddForm(){
        setDisplayForm(prevDisplayForm=>!prevDisplayForm);
        console.log('hi')
    }
    function handleChange(e){
        console.log(e.target.value)
    }
    return (
        <>
            <Button type="button" className={classes.btn_display} handleClick={displayAddForm}>Ajouter un type de campgne</Button>
            <div className={classes.card}>
                <DataTable value={typeCampagnes} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="N°"></Column>
                    <Column field="typeCampagne" header="Type campagne" ></Column>
                    <Column field="nombrePush" header="Nombre de push déjà envoyé" ></Column>
                </DataTable>
            </div>

            {
                displayForm &&
               <ShadowContainer title="Ajouter un nouveau type de campagne" display={displayAddForm} >
                  <form className={classes.add_form}>
                    <Input type="text" id="submit" name="submit" className={classes.input_field} onChange={handleChange} placeholder='Entrée le type de campgne' />
                    <Button type="button" className={classes.btn_submit} handleClick={displayAddForm}>Créer</Button>
                  </form>
               </ShadowContainer>
            }
        </>

    );
}

export default TypeCampagne;