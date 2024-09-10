// pages/complete-profile.tsx
import React, { useState } from 'react';

import {
  Field,
  FormikErrors,
  FormikValues,
  useFormikContext,
} from "formik";

interface TreatmentProps {
  errors: FormikErrors<FormikValues>;
}

const CompleteProfile: React.FC<TreatmentProps> = ({ errors }) => {

  const { values, setFieldValue } = useFormikContext<FormikValues>();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    //console.log({ diagnosed, location, treatment, comments });
  };

  return (
    // <div className="min-h-screen flex items-center justify-center ">
    //   <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <form onSubmit={handleSubmit}>
          {/* Cancer Diagnosis */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Have You Ever Been Diagnosed With Cancer? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="diagnosed"
                  value="Yes"
                  className="mr-2"

                  required
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="diagnosed"
                  value="No"
                  className="mr-2"
                  required
                />
                No
              </label>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <Field
              id="treatmentLocation"
              type="text"
              name="treatmentLocation"
              placeholder="Enter Treatment Location"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            {errors.treatmentLocation && typeof errors.treatmentLocation === "string" ? (
                <p className="text-xs text-red-500">{errors.treatmentLocation}</p>
              ) : null}
          </div>

          {/* Treatment */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Specify Treatment</label>
            {errors.specifyTreatment && typeof errors.specifyTreatment === "string" ? (
              <p className="text-xs text-red-500">{errors.specifyTreatment}</p>
            ) : null}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="specifyTreatment"
                  value="Chemotherapy & Radiation"
                  className="mr-2"
                />
                Chemotherapy & Radiation
              </label>
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="specifyTreatment"
                  value="Radiation"
                  className="mr-2"
                //onChange={() => setTreatment('Radiation')}
                />
                Radiation
              </label>
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="specifyTreatment"
                  value="Chemotherapy"
                  className="mr-2"
                //onChange={() => setTreatment('Chemotherapy')}
                />
                Chemotherapy
              </label>
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="specifyTreatment"
                  value="Removal of Cancer with Course of Chemo & Radiation, Natural"
                  className="mr-2"
                />
                Removal of Cancer with Course of Chemo & Radiation, Natural
              </label>

            </div>
          </div>

          {/* Additional Comments */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Anything else you wish to let us know
            </label>
            <Field
              placeholder="Write Something"
              className="w-full p-3 border border-gray-300 rounded-lg"
              name="comments"
            />
            {errors.comments && typeof errors.comments === "string" ? (
              <p className="text-xs text-red-500">{errors.comments}</p>
            ) : null}
          </div>
        </form>
    //   </div>
    // </div>
  );
};

export default CompleteProfile;
