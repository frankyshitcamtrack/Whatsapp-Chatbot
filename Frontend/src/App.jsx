import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Router from "./routes/Router";



function App() {
  const navigate = useNavigate();
  const { isLoged } = useContext(Context);

  function navigation() {
    isLoged ? navigate('/dashboard') : navigate('/login')
  }

  useEffect(() => {
     navigation()
  },[isLoged])
  
  return <Router />
}

export default App
