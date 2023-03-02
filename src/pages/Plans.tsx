import React, { useState } from "react";

import { api } from "../utils/api";
import { FcProcess } from "react-icons/fc";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";
import { getRouterData } from "../Hooks.ts/globalData";
function Plans() {
  const [isVisible, setIsVisible] = useState(false);
  const [popUpData, setPopUpData] = useState({
    sessionData: () => getRouterData(),
    planData: null,
  });
  const plansData = api.example.getPlans.useQuery();

  return (
    <div
      dir="rtl"
      className=" flex min-h-screen flex-col items-center justify-center gap-12 "
    >
      <h1 className="flex text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">...</span>
        Plans
        <Link href={"/"}>
          <TiArrowBackOutline className="mr-20" />
        </Link>
      </h1>
      <div className="flex flex-col gap-2">
        {plansData.data && (
          <div className="head1 row1 ">
            <p className="pair1">שם</p>
            <p className="pair1">מחיר</p>
            <p className="pair1">ימים</p>
            <p className="pair1">תקפה עד</p>
            <p className="pair1">מטבע</p>
            <p className="pair1">קנה</p>
          </div>
        )}
        {plansData.data &&
          plansData.data.map((plan: Plan, index: number) => (
            <div key={plan.PlanName} className=" row1">
              <p className="pair1">{plan.PlanName}</p>
              <p className="pair1">{plan.Price}</p>
              <p className="pair1">{plan.Time}</p>
              <p className="pair1">{plan.EndDate ? plan.EndDate : "no data"}</p>
              <p className="pair1">{plan.Coin}</p>
              <FcProcess
                className="pair1"
                onClick={() => {
                  setPopUpData({
                    ...popUpData,
                    planData: plansData.data[index],
                  });
                  setIsVisible(true);
                }}
              />
            </div>
          ))}
      </div>
      {isVisible && <Model data={popUpData} setIsVisible={setIsVisible} />}
    </div>
  );
}

export default Plans;

interface modalProps {
  data: any;
  setIsVisible: any;
}

export const Model = (props: modalProps) => {
  console.log({ props });
  const plan: Plan = props.data.planData;
  return (
    <div
      id="pop_up"
      className={
        " fixed inset-4 flex h-full flex-col items-center justify-center bg-slate-900 bg-opacity-30 text-5xl backdrop-blur-sm"
      }
    >
      <div
        className="ga mb-12 flex w-full flex-col
      items-center p-2 text-center"
      >
        <div className="mb-8 flex">
          <p className="pair2 ">שם</p>
          <p className="pair2  w-[40vh]">{plan.PlanName}</p>
        </div>
        <div className=" row2 ">
          <p className="pair2">מחיר</p>
          <p className="pair2">ימים</p>
          <p className="pair2">תקפה עד</p>
          <p className="pair2">מטבע</p>
        </div>
        <div className=" row2 ">
          <p className="pair2">{plan.Price}</p>
          <p className="pair2">{plan.Time}</p>
          <p className="pair2">{plan.EndDate}</p>
          <p className="pair2">{plan.Coin}</p>
        </div>
      </div>
      <div className="flex gap-28">
        <button
          className="link1"
          onClick={() => {
            props.setIsVisible(false);
          }}
        >
          חייב
        </button>
        <button
          className="link1"
          onClick={() => {
            props.setIsVisible(false);
          }}
        >
          בטל
        </button>
      </div>
    </div>
  );
};
