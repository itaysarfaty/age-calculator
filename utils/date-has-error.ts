import { DateInputs } from "@/models/input";

export const dateHasError = (dateInputs: DateInputs): boolean => {
  return Object.values(dateInputs).some((input) => input.error);
};
