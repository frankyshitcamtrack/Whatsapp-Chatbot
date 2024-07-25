import { Context } from "../context/Context";
import { useContext } from "react";
import Container from "../components/container/Container";
import Header from "./header/Header.jsx"
import SideBar from "./sidebar/SideBar.jsx"

import classes from './layout.module.css'
import MobileSidebar from "./sidebarmobile/MobileSideBar.jsx";

function Layout({children}) {
   const {displaySidebar,displaySider} = useContext(Context)
    return (
        <div className={classes.container}>
          {
            displaySidebar && <MobileSidebar display={displaySider}/>
          }
          {
                !displaySidebar  && <SideBar />
          }
         
         <div className={classes.content}>
         <Header />
         <Container title='Dashboard'>
           {children}
         </Container>
         </div>
        </div>
    );
}

export default Layout;