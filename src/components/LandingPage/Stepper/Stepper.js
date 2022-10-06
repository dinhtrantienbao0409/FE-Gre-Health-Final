import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { Stepper, Step, StepLabel, Button } from "@mui/material";

import { Account } from "components/LandingPage/Stepper/Steps/Account";
import { Details } from "components/LandingPage/Stepper/Steps/Details";

import { registerFunc } from "services/Auth";

export const FormStepper = () => {
  const navigate = useNavigate();
  const { watch, errors } = useFormContext();
  const [activeStep, setActiveStep] = useState(0);
  const [compiledForm, setCompiledForm] = useState({});
  console.log(
    "🚀 ~ file: Stepper.js ~ line 143 ~ FormStepper ~ compiledForm",
    compiledForm
  );

  function getSteps() {
    return ["Account", "Details"];
  }

  function getStepContent(step, formContent) {
    switch (step) {
      case 0:
        return <Account {...{ formContent }} />;
      case 1:
        return <Details {...{ formContent }} />;
      default:
        return "Unknown step";
    }
  }

  const steps = getSteps();
  const form = watch();

  console.log("🚀 ~ file: Stepper.js ~ line 149 ~ FormStepper ~ form", form);

  const handleNext = () => {
    let canContinue = true;

    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, account: form });
        canContinue = true;
        break;
      case 1:
        setCompiledForm({ ...compiledForm, details: form });
        canContinue = handleSubmit({ ...compiledForm, details: form });
        break;

      default:
        return "not a valid step";
    }
    if (canContinue) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, details: form });
          break;
        default:
          return "not a valid step";
      }
    }
  };

  const handleReset = () => {
    navigate("/login");
  };

  const handleSubmit = async (form) => {
    if (_.isEmpty(errors)) {
      console.log("submit", form);

      const accountData = form.account;
      console.log(
        "🚀 ~ file: Stepper.js ~ line 198 ~ handleSubmit ~ accountData",
        accountData
      );
      const userData = form.details;
      console.log(
        "🚀 ~ file: Stepper.js ~ line 200 ~ handleSubmit ~ userData",
        userData
      );

      const payload = Object.assign(accountData, userData);
      console.log(
        "🚀 ~ file: Stepper.js ~ line 225 ~ handleSubmit ~ payload",
        payload
      );

      const response = await registerFunc(payload);

      const token = response.data;
      if (!token) return;
      localStorage.setItem("access_token", token);
    }
  };

  return (
    <div>
      <div>
        <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
          Register Form
        </h2>
      </div>
      <Stepper className="mx-32" activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <div className=" mt-4 flex flex-col items-center gap-5">
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-20 h-20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-3 text-xl font-semibold uppercase text-blue-500">
                Congratulations!
              </div>
              <div className="text-lg font-semibold text-gray-400">
                Your Account has been created.
              </div>
              <Button variant="contained" onClick={() => handleReset()}>
                Login
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, compiledForm)}
            <div>
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
