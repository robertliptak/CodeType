import { IRegistrationStates } from "../../types/auth";

const fieldFocusHandler = (
  fieldName: string,
  validationState: IRegistrationStates,
  setValidationState: React.Dispatch<React.SetStateAction<IRegistrationStates>>,
) => {
  const wasError = validationState[fieldName].isError;

  if (wasError) {
    setValidationState((prevState) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        errorMessage: undefined,
        inputClassName: undefined,
      },
    }));
  }
};

export default fieldFocusHandler;
