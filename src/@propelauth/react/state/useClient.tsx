import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { legacyClient } from "./legacyClient";

export const useClient = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within an AuthProvider");
  }

  return {
    loginApi: context.client.login,
    mfaApi: context.client.mfa,
    orgApi: context.client.org,
    userApi: context.client.user,
    orgUserApi: context.client.userInOrg,
    legacyApi: legacyClient,
  };
};
