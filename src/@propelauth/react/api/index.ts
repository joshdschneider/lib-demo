import { PropelAuthFeV2 } from "@propel-auth-fern/fe_v2-client";

const propelInternalClient = new PropelAuthFeV2.Client({
  _origin: "https://auth.buildwithfern.com",
  _token: "",
});

export const apiLogin = propelInternalClient.login.login;
export const apiSignup = propelInternalClient.signup.signup;
export const apiForgotPassword = propelInternalClient.forgotPassword.forgotPassword;
export const apiLoginPasswordless = propelInternalClient.login.sendMagicLinkLogin;

export type SignupOptions = {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  inviteToken?: string;
};
