import { nanoid } from 'nanoid';
import dashbordIcon from '/assets/home.svg'
import reportIcon from '/assets/report.svg'
import campaignIcon from '/assets/campagne.svg'


const MENU =[
    {
        id: nanoid(),
        title: 'Dashboard',
        path:'dashboard',
        icon: dashbordIcon
    },
    {
        id: nanoid(),
        title: 'Créer une campagne',
        path:'campaign',
        icon: campaignIcon
    },
    {
        id: nanoid(),
        title: 'Historique report',
        path:'report',
        icon: reportIcon
    },
 
];

export default MENU;
