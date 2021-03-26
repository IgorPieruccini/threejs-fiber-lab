import React from "react";
import "./index.css";

export const Form = () => {
  return (
    <div className="form">
      <div className="container">
        <div className="form-input">
          <label htmlFor="email">
            <p>Email</p>
            <input type="text" id="email" />
          </label>
        </div>

        <div className="form-input">
          <label htmlFor="password">
            <p>Password</p>
            <input type="password" id="password" />
          </label>
        </div>

        <button type="submit">Sign up</button>
      </div>
    </div>
  );
};
