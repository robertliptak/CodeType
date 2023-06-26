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
export interface IRegistrationBackendErrors {
  errorMessage: string | undefined;
  isError: boolean;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  errorMessage?: string;
  email?: boolean;
  isError?: boolean;
  accessToken?: string;
  user?: any;
}

export interface ILoginBackendErrors {
  [key: string]: {
    errorMessage?: string;
    isError?: boolean;
    inputClassName?: "is_error";
  };
}
