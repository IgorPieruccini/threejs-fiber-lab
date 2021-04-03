import React, { useState } from "react";
import "./index.css";

export type FormState = "email" | "password" | "none";
export interface IFormContext {
  state: FormState;
}

const initialFormContext: IFormContext = {
  state: "none",
};

export const FormContext = React.createContext<IFormContext>(
  initialFormContext
);

export const Form: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<FormState>(initialFormContext.state);

  const onFocus = (selection: FormState) => () => {
    setState(selection);
  };

  const onBlur = () => {
    setState("none");
  };

  return (
    <div>
      <div className="formCanvas">
        <FormContext.Provider value={{ state }}>
          {children}
        </FormContext.Provider>
      </div>
      <div className="form">
        <div />
        <div className="formContent">
          <div className="container">
            <h1>Lucile</h1>
            <div className="form-input">
              <label htmlFor="email">
                <p>Email</p>
                <input
                  onFocus={onFocus("email")}
                  onBlur={onBlur}
                  type="text"
                  id="email"
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="password">
                <p>Password</p>
                <input
                  onFocus={onFocus("password")}
                  onBlur={onBlur}
                  type="password"
                  id="password"
                />
              </label>
            </div>

            <button type="submit">LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  );
};
