export type Input = {
  label: string;
  value: number;
  error: boolean;
};

export type DateInputs = {
  day: Input;
  month: Input;
  year: Input;
};

// Create Type from keys in DateInputs
export type InputKey = keyof DateInputs;

export type Age = {
  years: string;
  months: string;
  days: string;
};
