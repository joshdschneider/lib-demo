import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export type Config = {
  logo_url: string;
  site_display_name: string;
  has_google_login: boolean;
  has_github_login: boolean;
  has_microsoft_login: boolean;
  has_slack_login: boolean;
  has_linkedin_login: boolean;
  has_passwordless_login: boolean;
  has_any_social_login: boolean;
  has_sso_login: boolean;
  has_password_login: boolean;
  only_extra_login_is_passwordless: boolean;
  require_username: boolean;
  require_name: boolean;
  require_profile_picture: boolean;
  orgs_metaname: string;
};

const DEFAULT_CONFIG = {
  logo_url: "https://img.propelauth.com/0c22cebe-681f-4725-a8f5-b81963484eb9.png",
  site_display_name: "Acme, Inc.",
  has_google_login: true,
  has_github_login: true,
  has_microsoft_login: false,
  has_slack_login: false,
  has_linkedin_login: false,
  has_passwordless_login: true,
  has_any_social_login: true,
  has_sso_login: false,
  has_password_login: true,
  only_extra_login_is_passwordless: false,
  require_username: true,
  require_name: false,
  require_profile_picture: false,
  orgs_metaname: "Team",
};

export const useConfig = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within an AuthProvider");
  }

  const authUrl = context.authUrl;
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  useEffect(() => {
    async function getConfigFromUrl() {
      // Fetch from API
      setConfig(DEFAULT_CONFIG);
    }

    if (authUrl) {
      getConfigFromUrl();
    }
  }, [authUrl]);

  return { config };
};
