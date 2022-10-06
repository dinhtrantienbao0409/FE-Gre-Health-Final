import React, { useEffect } from "react";
import { FormStepper } from "components/LandingPage/Stepper/Stepper";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  name: yup.string().required(),
  address: yup.string().required(),
  dateOfBirth: yup.string().required(),
  gender: yup.string().required(),
  jobTitle: yup.string().required(),
  contact: yup.string().required(),
});

const Register = () => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaValidation),
  });

  const {
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);

  return (
    <div className="md:w-1/2 mx-auto my-48 shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal my-10">
        <FormProvider {...methods}>
          <FormStepper />
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
