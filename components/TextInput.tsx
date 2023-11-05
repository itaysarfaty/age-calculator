import { Input } from "@/models/input";
import { ChangeEvent } from "react";

type TextInputProps = {
  input: Input;
  onChange: (value: Input) => void;
  max: number;
};
export function TextInput({ input, onChange, max }: TextInputProps) {
  const { label, value } = input;

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => e.target.select();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    // Remove leading zeros
    e.target.value = newValue.toString();

    // Add 0 if empty
    if (e.target.value === "") {
      newValue = 0;
    }

    const newInput = {
      ...input,
      value: newValue,
      error: newValue > max,
    };
    onChange(newInput);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className="text-sm text-gray-500 font-bold"
        style={{
          // borderColor: value > max ? "red" : "",
          color: value > max ? "red" : undefined,
        }}
      >
        {label}
      </label>
      <input
        type="number"
        className="border border-gray-300 rounded-lg p-2 text-xl font-black text-black w-full pl-2 focus:outline-black"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        max={max}
        min={1}
        style={{
          outlineColor: value > max ? "red" : "",
          borderColor: value > max ? "red" : "",
          borderWidth: value > max ? 1 : 1,
        }}
      />
    </div>
  );
}
