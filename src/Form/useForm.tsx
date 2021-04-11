import { useContext } from "react";
import { IFormContext, FormContext } from "./Form";

export const useForm = (): IFormContext => {
  const context = useContext(FormContext);
  if (!context) Error("useForm can only be used inside a <Form/> component");
  return context;
};
