import { ProfilePicture, Mfa, UpdateProfile } from "../@propelauth/react";

export const AccountPage = () => {
  return (
    <div>
      <ProfilePicture />
      <UpdateProfile />
      <Mfa />
    </div>
  );
};
