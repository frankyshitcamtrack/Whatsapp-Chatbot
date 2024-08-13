import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from '../../context/Context'
import classes from './header.module.css'
import phone from '/assets/phone-toggle.svg'
import lock from '/assets/lock-unlock.svg'
import menu from '/assets/menu.png'
import profil from '/assets/profil.png'


function Header({page,role,name}) {
   const {displaySider,title,updatePathName,logout,currentUser} = useContext(Context);
   const url = window.location.href;
   const pathName = url.split('/')[3];


   updatePathName(pathName);
   
    return (
        <div className={classes.container}>
           <div className={classes.toggle_container}>
              <img  src={phone} onClick={displaySider}/>
              <p>{title}</p>
           </div>
           <div className={classes.user}>
              <img alt='profil' src={profil} className={classes.user_image}/>
              <div className={classes.user_info}>
                <p className={classes.user_name}>{currentUser?.user_name}</p>
                <p className={classes.user_role}>{currentUser?.role}</p>
              </div>
              <div className={classes.action_icons}>
                <img alt='menu' src={menu} className={classes.menu}/>
                <img alt='lock' src={lock} className={classes.status} onClick={logout}/>
              </div>
           </div>
        </div>
    );
}


export default Header;