import { LoginState } from "../components";

export interface CreateOrgOptions {
  name: string;
  autojoinByDomain?: boolean;
  restrictToDomain?: boolean;
}

export type CreateOrgResponse = {
  next_step: LoginState;
};

export async function apiCreateOrg(options: CreateOrgOptions): Promise<CreateOrgResponse> {
  console.log(options);
  return { next_step: "FINISHED" };
}
