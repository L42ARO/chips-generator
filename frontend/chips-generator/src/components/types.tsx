import React from "react";
type JSONStruct ={
    richContent: {
        type: string;
        options: ChipStruct[];
    }[][];
}
type ChipStruct = {
    text: string;
  };
  type CurrVals = {
    num: number;
    content: string;
  };
export type {JSONStruct, ChipStruct, CurrVals};