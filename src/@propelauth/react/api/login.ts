import { LoginState } from "../components";

export type LoginOptions = {
  email: string;
  password: string;
};

export type LoginResponse = {
  next_step: LoginState;
};

export async function apiLogin(options: LoginOptions): Promise<LoginResponse> {
  console.log(options);
  return { next_step: "FINISHED" };
}
