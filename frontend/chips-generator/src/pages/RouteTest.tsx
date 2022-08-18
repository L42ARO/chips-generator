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
          $r1 = document.querySelector("df-messenger");
          $r2 = $r1.shadowRoot.querySelector("df-messenger-chat");
          $r3 = $r2.shadowRoot.querySelector("df-messenger-titlebar");
          $r4 = $r2.shadowRoot.querySelector("df-message-list");
          var sheet1 = new CSSStyleSheet;
          sheet1.replaceSync(`
                  .df-messenger-wrapper {
                      z-index: 3;
                      position: relative !important;
                      height: 100%;
                      bottom: 0px !important;
                      left: 0px !important;
                      padding: 0px !important;
                      background-color: rgb(0,0,0,0);
                  }
                  .expanded > #widgetIcon {
                      visibility: hidden !important;
                  }
                  `);
          var sheet2 = new CSSStyleSheet;
          sheet2.replaceSync(`
                  div.chat-wrapper[opened="true"] {
                      height: 100% !important;
                      width: 100% !important;
                      bottom: 0px !important;
                      right: 0px !important;
                      position: absolute !important;
                      margin: 0px !important;
                      border-radius: 2vh;
                  }
                  df-messenger-titlebar {
                      display: none !important;
                  }
                  `);

          var sheet3 = new CSSStyleSheet;
          sheet3.replaceSync(`
                  .title-wrapper {
                      visibility: hidden !important;
                  }
                  `);
          var sheet4 = new CSSStyleSheet;
          sheet4.replaceSync(`
                  #messageList .message.user-message {
                      color: black !important;
                  }
                  `);
          $r1.shadowRoot.adoptedStyleSheets = [sheet1];
          $r2.shadowRoot.adoptedStyleSheets = [sheet2];
          $r3.shadowRoot.adoptedStyleSheets = [sheet3];
          $r4.shadowRoot.adoptedStyleSheets = [sheet4];
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
