import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { CodeBlock, dracula } from "react-code-blocks";
import "../theme/tailwind.css";
import "../theme/variables.css";
import { JSONStruct } from "./types";

type CodeResultArgs ={
    JSONtext?:string;
}

const CodeResult: React.FC<CodeResultArgs>= ({JSONtext}) => {
  return (
    <React.Fragment>
      <div className="subtitle">Code</div>
      <div className="font-mono explain-text p-2 w-5/6 text-center">
        Copy the JSON code bellow and paste it into the dialogflow custom
        payload box
      </div>
      <div className="w-11/12 h-fit max-h-[80%] bg-dark-gray text-xs relative flex">
        <JSONText JSONtext={JSONtext}/>
        <div className="absolute w-full h-fit flex justify-end pt-2 pr-5 text-2xl">
          <button
            type="button"
            className="h-fit p-2 w-fit active:bg-black active:text-white text-black bg-white flex justify-center items-center rounded-lg"
            onClick={e=>{
                navigator.clipboard.writeText(JSONtext?JSONtext:"");
            }}
          >
            <div className="text-base mr-2">Copy</div>
            <IoCopy />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
type JSONTextArgs={
    JSONtext?:string;
}
const JSONText: React.FC<JSONTextArgs> = ({JSONtext}) => {
  var dataDummy = {
    richContent: [
      [
        {
          type: "chips",
          options: [
            { text: "Ava run ava_chipstest" },
            { text: "How are you?" },
            { text: "Hello" },
            { text: "Who is my advisor?" },
            { text: "Who is the dean of the honors college?" },
            { text: "Whoasfdasdfjasldfkjaslfdkjasldfkjasdf;lkjasd?" },
          ],
        },
      ],
    ],
  };
  const stringData=JSONtext?JSONtext:JSON.stringify(dataDummy, null, 2);
  return (
    // <pre className="w-full overflow-auto">
    //     {JSONtext}
    // </pre>
    <div className="w-full overflow-auto">
      <CodeBlock text={stringData} theme={dracula} language="json" />
    </div>
  );
};

export default CodeResult;
