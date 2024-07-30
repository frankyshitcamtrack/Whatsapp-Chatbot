import { nanoid } from 'nanoid';
import dashbordIcon from '/assets/home.svg'
import settingIcon from '/assets/setting.svg'
import reportIcon from '/assets/report.svg'
import campaignIcon from '/assets/campagne.svg'
import dot from '/assets/dot.png'

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
    {
        id: nanoid(),
        title: 'Utilisateurs',
        path:'utilisateurs',
        icon: dot
    },
    {
        id: nanoid(),
        title: 'Type de Campagne',
        path:'type-campagne',
        icon: dot
    }, 
];

export default MENU;
