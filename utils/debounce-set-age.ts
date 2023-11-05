import { Age, DateInputs } from "@/models/input";
import { debounce } from "lodash-es";
import { calculateAge } from "./calculate-age";

type DebouncedSetAge = {
  dateInputs: DateInputs;
  setAge: (age: Age) => void;
};

export const debouncedSetAge = debounce(
  ({ dateInputs, setAge }: DebouncedSetAge) => {
    const age = calculateAge({
      month: dateInputs.month.value,
      day: dateInputs.day.value,
      year: dateInputs.year.value,
    });
    setAge(age);
  },
  800
);
