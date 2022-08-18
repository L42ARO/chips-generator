import React, { useEffect, useRef } from "react";
import { IonButton, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { ReactComponent as ChipsGenIcon } from "../theme/ChipsGenIconSVG.svg";
import $ from "jquery";

interface RouteTestArgs {
  appVersion: string;
}

const RouteTest: React.FC<RouteTestArgs>= (args) => {
  const [chatbotHtml, setChatbotHtml] = React.useState<string>("");
  const [agentId, setAgentId] = React.useState<string>("");
  const [startIntent, setStartIntent] = React.useState<string>("");
  const [chatTitle, setChatTitle] = React.useState<string>("");
  const refreshPage = () => {
    window.location.reload();
  }
  const handleChatbotHtmlChange = () => {
    var newHtmlBot = `
    <df-messenger
      intent="${startIntent}"
      chat-title="${chatTitle}"
      agent-id="${agentId}"
      language-code="en"
      expand="true"
    ></df-messenger>`;
    setChatbotHtml(newHtmlBot);
    localStorage.setItem("chatbotHtml", newHtmlBot);
    localStorage.setItem("agentId", agentId);
    localStorage.setItem("startIntent", startIntent);
    localStorage.setItem("chatTitle", chatTitle);
    refreshPage();

  }
  useEffect(()=>{
    setChatbotHtml(localStorage.getItem("chatbotHtml") || "");
    setAgentId(localStorage.getItem("agentId") || "");
    setStartIntent(localStorage.getItem("startIntent") || "");
    setChatTitle(localStorage.getItem("chatTitle") || "");
    $(function(){
        window.addEventListener("dfMessengerLoaded",()=>{
            console.log("dfMessengerLoaded");
        })
    });
  },[]);
  return (
    <IonPage>
      <IonHeader>
        <div className="h-14 w-full xxs-w:h-16 dark:bg-white bg-white flex flex-col justify-center items-center">
          <div className="w-full h-fit flex xxs-w:flex-wrap justify-center items-center font-Monofett text-black text-4xl xs-w:text-2xl">
            Chips&nbsp;
            <ChipsGenIcon className="h-[45px] xs-w:h-[35px] xxs-w:h-0" />
            &nbsp;Generator
          </div>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <div className="relative w-full h-full sm-w:h-fit flex flex-wrap justify-center items-center dark:bg-theme-dark bg-theme-light">
            <div className="w-1/3">
                <IonItem>
                    <IonLabel position="stacked">Agent ID </IonLabel>
                    <IonInput placeholder="xxxxxx-xxxxx-xxxxx-xxxx" value={agentId} 
                    onIonChange={
                        e=>{
                            if(e.target.value){
                                setAgentId(e.target.value.toString());
                            }
                        }
                    }/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Start Intent </IonLabel>
                    <IonInput placeholder="Welcome" value={startIntent}
                    onIonChange={
                        e=>{
                            if(e.target.value){
                                setStartIntent(e.target.value.toString());
                            }
                        }
                    }/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Chat Title </IonLabel>
                    <IonInput placeholder=" 3PO-Chatbot" value={chatTitle}
                    onIonChange={
                        e=>{
                            if(e.target.value){
                                setChatTitle(e.target.value.toString());
                            }
                        }
                    }
                    />
                </IonItem>
                {agentId!=="" && startIntent!=="" && chatTitle!=="" &&
                    <div className="w-full flex justify-center p-2">
                        <IonButton onClick={e=>{handleChatbotHtmlChange()}}>UpdateBot</IonButton>
                    </div>
                }
            </div>
            <div className="w-1/3">
                {chatbotHtml!=="" &&
                    <div dangerouslySetInnerHTML={{__html:chatbotHtml}}/>
                }
                {
                    chatbotHtml==="" &&
                    <div className="w-full flex justify-center p-2">
                        Please put in the chatbot information
                    </div>
                }
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

export default RouteTest;
