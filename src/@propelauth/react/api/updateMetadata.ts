import { LoginState } from "../components";

export interface UpdateMetadataOptions {
  username?: string;
  firstName?: string;
  lastName?: string;
}

export type UpdateMetadataResponse = {
  next_step: LoginState;
};

export async function apiUpdateMetadata(options: UpdateMetadataOptions): Promise<UpdateMetadataResponse> {
  console.log(options);
  return { next_step: "FINISHED" };
}
