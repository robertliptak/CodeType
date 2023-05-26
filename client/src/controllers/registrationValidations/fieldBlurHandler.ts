import { FormikProps } from "formik";
import { IRegistration, IRegistrationStates } from "../../types/auth";
import { checkUsername, checkEmail } from "../../api/auth";

const fieldBlurHandler = async (
  fieldName: string,
  formik: FormikProps<IRegistration>,
  setValidationState: React.Dispatch<React.SetStateAction<IRegistrationStates>>,
) => {
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  try {
    let isFieldValid = true;
    let errorMessage: string | undefined;

    if (fieldName === "username" || fieldName === "email") {
      setValidationState((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          isLoading: true,
        },
      }));

      if (fieldName === "username") {
        isFieldValid = await checkUsername(formik.values.username);
      } else if (fieldName === "email") {
        isFieldValid = await checkEmail(formik.values.email);
      }

      setValidationState((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          isLoading: false,
          isValid: isFieldValid,
        },
      }));
    }

    if (!isFieldValid) {
      errorMessage = `${capitalizeFirstLetter(fieldName)} already exists`;
    } else {
      const fieldError = formik.errors[fieldName as keyof IRegistration];
      if (fieldError) {
        errorMessage = fieldError;
      }
    }

    setValidationState((prevState) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        isError: !isFieldValid || !!errorMessage,
        errorMessage,
        inputClassName:
          !isFieldValid || !!errorMessage ? "is_error" : "is_valid",
      },
    }));
  } catch (error) {
    console.log(error);
  }
};

export default fieldBlurHandler;
