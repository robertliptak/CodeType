import { FormikProps } from "formik";
import { IRegistration, IRegistrationStates } from "../../types/auth";

const passwordChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  formik: FormikProps<IRegistration>,
  setValidationState: React.Dispatch<React.SetStateAction<IRegistrationStates>>,
) => {
  const currentPassword = event.target.value;
  const { confirmedPassword } = formik.values;

  const isLoading = confirmedPassword !== "";
  const isError =
    currentPassword !== confirmedPassword && confirmedPassword !== "";
  const errorMessage = isError ? "Passwords do not match" : undefined;
  let inputClassName: "is_error" | "is_valid" | undefined;

  if (confirmedPassword !== "") {
    inputClassName =
      currentPassword !== confirmedPassword ? "is_error" : "is_valid";
  } else {
    inputClassName = undefined;
  }

  setValidationState((prevState) => ({
    ...prevState,
    confirmedPassword: {
      ...prevState.confirmedPassword,
      isLoading,
      isError,
      errorMessage,
      inputClassName,
    },
  }));

  setTimeout(() => {
    setValidationState((prevState) => ({
      ...prevState,
      confirmedPassword: {
        ...prevState.confirmedPassword,
        isLoading: false,
      },
    }));
  }, 200);
};

export default passwordChangeHandler;
