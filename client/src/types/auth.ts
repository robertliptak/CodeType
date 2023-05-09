export interface IRegistration {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IRegistrationFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmedPassword?: string;
}
