import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiLaserWarning } from 'react-icons/gi'
setupIonicReact();

type AppVersion = {
  version: string;
  update_assets: boolean;
};
//I modified some code yey!s

const App: React.FC = () => {
  const currVersion='v0.01';
  const [up2date, setUp2date]=useState<boolean>(true)
  const [alert, setAlert]=useState<boolean>(false)
  const [needUninstall, setNeedUninstall]=useState<boolean>(false)
  const GetAppVersion = async ()=>{
    try{
      // var res = await fetch("http://127.0.0.1:8000/app-version")
      var res =await fetch('https://chips-generator.herokuapp.com/app-version');
      console.log(res);
      res.json().then((data)=>{
        let app:AppVersion = data;
        console.log("Current App Version: "+app.version)
        //DO NOT MODIFY UNLESS COMPLETELY NECESSARY
        if (app.version>currVersion){
          console.log("outdated");
          setUp2date(false);
          setAlert(true);
          if(app.update_assets){
            setNeedUninstall(true);
          }
        }
      }).catch(error=>console.warn("Error parsing data for new version: "+error))
    }
    catch(error){
      console.warn("Error getting curr app version: "+error)
    }
  }
  useEffect(()=>{
    GetAppVersion();
  },[])
  return (
    <IonApp>
      {(!up2date&&alert)&&<div className="absolute z-[999] w-full h-24 sm-w:h-24 sm-w:text-xs flex items-center justify-center p-2 mt-14">
        <div className="flex justify-center items-center sm-w:w-full w-4/5 h-full p-5 bg-red-400 rounded-full shadow-black shadow-xl border-2 border-solid border-red-500">
          <div className="text-4xl mr-2">
            <GiLaserWarning/>
          </div>
          <div className="grow flex justify-center">
            New App Version Available,&nbsp;
            {needUninstall?<>Please completely uninstall this web-app then Re-Install it to Update</>:<>completely close this web-app to Update then Re-enter</>}
          </div>
          <button type="button" className="text-white text-2xl pl-2 active:text-red-800" onClick={(e)=>setAlert(false)}>
            <AiFillCloseCircle/>
          </button>
        </div>
      </div>}
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home appVersion={currVersion}/>
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
