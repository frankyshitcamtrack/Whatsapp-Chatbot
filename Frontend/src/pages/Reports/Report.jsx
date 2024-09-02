import FilterContainer from '../../components/Filter-container/FilterContainer';
import { getCampagnes } from '../../services/campagnes.service'
import { getTypeCampagne } from '../../services/typeCampagne.service'
import { getTypesContacts } from '../../services/typeContact-service'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './report.module.css';
import SearchIcon from '/assets/layer.svg';
import refresh from '/assets/refresh.svg'
import Preloader from '../../components/preloader/Preloader';
import { useEffect, useState } from 'react';



function Report() {
  const [campaign, setCampain] = useState();
  const [listTypeContacts, setListTypeContact] = useState([]);
  const [listTypeCampagne, setListTypeCampagne] = useState([]);
  const [cible, setCible] = useState("");
  const [typeCampagne, setTypeCampagne] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [refech, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);


  async function GetCampaign() {
    const getCampaign = await getCampagnes();
    const rangeCampaign =rangePropertiesCanpaign(getCampaign);
    setCampain(rangeCampaign);
  }


 async function FilterCampaign(){
  let campaigns = await getCampagnes();
  const rangeCampaign =rangePropertiesCanpaign(campaigns);
  if(cible){
    const filterCamgagne = rangeCampaign.filter((item) => (item['typeContact_name'] === cible));
    setCampain(filterCamgagne);
  }

  if(typeCampagne){
    const filterCamgagne = rangeCampaign.filter((item) => (item['name'] === typeCampagne));
    setCampain(filterCamgagne);
  }

  if (startDate && endDate) {
    const formatStartDate = new Date(startDate).getTime();
    const formatEndDate = new Date(endDate).getTime();

    const filterCamgagne = rangeCampaign.filter((item) => {
      const date = new Date(item.date_creation).getTime();
      return (formatStartDate <= date && date <= formatEndDate);
    });
    setCampain(filterCamgagne);
  }

  if(typeCampagne && cible){
    const filterCamgagne = rangeCampaign.filter((item) => (item['name'] === typeCampagne && item['typeContact_name'] === cible ));
    setCampain(filterCamgagne);
  }

  if(typeCampagne && cible && startDate && endDate){
    const formatStartDate = new Date(startDate).getTime();
    const formatEndDate = new Date(endDate).getTime();

    const filterCamgagne = rangeCampaign.filter((item) => {
      const date = new Date(item.date_creation).getTime();
      return (item['name'] === typeCampagne && item['typeContact_name'] === cible && formatStartDate <= date && date <= formatEndDate);
    });
    
    setCampain(filterCamgagne);
  }

 }

  async function GetTypeCampagne() {
    const getTypeCam = await getTypeCampagne();
    setListTypeCampagne(getTypeCam)
  }

  async function GetTypeContact() {
    const getTypeCon = await getTypesContacts();
    setListTypeContact(getTypeCon)
  }

  function handleRefetch() {
    setRefetch(prevRefetch => !prevRefetch);
    setCible()
    setEndDate()
    setEndDate()
    setTypeCampagne()
  }

  function rangePropertiesCanpaign(data){
    const rangeDate = data.map(item => {
      return {
        ...item,
        date_creation: item['date_creation'].split("T")[0]
      }
    });
    const rangeCampaign = rangeDate.sort((a,b)=>(a.id - b.id))

    return rangeCampaign;
  }
  useEffect(()=>{
    setLoading(true);
    GetTypeCampagne();
    GetCampaign();
    GetTypeContact();
    setTimeout(()=>{
      setLoading(false)
   },2000) 
  },[refech])


  useEffect(() => {
    FilterCampaign()
  }, [typeCampagne,startDate, endDate,cible])


  return (
    <>
      <FilterContainer title="Appliquer un filtre">
        <div className={classes.form_group}>
          <div className={classes.input_group}>
            <label htmlFor="date debut" className={classes.input_label}>Date début</label>
            <input type="date" name="date debut" placeholder='2024-4-21' className={classes.input_filter} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className={classes.input_group}>
            <label htmlFor="date fin" className={classes.input_label}>Date de fin</label>
            <input type="date" name="date fin" placeholder='2024-4-21' className={classes.input_filter} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className={classes.form_group}>
          <div className={classes.input_group}>
            <label htmlFor="type campagne" className={classes.input_label}>Type Campagne</label>
            <select name="typeCampagne" className={`${classes.input_filter} ${classes.select_input}`} onChange={(e) => setTypeCampagne(e.target.value)} required>
              <option value=''>Sélectionnez le type de campagne</option>
              {listTypeCampagne.length > 0 ?
                listTypeCampagne.map((tc) => (
                  <option key={tc.id} value={tc.name}>
                    {tc.name}
                  </option>
                )) : ''
              }
            </select>
          </div>
          <div className={classes.input_group}>
            <label htmlFor="Sélectionnez la cible" className={classes.input_label}>Cible</label>
            <select name="typeContacts" className={`${classes.input_filter} ${classes.select_input}`} onChange={(e) => setCible(e.target.value)} required>
              <option value=''>Sélectionnez la cible</option>
              {listTypeContacts.length > 0 ?
                listTypeContacts.map((tc) => (
                  <option key={tc.id} value={tc.typeContact_name}>
                    {tc.typeContact_name}
                  </option>
                )) : ''
              }
            </select>
          </div>
        </div>
        <div className={classes.action_icons}>
          <span className={classes.icon_container}>
            <img alt='search icon' className={classes.search_icon} src={SearchIcon} />
          </span>
          <img alt='search icon' className={classes.refresh_icon} src={refresh} onClick={() => handleRefetch()} />
        </div>
      </FilterContainer>
      <div className={classes.card}>
        {
           loading? <div className={classes.loader_container}><Preloader/></div>:
            <DataTable value={campaign} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column field="user_name" header="Emetteur" style={{ width: '20%' }}></Column>
              <Column field="name" header="Type campagne" style={{ width: '20%' }}></Column>
              <Column field="typeContact_name" header="Type de cible" style={{ width: '20%' }}></Column>
              <Column field="date_creation" header="Date de creation" style={{ width: '20%' }}></Column>
              <Column field="nombres_contacts" header="Nombre de personne envoyé" style={{ width: '20%' }}></Column>
              <Column field="recu" header="Reçu" style={{ width: '15%' }}></Column>
              <Column field="non_recu" header="Non Reçu" style={{ width: '15%' }}></Column>
            </DataTable>
        }
      </div>
    </>


  );
}

export default Report;