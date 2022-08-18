import React from "react";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import "../theme/tailwind.css";
import "../theme/variables.css";
import "./helppopup.css";

type HelpPopUpArgs={
    setOpenHelp: (set:boolean)=>void;
}
const HelpPopUp: React.FC<HelpPopUpArgs>= (args) => {
  return (
    <div className="absolute w-full h-full backdrop-blur-md z-[9999] flex sm:items-center justify-center overflow-hidden">
      <div className="absolute w-full h-full dark:bg-gray-500 bg-theme-light opacity-50"></div>
      <div className="w-3/4 md:w-2/4 sm-w:w-full m-4 pb-4 h-fit min-h-[20%] dark:bg-ion-dark bg-light-gray z-[99] rounded-2xl overflow-hidden flex flex-col sm-w:mt-10">
        <div className="w-full flex items-center justify-end font-mono p-4 text-lg font-bold explain-text">
        <div className="grow flex justify-center text-3xl xs-w:text-2xl items-center">
        <div className="mr-3"><BsQuestionDiamondFill/></div>
            HELP
          </div>
          <button
            onClick={(e) => {
              args.setOpenHelp(false);
            }}
            className="px-4 active:text-df-orange-900 text-2xl"
          >
            <IoMdCloseCircle />
          </button>
        </div>
        <div className="w-full grow px-10 flex flex-col items-center ">
            <div className="explain-text text-lg pr-4">How to use this tool?</div>
            <hr className="dark:bg-gray-300 bg-gray-600 h-[1px] w-full my-3"></hr>
            <ol>
                <li><b>1.</b>&nbsp;&nbsp;In the left box add (➕) any chips that you want</li>
                <li><b>2.</b>&nbsp;&nbsp;Click the chips to modify their content or Delete(🗑️) them</li>
                <li><b>3.</b>&nbsp;&nbsp;On the right box you'll see in real time the code (🖥️) in JSON format</li>
                <li><b>4.</b>&nbsp;&nbsp;Copy the JSON code and paste it into Dialogflow (💬) custom payload</li>
                <li><b>NOTE:</b>&nbsp;&nbsp;If you need to modify some already created chips click on Import (📥) and paste your code(📋)</li>
            </ol>
        </div>
      </div>
    </div>
  );
};

export default HelpPopUp;
