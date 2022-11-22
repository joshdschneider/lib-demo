import { LoginState } from "../components";

export type VerifyMfaOptions = {
  code: string;
  isBackupCode: boolean;
};

export type VerifyMfaResponse = {
  next_step: LoginState;
};

export async function apiVerifyMfa(options: VerifyMfaOptions): Promise<VerifyMfaResponse> {
  console.log(options);
  return { next_step: "FINISHED" };
}
