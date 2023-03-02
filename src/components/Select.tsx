import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type selectProps = {
  default: string | number | null | undefined;
  values: string[] | number[];
  textStyls?: string;
  handleChange?: any;
  value?: string | undefined;
};

function Select_(props: selectProps) {
  //  console.log({ props });
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.handleChange && props.handleChange(e);
  };
  return (
    <select
      name="select"
      value={props.value}
      className={`w-full ${
        props.textStyls ?? ""
      }   text-center font-bold text-black`}
      id="pivot"
      //   placeholder={props.default}
      onChange={(e) => handleSelect(e)}
      defaultValue={props.default ?? ""}
    >
      {props.values.map((item: any, idx: number) => {
        return (
          <option className="w-1/3 text-xl text-black" key={idx}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default Select_;
