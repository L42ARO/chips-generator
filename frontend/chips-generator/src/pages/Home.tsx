import {
  IonContent, IonFooter, IonHeader, IonItem, IonMenu, IonPage, IonList
} from "@ionic/react";

import { useEffect, useState } from "react";
import { BsQuestionDiamondFill } from 'react-icons/bs';
import ChipEditor from "../components/ChipEditor";
import CodeResult from "../components/CodeResult";
import HelpPopUp from "../components/HelpPopUp";
import ImportEditor from "../components/ImportEditor";
import type { ChipStruct, JSONStruct } from '../components/types';
import { ReactComponent as ChipsGenIcon } from "../theme/ChipsGenIconSVG.svg";
import "../theme/tailwind.css";
import "../theme/variables.css";
import "./Home.css";

interface HomeArgs {
  appVersion: string
}

const Home: React.FC<HomeArgs>= (args) => {
  let ogJSON:JSONStruct = {
    richContent: [
      [
        {
          type: "chips",
          options: [],
        },
      ],
    ],
  };
  const [JSONtext, setJSONtext] = useState<string>('');
  const [chips, setChips] = useState<ChipStruct[]>();
  const [openImport, setOpenImport]=useState<boolean>(false);
  const [openHelp, setOpenHelp]= useState<boolean>(false);
  useEffect(()=>{
    let newJSONobj=ogJSON;
    newJSONobj.richContent[0][0].options=chips?chips:[];
    let newJSONtxt=JSON.stringify(newJSONobj, null, 4)
    setJSONtext(newJSONtxt);
    if(chips){
      localStorage.setItem("chips",JSON.stringify(chips));
    }
    
  },[chips])
  return (
    <IonPage>
      <IonHeader>
        <div className="h-14 w-full xxs-w:h-16 dark:bg-white bg-white flex flex-col justify-center items-center">
          <div className="w-full h-fit flex xxs-w:flex-wrap justify-center items-center font-Monofett text-black text-4xl xs-w:text-2xl">
            Chips&nbsp;
            <ChipsGenIcon className="h-[45px] xs-w:h-[35px] xxs-w:h-0"/>
            &nbsp;Generator
          </div>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <div className="relative w-full h-full sm-w:h-fit flex flex-wrap items-center dark:bg-theme-dark bg-theme-light">
          {openImport&&<ImportEditor setOpenImport={setOpenImport} setChips={setChips}/>}
          {openHelp&&<HelpPopUp setOpenHelp={setOpenHelp}/>}
          <div className="h-full py-5 w-[48.5%] sm-w:w-full flex flex-col justify-center items-center">
            <ChipEditor setChips={setChips} chips={chips} setOpenImport={setOpenImport}/>
          </div>
          <div className="w-[3%] h-full sm-w:scale-0 sm-w:h-0 sm-w:w-0 flex flex-col items-center pt-7 pb-10">
            <button className="pb-5 text-3xl dark:text-white active:text-df-orange-900" onClick={e=>{setOpenHelp(true)}}>
              <BsQuestionDiamondFill/>
            </button>
            <div className="w-[1px] grow bg-gray-300"></div>
          </div>
          <div className="h-full w-[48.5%] py-5 sm-w:w-full flex flex-col justify-center items-center">
            <CodeResult JSONtext={JSONtext}/>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <div className="relative w-full flex items-end justify-center sm-w:justify-end">
          <div className="absolute flex justify-center items-end sm-w:pl-3 sm-w:pr-2 font-mono text-xs sm-w:text-[0.5rem] dark:text-gray-500 text-gray-400 footergrad">{args.appVersion}</div>
        </div>
      </IonFooter>
    </IonPage>
  );
};


export default Home;
