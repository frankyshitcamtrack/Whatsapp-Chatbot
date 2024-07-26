import { useState,useContext } from 'react'
import { Context } from '../../context/Context';
import classes from './login.module.css'
import Input from '../../components/Input';
import Button from '../../components/Button';
import image from '/assets/login-cover.png';
import logo from '/assets/logo.png'



function Login() {
    const [passwordType,setInputType]=useState('password');
    const [Login,setLogin]=useState('');
    const [passWord,setPassword]=useState('');
    const {login}= useContext(Context)
    return (
        <main className={classes.main_login}>
         <div className={classes.cover_div}>
           <img src={image} className={classes.cover_image}/>
           <img src={logo} className={classes.logo}/>
         </div>
         
          <div className={classes.form_div}>
           <div className={classes.img}>
           </div>
            
            <h1>BIENVENU SUR </h1>
            <h1>Ym@ne Boot Messenger</h1>
            <form className={classes.form}>
              <Input type="text"  name="login" className={classes.input} handleChange={(e)=>setLogin(e.target.value)} placeholder="Login"/>
              <Input type={passwordType}  name="login" className={classes.input} handleChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe"/>
              <Button type="button" className={classes.login_button} handleClick={login}>connexion!</Button>
            </form>
            <p className={classes.copyright}>copyright © CAMTRACK SAS 2024 Version 1.0</p>
          </div>
        </main>
    );
}

export default Login;