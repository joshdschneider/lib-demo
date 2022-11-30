import { Client } from "@propel-auth-fern/fe_v2-client/api";

const propelInternalClient = new Client({
  _origin: "https://auth.buildwithfern.com",
  _token: "INSERT_YOUR_TOKEN_HERE",
});

export const apiLogin = propelInternalClient.login.login;
export const apiSignup = propelInternalClient.signup.signup;
export const apiForgotPassword = propelInternalClient.forgotPassword.forgotPassword;
export const apiLoginPasswordless = propelInternalClient.login.sendMagicLinkLogin;
export const apiCreateOrg = propelInternalClient.org.createOrg;
export const apiVerifyMfa = propelInternalClient.mfaLogin.mfaVerify;
