"use client";
import { useState } from "react";
import { PiArrowFatDownFill } from "react-icons/pi";

import { getDaysInMonth } from "@/utils/get-days-in-month";
import { debouncedSetAge } from "@/utils/debounce-set-age";
import { DateInputs, Input, InputKey } from "@/models/input";
import { TextInput } from "@/components/TextInput";
import { dateHasError } from "@/utils/date-has-error";

const getMaxForNumberInput = ({ day }: DateInputs, key: string) => {
  if (key === "day") return getDaysInMonth(day.value) ?? 31;
  if (key === "month") return 12;
  if (key === "year") return new Date().getFullYear();
  return 9999;
};

const today = new Date();

const defaultInputs: DateInputs = {
  month: {
    label: "MONTH",
    value: today.getMonth() + 1,
    error: false,
  },
  day: {
    label: "DAY",
    value: today.getDate(),
    error: false,
  },
  year: {
    label: "YEAR",
    value: today.getFullYear(),
    error: false,
  },
};

export default function Calculator() {
  const [dateInputs, setDateInputs] = useState<DateInputs>(defaultInputs);
  const [age, setAge] = useState({
    years: "0",
    months: "0",
    days: "0",
  });

  const inputsEntries = Object.entries(dateInputs);
  const hasError = dateHasError(dateInputs);

  const updateValue = (key: InputKey, value: Input) => {
    const prevInput = dateInputs[key];
    const newInput = { ...prevInput, ...value };
    setDateInputs((prev) => {
      const newDate = { ...prev, [key]: newInput };
      if (!dateHasError(newDate))
        debouncedSetAge({ dateInputs: newDate, setAge });
      return newDate;
    });
  };

  return (
    <main className="grid h-screen w-screen place-items-center px-4">
      <form className="bg-white flex flex-col px-7 py-10 rounded-3xl rounded-br-[100px] max-w-[390px] w-full gap-8 relative">
        {/* Text Inputs */}
        <div className="flex flex-auto gap-5">
          {inputsEntries.map(([key, input]) => {
            const max = getMaxForNumberInput(dateInputs, key);
            return (
              <TextInput
                key={key}
                input={input}
                onChange={(value) => updateValue(key as InputKey, value)}
                max={max}
              />
            );
          })}
        </div>
        {/* Divider */}
        <div className="relative grid place-items-center">
          <div className="border-b border-gray-300 w-full absolute" />
          <div className="h-[60px] aspect-square rounded-full bg-purple-600 z-10 grid place-items-center">
            <PiArrowFatDownFill size={20} />
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-3">
          <Result value={age.years} label="years" hasError={hasError} />
          <Result value={age.months} label="months" hasError={hasError} />
          <Result value={age.days} label="days" hasError={hasError} />
        </div>
      </form>
    </main>
  );
}

function Result({
  value,
  label,
  hasError,
}: {
  value: string;
  label: string;
  hasError?: boolean;
}) {
  return (
    <h1 className="text-6xl font-black text-black italic">
      <span className="text-purple-600 mr-2">{hasError ? "X" : value}</span>
      {label}
    </h1>
  );
}
