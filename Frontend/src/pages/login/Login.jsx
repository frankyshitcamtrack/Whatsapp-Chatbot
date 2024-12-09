import { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Context } from '../../context/Context';
import classes from './login.module.css'
import Preloader from '../../components/preloader/Preloader';
import Button from '../../components/Button';
import image from '/assets/login-cover.png';
import logo from '/assets/logo.png';
import showPass from '/assets/show-pass.png';
import hidePass from '/assets/hide-pass.png';
import {login} from '../../services/users.service'


function Login() {
    const [Login,setLogin]=useState('');
    const [passWord,setPassword]=useState('');
    const [passType,setPassType]=useState('password');
    const [loading,setLoading]=useState(false);
    const [erroMessage,setErrorMessag] = useState('');
    const [displayError,setDisplayError]=useState(false);
    const {loginAuth}= useContext(Context);
    const navigate = useNavigate()
    async function handleLogin(){
      setLoading(true);
      const res=await login({email:Login,password:passWord});
      const result = await res.json();
      if(res.status===400){
        setErrorMessag(result.error);
        setDisplayError(true);
        setTimeout(() => {
        setDisplayError(false);
        }, 3000);
      }
      if(res.status===200){
        const user ={id:result.user_id,user_name:result.user_name,role:result?.role,departement:result.idDepartement};
        console.log(user);
        loginAuth(user);
        navigate("/dashboard");
      }
      setLoading(false);
    }

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
              <input type="text"  name="login" className={classes.input} onChange={(e)=>setLogin(e.target.value)} placeholder="Login"/>
              <div className={classes.input_group}>
                 <input type={passType}  name="login" className={`${classes.input} ${classes.pass_input}`} onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe"/>
                 {passType==="password"?<img src={showPass} className={classes.pass_ico} onClick={()=>setPassType('text')}/>:<img src={hidePass} className={classes.pass_ico} onClick={()=>setPassType('password')}/>} 
              </div>
              
              <Button type="button" className={classes.login_button} handleClick={handleLogin}>connexion!{loading &&<Preloader/>}</Button>
            </form>
           {displayError&&<div className={classes.error}><p>{erroMessage}</p></div>} 
            <p className={classes.copyright}>copyright © CAMTRACK SAS 2024 Version 1.0</p>
          </div>
        </main>
    );
}

export default Login;