import { useEffect, useState } from "react";
import { Button, Container, Input, Popover, Table } from "../elements";

export type OrganizationManagementProps = {
  orgId: string;
};

export const OrganizationManagement = ({ orgId }: OrganizationManagementProps) => {
  const { users, pendingInvites } = useOrgInfo({ orgId });
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const { results } = useOrgSearch({ users, pendingInvites, query, filters });
  const [filterPopover, setFilterPopover] = useState<HTMLButtonElement | null>(null);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const columns = ["Email", "Role", "Status", null];

  return (
    <div data-contain="component" data-width="full">
      <Container>
        <div data-contain="search_action">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={"Search"} />
          <Button ref={setFilterPopover} onClick={() => null}>
            Filter
          </Button>
          <Button onClick={() => null}>Invite User</Button>
        </div>
        <div data-contain="table">
          <Table columns={columns} rows={results} />
        </div>
      </Container>
    </div>
  );
};

export type PendingInvite = {
  email: string;
  role: string;
  status?: string;
};

export type UserInOrg = {
  user_id: string;
  email: string;
  role: string;
  status?: string;
  possible_roles: string[];
  can_be_deleted: boolean;
};

export type UseOrgInfoProps = {
  orgId: string;
};

export const useOrgInfo = ({ orgId }: UseOrgInfoProps) => {
  const [users, setUsers] = useState<UserInOrg[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);

  useEffect(() => {
    setUsers([
      {
        user_id: "123",
        email: "glen@bar.com",
        role: "Owner",
        possible_roles: ["Owner", "Admin", "Member"],
        can_be_deleted: false,
      },
      {
        user_id: "353",
        email: "mike@bar.com",
        role: "Admin",
        possible_roles: ["Admin", "Member"],
        can_be_deleted: true,
      },
      {
        user_id: "565",
        email: "kevin@bar.com",
        role: "Member",
        possible_roles: ["Member"],
        can_be_deleted: true,
      },
      {
        user_id: "775",
        email: "sara@bar.com",
        role: "Member",
        possible_roles: ["Member"],
        can_be_deleted: true,
      },
    ]);
    setPendingInvites([
      {
        email: "amy@bar.com",
        role: "Admin",
      },
      {
        email: "jane@bar.com",
        role: "Admin",
      },
      {
        email: "marg@bar.com",
        role: "Member",
      },
    ]);
  }, [orgId]);

  return { users, pendingInvites };
};

export type UseOrgSearchProps = {
  users: UserInOrg[];
  pendingInvites: PendingInvite[];
  query: string;
  filters: string[];
};

export type Result = {
  email: string;
  role: string;
  status?: string;
};

export const useOrgSearch = ({ users, pendingInvites, query, filters }: UseOrgSearchProps) => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const buildActiveUsers = (user: UserInOrg) => {
      user.status = "Active";
      return user;
    };

    const buildPendingUsers = (user: PendingInvite) => {
      return {
        user_id: "",
        email: user.email,
        role: user.role,
        status: "Pending",
        possible_roles: [],
        can_be_deleted: true,
      };
    };

    const buildResult = (user: UserInOrg) => {
      return {
        email: user.email,
        role: user.role,
        status: user.status,
      };
    };

    const searchByNameOrId = (user: UserInOrg) => {
      const e = user.email.toLowerCase();
      const id = user.user_id.toLowerCase();
      return e.includes(query) || id.includes(query);
    };

    const filterByRoleOrStatus = (user: UserInOrg) => {
      const status = `status:${user.status?.toLowerCase()}`;
      const role = `role:${user.role.toLowerCase()}`;
      return filters.includes(role) || filters.includes(status);
    };

    const activeUsers: UserInOrg[] = users.map(buildActiveUsers);
    const pendingUsers: UserInOrg[] = pendingInvites.map(buildPendingUsers);
    const usersInOrg = pendingUsers.concat(activeUsers);
    const emptySearch = !query;
    const emptyFilters = !filters.length;

    if (emptySearch) {
      if (emptyFilters) {
        setResults(usersInOrg.map(buildResult));
      } else {
        const filteredUsers = usersInOrg.filter(filterByRoleOrStatus);
        setResults(filteredUsers.map(buildResult));
      }
    } else {
      if (emptyFilters) {
        const searchedUsers = usersInOrg.filter(searchByNameOrId);
        setResults(searchedUsers.map(buildResult));
      } else {
        const searchedUsers = usersInOrg.filter(searchByNameOrId);
        const filteredUsers = searchedUsers.filter(filterByRoleOrStatus);
        setResults(filteredUsers.map(buildResult));
      }
    }
  }, [users, pendingInvites, query, filters]);

  return { results };
};
