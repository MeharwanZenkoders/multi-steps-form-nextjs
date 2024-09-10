import React from 'react'
import { PhotoIcon, UserCircleIcon, } from '@heroicons/react/24/solid'
import { CldUploadWidget } from 'next-cloudinary';
import {
  Field,
  FormikErrors,
  FormikValues,
  useFormikContext,
} from "formik";

import Image from 'next/image';
interface PersonalDetailsProps {
  errors: FormikErrors<FormikValues>;
}

const medicalConditions: string[] = [
  "Hypertension",
  "Hypotension",
  "Diabetes Type 1 or 2",
  "Hyperthyroidism",
  "Hypothyroidism",
  "Autoimmune condition (rheumatoid arthritis, lupus etc)",
  "Kidney diseases",
  "Liver diseases",
  "Respiratory diseases (asthma, COPD etc)",
  "Heart diseases",
  "History of strokes or transient ischemic attacks (TIA)",
  "Parkinson's disease",
  "Multiple sclerosis",
  "Genetic disorders",
];

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ errors }) => {

  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setFieldValue("file", e.currentTarget.files[0]);
    }
  };

  return (
    <>
{/* 
      <div className="w-full max-w-max p-6 bg-white rounded-lg shadow-md"> */}
        <div className="space-y-12">
          {/* Uplaod Image */}
          <div className="col-span-full">
            <h2 className="block text-lg font-bold ">
              Personal Details
            </h2>

            <label className="w-full text-sm relative text-slate-700" htmlFor="image">
              Upload Profile Image
              <span className="text-red-500"> *</span>
            </label>

            {values.image ? (
              <Image src={values.image} alt="Image" height={200} width={200} />
            )
              : (<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <CldUploadWidget uploadPreset="onjqbazd" onSuccess={(result, { close }) => {

                        if (typeof result.info !== 'string' && result.info) {

                          setFieldValue("image", result.info.secure_url)
                          close();
                        }

                      }}>
                        {({ open }) => {
                          return (
                            <button onClick={() => open()}>
                              Upload an Image
                            </button>
                          );
                        }}
                      </CldUploadWidget>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>)
            }

          </div>

          {/* DOB and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col">
              <label className=" text-sm  text-slate-700" htmlFor="dob">
                Date of Birth
                <span className="text-red-500"> *</span>
              </label>
              <Field
                id="dob"
                type="date"
                name="dob"
                placeholder="Enter DOB"
                className="p-2 border border-gray-300 rounded"
              />
              {errors.dob && typeof errors.dob === "string" ? (
                <p className="text-xs text-red-500">{errors.dob}</p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-sm relative text-slate-700" htmlFor="location">
                Location<span className="text-red-500"> *</span>
              </label>
              <Field
                id="location"
                type="text"
                name="location"
                className="p-2 border border-gray-300 rounded"
                placeholder="Enter location"
                //onChange={false}
              />
              {errors.location && typeof errors.location === "string" ? (
                <p className="text-xs text-red-500">{errors.location}</p>
              ) : null}
            </div>

          </div>

          {/* Selct Gender  */}
          <div className="border-b  pb-12">
            {/* <div className="mt-10 space-y-10"> */}
            <fieldset>
              <legend className="text-lg font-bold leading-6 text-gray-900">Do you have a preference in gender for your therapist?
                <span className="text-red-500"> *</span>
              </legend>
              {errors.gender && typeof errors.gender === "string" ? (
                <p className="text-xs text-red-500">{errors.gender}</p>
              ) : null}

              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <Field
                      id="male"
                      name="gender"
                      value="male"
                      type="radio"
                      required
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="male" className="font-medium text-gray-900">
                      Male
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <Field
                      id="female"
                      name="gender"
                      value="female"
                      type="radio"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="female" className="font-medium text-gray-900">
                      Female
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <Field
                      id="other"
                      name="gender"
                      value="other"
                      type="radio"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="other" className="font-medium text-gray-900">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            {/* </div> */}
          </div>

          {/* Select Issues  */}
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-1 md:space-y-0">
            <legend className=" block text-lg font-bold leading-6 text-gray-900">
              System Issues
              <span className="text-red-500"> *</span>
            </legend>
            {errors.issues && typeof errors.issues === "string" ? (
              <p className="text-xs text-red-500">{errors.issues}</p>
            ) : null}

            <ul className="flex flex-wrap gap-4">
              {medicalConditions.map((item, index) => (
                <li
                  key={index}
                  className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-600 rounded-lg flex-shrink-0"
                >
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <Field
                        id={`checkbox-${index}`}
                        name="issues"
                        value={item}

                        //onChange={formik.handleChange}
                        type="checkbox"
                        className="w-5 cursor-pointer h-5 appearance-none border border-gray-300 rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                      />
                    </div>
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer"
                    >
                      {item}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>



      {/* </div> */}
    </>
  )
};


export default PersonalDetails;
