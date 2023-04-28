export interface IUser {
  username: string;
  email: string;
  password: string;

  save: () => Promise<IUser>;
}
