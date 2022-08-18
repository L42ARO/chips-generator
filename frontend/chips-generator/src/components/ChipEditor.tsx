import { IonItem, IonTextarea } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import "../theme/tailwind.css";
import "../theme/variables.css";
import "./importeditor.css";
import type { ChipStruct, CurrVals } from "./types";

type ChipEditorArgs = {
  chips: ChipStruct[] | undefined;
  setChips: React.Dispatch<React.SetStateAction<ChipStruct[] | undefined>>;
  setOpenImport: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChipEditor: React.FC<ChipEditorArgs> = (args) => {
  let ogTexts = ["Hello", "Bye", "Who am I?"];
  let ogChips = ogTexts.map((e) => {
    let chip: ChipStruct = { text: e };
    return chip;
  });
  const textEditor = useRef<HTMLIonTextareaElement>(null);
  const [dummyChips, setDummyChips] = useState<ChipStruct[]>();
  const chips = args.chips ? args.chips : dummyChips;
  const setChips = args.setChips ? args.setChips : setDummyChips;
  const [currChip, setCurrChip] = useState<CurrVals>();
  const [recoverChips, setRecoverChips]=useState<boolean>(false)
  useEffect(() => {
    var localChips = localStorage.getItem("chips");
    let chipsArr: ChipStruct[] | undefined;
    if (localChips) {
      try {
        console.log("Found some chips:" + localChips);
        chipsArr = JSON.parse(localChips);
        setRecoverChips(true);
        setTimeout(() => {
            setRecoverChips(false);
        }, 4000);
      } catch (error) {
        console.warn("There are som chips but they're corrupted" + error);
      }
    }
    setChips(chipsArr ? chipsArr : ogChips);
  }, []);
  return (
    <React.Fragment>
      <div className="w-5/6 flex justify-end items-center h-fit relative p-2">
        <button
          type="button"
          onClick={(e) => {
            args.setOpenImport(true);
          }}
          className="flex left-0 py-2 px-1 border border-solid text-sm hover:bg-df-orange-500 hover:text-black dark:border-white border-black rounded-xl active:bg-gray-300 active:text-black"
        >
          Import
        </button>
        <div className="subtitle grow flex w-full justify-center items-center">
          Chips
        </div>
        <button
          type="button"
          className="z-[999] w-fit aspect-square bg-transparent border border-solid hover:bg-df-orange-400 hover:text-black dark:border-white border-black dark:text-white text-black rounded-lg text-xl p-1 active:bg-gray-300 active:text-black"
          onClick={(e) => {
            let newChips: ChipStruct[] = [];
            if (chips) newChips = [...chips];
            newChips.push({ text: "" });
            setChips(newChips);
            let num = chips ? chips.length : 0;
            setCurrChip({ num: num, content: "" });
            setTimeout(() => {
              textEditor.current?.setFocus();
            }, 10);
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div className="font-mono explain-text p-2 w-5/6 text-center">
        Click the chips to edit their contents{" "}
      </div>
      <div className="dark:bg-dark-gray bg-light-gray py-2 pr-2 w-5/6 flex flex-wrap overflow-auto rounded-xl max-h-[90%] sm-w:max-h-[17rem]">
        {chips &&
          chips.map((v, i) => {
            return (
              <Chip
                key={`chip-${i}`}
                text={v.text}
                changeChip={setCurrChip}
                num={i}
              />
            );
          })}
      </div>
      {recoverChips&&<div className="animateFade min-h-[2.5rem] h-fit w-5/6 bg-emerald-500 rounded-xl flex items-center justify-center p-2 text-center">
        Found some chips from your last session! 😊
      </div>}
      {currChip && (
        <>
          <hr className="bg-gray-300 h-[1px] w-5/6 mt-4"></hr>
          <div className="w-5/6 h-fit flex flex-col max-h-[40%]">
            <div className="font-mono explain-text font-bold text-lg mb-2">
              CHIP #{currChip.num + 1}
            </div>
            <div className="w-full h-fit flex justify-end max-h-[85%] sm-w:max-h-[10rem]">
              <div className="w-fit h-fit mr-2 whitespace-nowrap explain-text p-2">
                Text
              </div>
              <IonItem className="rounded-xl grow overflow-auto p-0">
                <IonTextarea
                  placeholder="Enter chip text"
                  value={chips ? chips[currChip?.num].text : ""}
                  className="m-0"
                  inputMode="text"
                  rows={1}
                  ref={textEditor}
                  autoGrow={true}
                  onIonInput={(e) => {
                    if (chips) {
                      let newChips = chips.map((v, i) => {
                        if (currChip) {
                          if (i === currChip.num) {
                            return e.target.value
                              ? { text: e.target.value }
                              : { text: "" };
                          }
                        }
                        return v;
                      });
                      setChips(newChips);
                    }
                  }}
                ></IonTextarea>
              </IonItem>
              <button
                type="button"
                className="w-fit pt-2 h-fit z-[99] flex justify-center text-df-orange-900 text-2xl mx-2 active:text-red-300"
                onClick={(e) => {
                  if (chips) {
                    let newChips = [...chips];
                    if (currChip) newChips.splice(currChip?.num, 1);
                    setChips(newChips);
                    setCurrChip(undefined);
                  }
                }}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
          <hr className="bg-gray-300 h-[1px] w-5/6 mb-4 mt-2"></hr>
        </>
      )}
    </React.Fragment>
  );
};
type chipArgs = {
  num?: number;
  text?: string;
  changeChip?: React.Dispatch<React.SetStateAction<CurrVals | undefined>>;
};

const Chip: React.FC<chipArgs> = ({ num = 1, text = "Hello", changeChip }) => {
  return (
    <button
      type="button"
      className="bg-white min-h-[2rem] min-w-[3rem] shadow-black shadow-md dark:border-gray-500 border-gray-300 border-solid border rounded-[3rem] flex py-2 px-4 h-fit w-fit text-black active:bg-gray-400 active:text-white ml-2 mb-1 text-left"
      onClick={(e) => {
        if (changeChip) {
          let newChip: CurrVals = { num: num, content: text };
          changeChip(newChip);
        }
      }}
    >
      {text}
    </button>
  );
};

export default ChipEditor;
