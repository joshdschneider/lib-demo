export type LoginPasswordlessOptions = {
  email: string;
  create_if_doesnt_exist: boolean;
};

export async function apiLoginPasswordless(options: LoginPasswordlessOptions): Promise<any> {
  console.log(options);
  return true;
}
