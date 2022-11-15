export type SignupOptions = {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  inviteToken?: string;
};

export async function apiSignup(options: SignupOptions): Promise<any> {
  console.log(options);
  return true;
}
