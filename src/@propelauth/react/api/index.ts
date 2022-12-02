import { PropelAuthFeV2Client } from "@propel-auth-fern/fe_v2-client";

const propelInternalClient = new PropelAuthFeV2Client({
  environment: "https://blah.propelauthtest.com",
});

export const apiLogin = propelInternalClient.login.login;
export const apiSignup = propelInternalClient.user.signup;
export const apiForgotPassword = propelInternalClient.login.forgotPassword;
export const apiLoginPasswordless = propelInternalClient.login.sendMagicLinkLogin;
export const apiCreateOrg = propelInternalClient.org.createOrg;
export const apiVerifyMfa = propelInternalClient.mfa.mfaVerify;
