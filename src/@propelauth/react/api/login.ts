export type LoginOptions = {
  email: string;
  password: string;
};

export async function apiLogin(options: LoginOptions): Promise<any> {
  console.log(options);
  return true;
}
