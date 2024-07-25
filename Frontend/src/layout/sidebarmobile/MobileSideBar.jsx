import { Link } from 'react-router-dom';
import classes from './sidebarMobile.module.css'
import profil from '/assets/login-illustration.png'
import MENU from '../../Contants/menu';

export default function MobileSidebar({display}) { 
        return (
            <>
             <div className={classes.sidebar_cover_container} onClick={display}></div>
                <div className={classes.sidebar_container} >
                <div className={classes.profil_container} >
                    <img alt='toggle' src={profil}/>
                </div>
                <div>
                    <p className={classes.title}>Ym@ne Boot Messenger</p>
                    <hr />
                </div>
                <ul className={classes.menu_list}>
                    {
                        MENU.map(item => (
                            <li key={item.id} className={classes.menu_item}>
                                <Link><img alt={item.title} src={item.icon}/><p>{item.title}</p></Link>
                            </li>
                        )
                        )
                    }
                </ul>
                <p className={classes.copyright}>Copyright © CAMTRACK SAS 2024 Version 1.0</p>
            </div>
            </>
        );
}

