import React, { useState } from "react";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";
import PersonalDetails from "@/components/ui/personalDetails";
import ProfileForm from "@/components/ui/ratings";
import CompleteProfile from "@/components/ui/treatmentDetails";
import Issues from "@/components/ui/issues";
import Payment from "@/components/ui/payment";
import ProgressBar from "@/components/ui/progressBar";
import { Persist } from "formik-persist";

// Validation Schemas
const personalDetailsSchema = Yup.object({
  dob: Yup.string().required("Date of Birth is required"),
  location: Yup.string().required("Location is required"),
  gender: Yup.string().required("Gender is required"),
  issues: Yup.array()
    .of(Yup.string())
    .required("Select at least one issue")
    .min(1),
});

const ratingsSchema = Yup.object().shape({
  ratings: Yup.object().shape({
    Physiotherapist: Yup.number()
      .min(1, "Please rate at least 1 star")
      .required("Physiotherapist rating is required"),
    Chiropractor: Yup.number()
      .min(1, "Please rate at least 1 star")
      .required("Chiropractor rating is required"),
    Osteopath: Yup.number()
      .min(1, "Please rate at least 1 star")
      .required("Osteopath rating is required"),
    Myotherapist: Yup.number()
      .min(1, "Please rate at least 1 star")
      .required("Myotherapist rating is required"),
    RMT: Yup.number()
      .min(1, "Please rate at least 1 star")
      .required("Remedial Massage Therapist rating is required"),
    A_TD: Yup.number()
      .min(1, "Please rate at least 1 star")
      .required("Acupuncturist/TCM Doctor rating is required"),
  }),
});

const issuesSchema = Yup.object({
  treatmentIssues: Yup.array()
    .of(Yup.string())
    .required("Required")
    .min(1, "At least one issue is required"),
});

const treatmentDetailsSchema = Yup.object({
  diagnosed: Yup.string().required("Required"),
  treatmentLocation: Yup.string().required("Location is required"),
  specifyTreatment: Yup.string().required("Required"),
  comments: Yup.string()
    .min(15, "Must be at least 15 characters")
    .max(100, "Max 100 characters"),
});

const paymentSchema = Yup.object({});

interface FormValues {
  image: string;
  location: string;
  dob: string;
  gender: string;
  issues: string[];

  ratings: {
    Physiotherapist: number;
    Chiropractor: number;
    Osteopath: number;
    Myotherapist: number;
    RMT: number;
    A_TD: number;
  };

  treatmentIssues: string[];

  diagnosed: string;
  treatmentLocation: string;
  specifyTreatment: string;
  comments: string;

  bsb: number;
  accountHolder: string;
  accountNumber: number;
}

const StepForm = () => {
  const [step, setStep] = useState(1);

  const initialValues: FormValues = {
    image: "",
    location: "",
    dob: "",
    gender: "",
    issues: [],

    ratings: {
      Physiotherapist: 0,
      Chiropractor: 0,
      Osteopath: 0,
      Myotherapist: 0,
      RMT: 0,
      A_TD: 0,
    },

    treatmentIssues: [],

    diagnosed: "",
    treatmentLocation: "",
    specifyTreatment: "",
    comments: "",

    bsb: 0,
    accountHolder: "",
    accountNumber: 0,
  };

  const handleSubmit = (values: FormValues) => {
    console.log("Form Submitted with values:", values);
    formik.resetForm();
    localStorage.removeItem("formik");
    setStep(1);
  };

  const handleSchema = () => {
    if (step === 1) return personalDetailsSchema;
    if (step === 2) return ratingsSchema;
    if (step === 3) return issuesSchema;
    if (step === 4) return treatmentDetailsSchema;
    return paymentSchema;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: handleSchema(),
    onSubmit: handleSubmit,
  });

  const handleNext = async () => {
    formik.setTouched(
      Object.keys(formik.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      setStep((prev) => prev + 1);
    } else {
      formik.setErrors(errors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white border rounded-lg shadow-md p-6 max-w-2xl w-full">

        <div className="bg-white p-6 rounded-t-lg max-w-2xl w-full mt-10">
          <div className="flex items-start justify-between gap-6">

            <h1 className="text-3xl font-bold text-center mb-6">
              Complete Profile
            </h1>
            <ProgressBar step={step} />
            <hr className="h-px my-4 bg-gray-300 border-0" />
          </div>
        </div>

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              {step === 1 && <PersonalDetails errors={formik.errors} />}
              {step === 2 && <ProfileForm errors={formik.errors} />}
              {step === 3 && <Issues errors={formik.errors} />}
              {step === 4 && <CompleteProfile errors={formik.errors} />}
              {step === 5 && <Payment errors={formik.errors} />}
            </div>

            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
                >
                  Prev
                </button>
              )}

              {step < 5 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400"
                >
                  Next
                </button>
              )}

              {step === 5 && (
                <button
                  type="submit"
                  className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-400"
                >
                  Submit
                </button>
              )}
            </div>
            <Persist name="formik" />
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default StepForm;
