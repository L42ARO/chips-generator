import React, { useEffect, useRef } from "react";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import { ReactComponent as ChipsGenIcon } from "../theme/ChipsGenIconSVG.svg";
import $ from "jquery";
import { Link } from "react-router-dom";

interface RouteTestArgs {
  appVersion: string;
}

const RouteTest: React.FC<RouteTestArgs> = (args) => {
  const [chatbotHtml, setChatbotHtml] = React.useState<string>("");
  const [agentId, setAgentId] = React.useState<string>("");
  const [startIntent, setStartIntent] = React.useState<string>("");
  const [chatTitle, setChatTitle] = React.useState<string>("");
  const [chatMessages, _setChatMessages] = React.useState<string[]>([]);
  const [sending, _setSending] = React.useState<boolean>(false);
  const [msgNum, _setMsgNum] = React.useState<number>(1);
  const chatMessagesRef = React.useRef(chatMessages);
  const sendingRef = React.useRef(sending);
  const msgNumRef = React.useRef(msgNum);
  const setChatMessages = (data:string[]) => {
    chatMessagesRef.current = data;
    _setChatMessages(data);
  }
  const setSending = (data:boolean) => {
    sendingRef.current = data;
    _setSending(data);
  }
  const setMsgNum = (data:number) => {
    msgNumRef.current = data;
    _setMsgNum(data);
  }
  const refreshPage = () => {
    window.location.reload();
  };
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
  };
  function keepSending() {
    setTimeout(() => {
      var $r1 = document.querySelector("df-messenger");
      var $r2 = $r1?.shadowRoot?.querySelector("df-messenger-chat");
      var lastMsg = $r2?.shadowRoot
        ?.querySelector(".chat-wrapper")
        ?.querySelector("df-message-list")
        ?.shadowRoot?.querySelector(".message-list-wrapper")
        ?.querySelector("#messageList")?.lastElementChild;
      if (lastMsg?.classList.contains("bot-message")) {
        if (sendingRef.current && msgNumRef.current < chatMessagesRef.current.length && msgNumRef.current<20) {
          var $r5 = $r2?.shadowRoot
            ?.querySelector(".chat-wrapper")
            ?.querySelector("df-messenger-user-input")
            ?.shadowRoot?.querySelector(".input-container>.input-box-wrapper")
            ?.querySelector("input");
          var $r6 = $r2?.shadowRoot
            ?.querySelector(".chat-wrapper")
            ?.querySelector("df-messenger-user-input")
            ?.shadowRoot?.querySelector(".input-container>.input-box-wrapper")
            ?.querySelector("#sendIcon");
          if ($r5) {
            $($r5).val(chatMessagesRef.current[msgNumRef.current]);
            $r6?.dispatchEvent(new Event('click'));
            setMsgNum(msgNumRef.current + 1);
          }
        } else if(sendingRef.current){
            setSending(false);
        }
        console.log("Messages length "+ chatMessagesRef.current.length +"; msgNum "+ msgNumRef.current+"; sending "+ sendingRef.current);
      }
    }, 5);
  }
  useEffect(() => {
    setChatbotHtml(localStorage.getItem("chatbotHtml") || "");
    setAgentId(localStorage.getItem("agentId") || "");
    setStartIntent(localStorage.getItem("startIntent") || "");
    setChatTitle(localStorage.getItem("chatTitle") || "");
    // $(function () {
    //   window.addEventListener("dfMessengerLoaded", function () {
    //     var dfMessenger = document.querySelector("df-messenger");
    //     dfMessenger?.addEventListener("df-response-received", keepSending);
    //   });
    // });
  }, []);
  const AutoSendMessage = () => {
    var $r1 = document.querySelector("df-messenger");
    var $r2 = $r1?.shadowRoot?.querySelector("df-messenger-chat");
    var $r5 = $r2?.shadowRoot
      ?.querySelector(".chat-wrapper")
      ?.querySelector("df-messenger-user-input")
      ?.shadowRoot?.querySelector(".input-container>.input-box-wrapper")
      ?.querySelector("input");
    var $r6 = $r2?.shadowRoot
      ?.querySelector(".chat-wrapper")
      ?.querySelector("df-messenger-user-input")
      ?.shadowRoot?.querySelector(".input-container>.input-box-wrapper")
      ?.querySelector("#sendIcon");
    if ($r5) {
      $($r5).val(chatMessages[0]);
      $r6?.dispatchEvent(new Event('click'));
      setMsgNum(1);
      setSending(true);
    }
  };
  useEffect(() => {
    var dfMessenger = document.querySelector("df-messenger");
    dfMessenger?.addEventListener("df-response-received", keepSending);
    return ()=> dfMessenger?.removeEventListener("df-response-received", keepSending);
  }, [sending]);/*
  useEffect(() => {
    var dfMessenger = document.querySelector("df-messenger");
    dfMessenger?.addEventListener("df-response-received", keepSending);
    return ()=> dfMessenger?.removeEventListener("df-response-received", keepSending);
  }, [msgNum]);
  useEffect(() => {
    var dfMessenger = document.querySelector("df-messenger");
    dfMessenger?.addEventListener("df-response-received", keepSending);
    return ()=> dfMessenger?.removeEventListener("df-response-received", keepSending);
  },[chatMessages]);*/
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
        <div className="flex justify-around bg-black">
          <Link to="/"> Chips</Link>
          <Link to="/route-test"> Route Tester</Link>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <div className="relative w-full h-full sm-w:h-fit flex flex-wrap justify-center items-center dark:bg-theme-dark bg-theme-light">
          <div className="w-1/3">
            <IonItem>
              <IonLabel position="stacked">Agent ID </IonLabel>
              <IonInput
                placeholder="xxxxxx-xxxxx-xxxxx-xxxx"
                value={agentId}
                onIonChange={(e) => {
                  if (e.target.value) {
                    setAgentId(e.target.value.toString());
                  }
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Start Intent </IonLabel>
              <IonInput
                placeholder="Welcome"
                value={startIntent}
                onIonChange={(e) => {
                  if (e.target.value) {
                    setStartIntent(e.target.value.toString());
                  }
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Chat Title </IonLabel>
              <IonInput
                placeholder=" 3PO-Chatbot"
                value={chatTitle}
                onIonChange={(e) => {
                  if (e.target.value) {
                    setChatTitle(e.target.value.toString());
                  }
                }}
              />
            </IonItem>
            {agentId !== "" && startIntent !== "" && chatTitle !== "" && (
              <>
                <div className="w-full flex justify-center p-2">
                  <IonButton
                    onClick={(e) => {
                      handleChatbotHtmlChange();
                    }}
                  >
                    UpdateBot
                  </IonButton>
                </div>
                <div>
                  <IonItem>
                    <IonLabel position="stacked">Texts </IonLabel>
                    <IonTextarea
                      placeholder="Enter the chatbot texts here separated by a comma"
                      value={chatMessages.join(",")}
                      onIonChange={(e) => {
                        if (e.target.value) {
                          var messages = e.target.value.split(",");
                          setChatMessages(messages);
                        }
                      }}
                    />
                  </IonItem>
                </div>
                <div className="w-full flex justify-center p-2">
                  <IonButton
                    onClick={(e) => {
                      AutoSendMessage();
                    }}
                  >
                    Send Message
                  </IonButton>
                </div>
              </>
            )}
          </div>
          <div className="w-1/3">
            {chatbotHtml !== "" && (
              <div dangerouslySetInnerHTML={{ __html: chatbotHtml }} />
            )}
            {chatbotHtml === "" && (
              <div className="w-full flex justify-center p-2">
                Please put in the chatbot information
              </div>
            )}
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <div className="relative w-full flex items-end justify-center sm-w:justify-end">
          <div className="absolute flex justify-center items-end sm-w:pl-3 sm-w:pr-2 font-mono text-xs sm-w:text-[0.5rem] dark:text-gray-500 text-gray-400 footergrad">
            {args.appVersion}
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default RouteTest;
