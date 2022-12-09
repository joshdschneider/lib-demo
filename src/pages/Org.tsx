import { ManageOrg } from "../@propelauth/react";
import { CoolTable } from "../custom-components/CoolTable";

export const OrgPage = () => {
  return (
    <div>
      <ManageOrg orgId={"1234567890"} />
    </div>
  );
};
