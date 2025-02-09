export interface IUser {
  id: number;
  email: string;
  password: string;
  role: Role;
  name: string;
}

export enum Role {
  Admin = "admin",
  User = "user",
}
