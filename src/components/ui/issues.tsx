import React from 'react'

import {
    Field,
    FormikErrors,
    FormikValues,
    useFormikContext,
} from "formik";

interface IssuesProps {
    errors: FormikErrors<FormikValues>;
}
const issue: string[] = [
    "Head and Neck Issues",
    "Torso Issues",
    "Pelvis Issues",
    "Arms Issues",
    "Legs Issues",
]

const Issues: React.FC<IssuesProps> = ({ errors }) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    return (
        // <div className="min-h-screen flex items-center justify-center ">
        //     <div className="shadow-md rounded-lg p-6 max-w-lg w-full">

                <div className=" gap-6  md:grid md:grid-cols-1 md:space-y-0">
                    <legend className=" block text-lg font-bold leading-6 text-gray-900">
                        Select Issues
                        <span className="text-red-500"> *</span>
                    </legend>

                    <ul className="flex flex-col ">
                        {issue.map((item, index) => (
                            <li
                                key={index}
                                className="inline-flex items-center gap-x-2.5 py-2  text-sm font-medium bg-white flex-shrink-0"
                            >
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <Field
                                            id={`checkbox-${index}`}
                                            name="treatmentIssues"
                                            value={item}
                                            type="checkbox"
                                            className="w-4 cursor-pointer h-4 appearance-none border border-gray-600 rounded-md checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
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


        //     </div>
        // </div>
    )
}

export default Issues;