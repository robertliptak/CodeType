export interface IRegistration {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
  [key: string]: string;
}
export interface IRegistrationFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmedPassword?: string;
}

export interface IRegistrationStates {
  [key: string]: {
    isLoading?: boolean;
    isValid?: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    inputClassName: "is_error" | "is_valid" | undefined;
  };
}
export interface ILogin {
  email: string;
  password: string;
}
