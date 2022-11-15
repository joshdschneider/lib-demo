export type LoginData = {
  email: string;
  password: string;
};

export async function apiLogin(data: LoginData): Promise<any> {
  console.log(data);
  return true;
}
