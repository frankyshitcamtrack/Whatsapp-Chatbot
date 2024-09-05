import { NavLink } from 'react-router-dom';
import classes from './sidebarMobile.module.css'
import profil from '/assets/login-illustration.png'
import MENU from '../../Contants/menu';
import dot from '/assets/dot.png';
import settingIcon from '/assets/setting.svg'
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function MobileSidebar({ display }) {
    const {dropdownDisplay,displayDropdown,currentUser}=useContext(Context);
    const url = window.location.href;
    const pathName = url.split('/')[3];
   
    return (
        <>
            <div className={classes.sidebar_cover_container} onClick={display}></div>
            <div className={classes.sidebar_container} >
                <div className={classes.profil_container} >
                    <img alt='toggle' src={profil} />
                </div>
                <div>
                    <p className={classes.title}>Ym@ne Boot Messenger</p>
                    <hr />
                </div>
                <ul className={classes.menu_list}>
                {
                    MENU.map(item => (
                        <NavLink key={item.id}  to={item.path} className={({ isActive }) => (isActive ? classes.active : classes.menu_item)}><img alt={item.title} src={item.icon} /><p>{item.title}</p></NavLink>
                    ))
                }
                  {
                    currentUser.role==="super-admin" &&
                    <li className={`${pathName==='settings' && classes.menu_dropdowwn} ${classes.menu_item}`} onClick={displayDropdown}>
                    <a><img alt='settings' src={settingIcon}/><p>Settings</p> </a>
                   </li>
                }
                   {
                   (currentUser.role==="super-admin" && dropdownDisplay) &&
                    <div className={classes.dropdown_menu_container}>
                    <span>
                        <NavLink to='/settings/utilisateurs'  className={({ isActive }) => (isActive ? classes.secondaryactive : '')}>
                            <img alt='utilisateur' src={dot} /><p>Utilisateur</p>
                        </NavLink>
                    </span>
                    <span>
                        <NavLink to='/settings/type-campagne' className={({ isActive }) => (isActive ? classes.secondaryactive :'')}>
                            <img alt='campagne' src={dot} /><p>Type de Campagne</p>
                        </NavLink>
                    </span>
                </div>
                }
                   
               
            </ul>
                <p className={classes.copyright}>Copyright © CAMTRACK SAS 2024 Version 1.0</p>
            </div>
        </>
    );
}

