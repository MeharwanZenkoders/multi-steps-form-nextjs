import React from 'react'

import {
    Field,
    FormikErrors,
    FormikValues,
    useFormikContext,
} from "formik";

interface PaymentProps {
    errors: FormikErrors<FormikValues>;
}

const Payment: React.FC<PaymentProps> = ({ errors }) => {
    return (
        // <div className="min-h-screen flex items-center justify-center ">
        //     <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">

                <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-1 md:space-y-0">
                    <legend className=" block text-lg font-bold leading-6 text-gray-900">
                        Payment Details
                        <span className="text-red-500"> *</span>
                    </legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*   BSB Number */}
                        <div className="flex flex-col">
                            <label className=" text-sm  text-slate-700" htmlFor="dob">
                                BSB Number
                                <span className="text-red-500"> *</span>
                            </label>
                            <Field
                                id="bsb"
                                type="text"
                                name="bsb"
                                placeholder="Enter BSB Number"
                                //value={bsb}
                                className="p-2 border border-gray-300 rounded"
                            />
                            {errors.bsb && typeof errors.bsb === "string" ? (
                                <p className="text-xs text-red-500">{errors.bsb}</p>
                            ) : null}
                        </div>
                        {/* Account Holder Name */}
                        <div className="flex flex-col">
                            <label className="text-sm relative text-slate-700" htmlFor="location">
                                Location<span className="text-red-500"> *</span>
                            </label>
                            <Field
                                id="accountHolder"
                                type="text"
                                name="accountHolder"
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Enter Account Holder Name"
                            />
                            {errors.accountHolder && typeof errors.accountHolder === "string" ? (
                                <p className="text-xs text-red-500">{errors.accountHolder}</p>
                            ) : null}
                        </div>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="flex flex-col">
                            <label className=" text-sm  text-slate-700" htmlFor="dob">
                                Account Number
                                <span className="text-red-500"> *</span>
                            </label>
                            <Field
                                id="bsb"
                                type="text"
                                name="bsb"
                                placeholder="Enter BSB Number"
                                //value={bsb}
                                className="p-2 border border-gray-300 rounded"
                            />
                            {errors.bsb && typeof errors.bsb === "string" ? (
                                <p className="text-xs text-red-500">{errors.bsb}</p>
                            ) : null}
                        </div>

                    </div>
                </div>

        //     </div>
        // </div>
    )
}

export default Payment