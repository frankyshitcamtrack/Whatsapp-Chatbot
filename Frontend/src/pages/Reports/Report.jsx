import FilterContainer from '../../components/Filter-container/FilterContainer';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './report.module.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import SearchIcon from '/assets/layer.svg';
import refresh from '/assets/refresh.svg'
import { useState } from 'react';

const DUMMY_DATA=[
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  },
  {
    id:1,
    emetteur:'Evelyne Totouom',
    typeCampagne:'Push Marketing',
    typeCible:'Client Entreprise',
    nombrePersonneEnvoye:'500',
    recu:480,
    nonRecu:20
  }
]



function Report() {
  const [campaign,setCampain]=useState(DUMMY_DATA)

  return (
    <>
      <FilterContainer title="Appliquer un filtre">
        <div className={classes.form_group}>
          <div className={classes.input_group}>
            <label htmlFor="date debut" className={classes.input_label}>Date début</label>
            <Input type="date" name="date debut" placeholder='2024-4-21' className={classes.input_filter} />
          </div>
          <div className={classes.input_group}>
            <label htmlFor="date fin" className={classes.input_label}>Date de fin</label>
            <Input type="date" name="date fin" placeholder='2024-4-21' className={classes.input_filter} />
          </div>
        </div>
        <div className={classes.form_group}>
          <div className={classes.input_group}>
            <label htmlFor="type campagne" className={classes.input_label}>Type Campagne</label>
            <Select name="type campagne" className={`${classes.input_filter} ${classes.select_input}`} optionStyle={classes.option_style} defaultOption='Séléectionnez le type de campagne' options={['option1', 'option2']} />
          </div>
          <div className={classes.input_group}>
            <label htmlFor="Sélectionnez la cible" className={classes.input_label}>Type Campagne</label>
            <Select name="Sélectionnez la cible" className={`${classes.input_filter} ${classes.select_input}`} optionStyle={classes.option_style} defaultOption='Sélectionnez la cible' options={['option1', 'option2']} />
          </div>
        </div>
        <div className={classes.action_icons}>
          <span className={classes.icon_container}>
            <img alt='search icon' className={classes.search_icon} src={SearchIcon} />
          </span>
          <img alt='search icon' className={classes.refresh_icon} src={refresh} />
        </div>
      </FilterContainer>
      <div className={classes.card}>
        <DataTable value={campaign} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="N°" style={{ width: '10%' }}></Column>
          <Column field="emetteur" header="Emetteur" style={{ width: '20%' }}></Column>
          <Column field="typeCampagne" header="Type campagne" style={{ width: '20%' }}></Column>
          <Column field="typeCible" header="Type de cible" style={{ width: '20%' }}></Column>
          <Column field="nombrePersonneEnvoye" header="Nombre de personne envoyé" style={{ width: '20%' }}></Column>
          <Column field="recu" header="Reçu" style={{ width: '15%' }}></Column>
          <Column field="nonRecu" header="Non Reçu" style={{ width: '15%' }}></Column>
        </DataTable>
      </div>
    </>


  );
}

export default Report;