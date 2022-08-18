import { IonItem, IonTextarea } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "../theme/tailwind.css";
import "../theme/variables.css";
import "./importeditor.css";
import { ChipStruct, JSONStruct } from "./types";

type ImportEditorArgs = {
  setOpenImport: (set: boolean) => void;
  setChips: (set: ChipStruct[]) => void;
};

const ImportEditor: React.FC<ImportEditorArgs> = (args) => {
    const [parseErr, setParseErr]=useState<boolean>(false);
  const textEditor = useRef<HTMLIonTextareaElement>(null);
  useEffect(() => {
    textEditor.current?.setFocus();
  }, []);
  const parseText = (): Promise<ChipStruct[]> | undefined => {
    let textPromise = textEditor.current
      ?.getInputElement()
      .then((e) => {
        try {
          let jsonObj: JSONStruct = JSON.parse(e.value);
          let chips: ChipStruct[] = jsonObj.richContent[0][0].options;
          return Promise.resolve(chips);
        } catch (error) {
          console.warn("Error parsing text: " + error);
          return Promise.reject(error);
        }
      })
      .catch((err) => Promise.reject(err));
    return textPromise;
  };
  return (
    <div className="absolute w-full h-full backdrop-blur-md z-[9999] flex sm:items-center justify-center overflow-hidden">
      <div className="absolute w-full h-full dark:bg-gray-500 bg-theme-light opacity-50"></div>
      {parseErr&&<div className="absolute animateFade w-3/4 h-12 bg-red-500 text-white z-[100] m-2 flex items-center justify-center rounded-full">Error: Please check your input</div>}
      <div className="w-3/4 sm-w:w-full m-4 h-fit dark:bg-ion-dark bg-light-gray z-[99] rounded-2xl overflow-hidden flex flex-col sm-w:mt-10">
        <div className="w-full flex items-center justify-end font-mono p-4 text-lg font-bold explain-text">
          <button
            onClick={(e) => {
              console.log("Parsing text...");
              let parsePromise = parseText();
              parsePromise
                ?.then((chips) => {
                  args.setChips(chips);
                  args.setOpenImport(false);
                  return true;
                })
                .catch((error) => {
                  console.warn(error);
                  setParseErr(true);
                  setTimeout(() => {
                    setParseErr(false);
                  }, 4000);
                  return false;
                });
            }}
            className="px-2 py-1 active:bg-green-500 text-base xs-w:text-sm dark:border-white hover:bg-green-400 hover:text-black border-black border-solid border-2 rounded-lg"
          >
            Done
          </button>
          <div className="grow flex justify-center xs-w:text-sm">
            IMPORT CHIPS
          </div>
          <button
            onClick={(e) => {
              args.setOpenImport(false);
            }}
            className="px-4 active:text-df-orange-900 text-2xl"
          >
            <IoMdCloseCircle />
          </button>
        </div>
        <IonItem className="grow overflow-auto">
          <IonTextarea
            rows={15}
            ref={textEditor}
            placeholder="Paste your JSON code in here"
          ></IonTextarea>
        </IonItem>
      </div>
    </div>
  );
};

export default ImportEditor;
