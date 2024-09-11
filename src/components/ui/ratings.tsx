import React from "react";
import ReactStars from "react-stars";
import { Field, FormikErrors, FormikValues, useFormikContext } from "formik";

interface RatingProps {
  errors: FormikErrors<FormikValues>;
}

const services = [
  { name: "Physiotherapist" },
  { name: "Chiropractor" },
  { name: "Osteopath" },
  { name: "Myotherapist" },
  { name: "RMT" },
  { name: "A_TD" },
];

const StarRating = ({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (value: number) => void;
}) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      onChange={onRatingChange}
      size={24}
      color1={"#ddd"}
      color2={"#ffd700"} // Yellow color for selected stars
    />
  );
};

const ProfileForm: React.FC<RatingProps> = ({ errors }) => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const handleRatingChange = (name: string, value: number) => {
    setFieldValue(name, value);
  };

  return (
    // <div className="min-h-screen flex items-center justify-center">
    <>
      <p className="text-gray-600 mb-6">
        Please select which of the following you have used in the past and rate
        how well they worked for you. (out of 5 stars){" "}
        <span className="text-red-500">*</span>
      </p>

      {services?.map((service) => (
        <div key={service.name} className="flex flex-col mb-4">
          <div className="flex items-center justify-between">
            <span>{service.name}</span>

            <Field name={`ratings.${service.name}`}>
              {() => (
                <StarRating
                  rating={values.ratings?.[service.name] || 0}
                  onRatingChange={(value) =>
                    handleRatingChange(`ratings.${service.name}`, value)
                  }
                />
              )}
            </Field>
          </div>

          {/* Display error message below the rating
            {typeof errors.ratings == 'object' && errors.ratings?.[service.name] && typeof errors.ratings?.[service.name] === "string" ? (
              <div className="text-xs text-red-500 mt-1">{errors.ratings?.[service.name]}</div>
            ) : null} */}

          {/* Explicitly cast errors.ratings to correct type */}
          {errors.ratings &&
          typeof errors.ratings === "object" &&
          (errors.ratings as FormikErrors<any>)[service.name] &&
          typeof (errors.ratings as FormikErrors<any>)[service.name] ===
            "string" ? (
            <div className="text-xs text-red-500 mt-1">
              {(errors.ratings as FormikErrors<any>)[service.name] as string}
            </div>
          ) : null}
        </div>
      ))}
    </>
    // </div>
  );
};

export default ProfileForm;
