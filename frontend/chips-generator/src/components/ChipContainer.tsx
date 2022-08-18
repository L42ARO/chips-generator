import React from 'react';
import {CurrVals, ChipStruct} from './types';

type ChipContainer={
    chips: ChipStruct[];
    setCurrChip: React.Dispatch<React.SetStateAction<CurrVals | undefined>>
}
const ChipContainer: React.FC<ChipContainer> = (params) => {
    const chips = params.chips;
    const setCurrChip = params.setCurrChip;
    return (
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
    );
}

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
  }
    export default ChipContainer;