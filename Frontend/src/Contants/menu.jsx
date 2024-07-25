import { nanoid } from 'nanoid';
import dashbordIcon from '/assets/home.svg'
import settingIcon from '/assets/setting.svg'
import reportIcon from '/assets/report.svg'
import campaignIcon from '/assets/campagne.svg'

const MENU =[
    {
        id: nanoid(),
        title: 'Dashboard',
        icon: dashbordIcon
    },
    {
        id: nanoid(),
        title: 'Créer une campagne',
        icon: campaignIcon
    },
    {
        id: nanoid(),
        title: 'Historique report',
        icon: reportIcon
    },
    {
        id: nanoid(),
        title: 'Configuration',
        icon: settingIcon
    },
];

export default MENU;
