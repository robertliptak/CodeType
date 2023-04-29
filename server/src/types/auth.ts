export interface IUser {
  username: string;
  email: string;
  password: string;
  created_at: Date;

  save: () => Promise<IUser>;
}
