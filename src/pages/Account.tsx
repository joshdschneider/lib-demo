import { useNavigate } from "react-router-dom";
import { ProfilePicture } from "../@propelauth/react";
import { Mfa } from "../@propelauth/react/components/Mfa";

export const AccountPage = () => {
  return (
    <div>
      <ProfilePicture />
      <Mfa />
    </div>
  );
};
