import { useState } from "react";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import Router from "./Router";

function App() {
const [isLoged,setIsLoged] =useState(false);

function login(){
  setIsLoged((prevState)=>!prevState)
}

return isLoged?<Layout><Router/></Layout>:<Login isLogin={login}/>

}

export default App
