export type ForgotPasswordFields = {
  email?: string;
};

export async function apiForgotPassword({ email }: ForgotPasswordFields): Promise<any> {
  console.log(email);
  return { success: true };
}
