import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { ElementAppearance } from "../state";
import {
  Button,
  Checkbox,
  Container,
  ContainerProps,
  Input,
  Modal,
  Paragraph,
  Popover,
  Table,
  TableProps,
} from "../elements";

export type OrganizationManagementProps = {
  organizationId: string;
  appearance?: OrganizationAppearance;
};

export type OrganizationAppearance = {
  options?: {
    //..
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    Table?: ElementAppearance<TableProps>;
    //..
  };
};

export const OrganizationManagement = ({ organizationId, appearance }: OrganizationManagementProps) => {
  const { users, invitations, roles } = useOrgInfo({ orgId: organizationId });
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const { results } = useOrgSearch({ users, invitations, query, filters });
  const { items, controls } = usePagination<UserOrInvitation>({ items: results, itemsPerPage: 10 });
  const { rows, editRowModal } = useRowEditor({ rows: items, orgId: organizationId });
  const columns = [null, "Email", "Role", "Status", null];

  return (
    <div data-contain="component" data-width="full">
      <Container appearance={appearance?.elements?.Container}>
        <div data-contain="search_action">
          <OrgControls query={query} setQuery={setQuery} filters={filters} setFilters={setFilters} roles={roles} />
        </div>
        <div data-contain="table">
          <Table columns={columns} rows={rows} appearance={appearance?.elements?.Table} />
          {editRowModal}
        </div>
        <div data-contain="pagination">
          <Pagination controls={controls} />
        </div>
      </Container>
    </div>
  );
};

export type User = {
  user_id: string;
  email: string;
  role: string;
  possible_roles: string[];
  can_be_deleted: boolean;
};

export type Invitation = {
  email: string;
  role: string;
  status: "pending" | "expired";
};

export type UserOrInvitation = {
  user_id?: string;
  email: string;
  role: string;
  status: "active" | "pending" | "expired";
  possible_roles?: string[];
  can_be_deleted?: boolean;
};

export type UseOrgInfoProps = {
  orgId: string;
};

export const useOrgInfo = ({ orgId }: UseOrgInfoProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

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
    setInvitations([
      {
        email: "amy@bar.com",
        role: "Admin",
        status: "pending",
      },
      {
        email: "jane@bar.com",
        role: "Admin",
        status: "pending",
      },
      {
        email: "marg@bar.com",
        role: "Member",
        status: "expired",
      },
    ]);
    setRoles(["Owner", "Admin", "Member"]);
  }, [orgId]);

  return { users, invitations, roles };
};

export type UseRowEditorProps = {
  rows: UserOrInvitation[];
  orgId: string;
};

export const useRowEditor = ({ rows, orgId }: UseRowEditorProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<UserOrInvitation | null>(null);

  function editRow(row: UserOrInvitation) {
    setRowToEdit(row);
    setShowEditModal(true);
  }

  function closeEditRow() {
    setShowEditModal(false);
    setRowToEdit(null);
  }

  const editableRows = rows.map((row) => {
    return {
      user_id: row.user_id,
      email: row.email,
      role: row.role,
      status: row.status.charAt(0).toUpperCase() + row.status.slice(1),
      edit: <Button onClick={() => editRow(row)}>Edit</Button>,
    };
  });

  function getModalContents() {
    if (rowToEdit) {
      if (rowToEdit.status === "active" && rowToEdit.user_id) {
        return <EditActiveUser orgId={orgId} userId={rowToEdit.user_id} />;
      } else if (rowToEdit.status === "pending") {
        return <EditPendingInvitation orgId={orgId} email={rowToEdit.email} />;
      } else if (rowToEdit.status === "expired") {
        return <EditExpiredInvitation orgId={orgId} email={rowToEdit.email} />;
      }
    }
  }

  return {
    rows: editableRows,
    editRowModal: (
      <Modal show={showEditModal} setShow={setShowEditModal} onClose={closeEditRow}>
        {getModalContents()}
      </Modal>
    ),
  };
};

export type OrgControlsProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  roles: string[];
};

export const OrgControls = ({ query, setQuery, filters, setFilters, roles }: OrgControlsProps) => {
  const [filterPopover, setFilterPopover] = useState<HTMLButtonElement | null>(null);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFilters((state) => {
      if (e.target.checked) {
        return [...state, e.target.id];
      } else {
        return [...state.filter((i) => i !== e.target.id)];
      }
    });
  }

  return (
    <>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={"Search"} />
      <Button ref={setFilterPopover} onClick={() => setShowFilterPopover(!showFilterPopover)}>
        Filter
      </Button>
      <Button onClick={() => setShowInviteModal(true)}>Invite User</Button>
      <Popover referenceElement={filterPopover} show={showFilterPopover} setShow={setShowFilterPopover}>
        <div data-contain="filter_group">
          {roles.map((role) => {
            const alias = `role:${role.toLowerCase()}`;
            return (
              <Checkbox key={role} label={role} id={alias} onChange={handleChange} checked={filters.includes(alias)} />
            );
          })}
        </div>
        <div data-contain="filter_group">
          <Checkbox
            label={"Pending"}
            id={"status:pending"}
            onChange={handleChange}
            checked={filters.includes("status:pending")}
          />
          <Checkbox
            label={"Active"}
            id={"status:active"}
            onChange={handleChange}
            checked={filters.includes("status:active")}
          />
        </div>
      </Popover>
      <Modal show={showInviteModal} setShow={setShowInviteModal} onClose={() => setShowInviteModal(false)}>
        <h1>Bar</h1>
      </Modal>
    </>
  );
};

export type UseOrgSearchProps = {
  users: User[];
  invitations: Invitation[];
  query: string;
  filters: string[];
};

export const useOrgSearch = ({ users, invitations, query, filters }: UseOrgSearchProps) => {
  const [results, setResults] = useState<UserOrInvitation[]>([]);

  useEffect(() => {
    const _users: UserOrInvitation[] = users.map((user) => {
      return {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        status: "active",
        possible_roles: user.possible_roles,
        can_be_deleted: user.can_be_deleted,
      };
    });

    const _invitations: UserOrInvitation[] = invitations.map((invitation) => {
      return {
        email: invitation.email,
        role: invitation.role,
        status: invitation.status,
      };
    });

    const searchByNameOrId = (userOrInvitation: UserOrInvitation) => {
      const e = userOrInvitation.email.toLowerCase();
      const id = userOrInvitation.user_id?.toLowerCase();
      return e.includes(query) || (id && id.includes(query));
    };

    const filterByRoleOrStatus = (userOrInvitation: UserOrInvitation) => {
      const status = `status:${userOrInvitation.status.toLowerCase()}`;
      const role = `role:${userOrInvitation.role.toLowerCase()}`;
      return filters.includes(role) || filters.includes(status);
    };

    const usersOrInvitations = _invitations.concat(_users);
    const emptySearch = !query;
    const emptyFilters = !filters.length;

    if (emptySearch) {
      if (emptyFilters) {
        setResults(usersOrInvitations);
      } else {
        setResults(usersOrInvitations.filter(filterByRoleOrStatus));
      }
    } else {
      if (emptyFilters) {
        setResults(usersOrInvitations.filter(searchByNameOrId));
      } else {
        const searchedUsers = usersOrInvitations.filter(searchByNameOrId);
        setResults(searchedUsers.filter(filterByRoleOrStatus));
      }
    }
  }, [users, invitations, query, filters]);

  return { results };
};

export type PaginationProps<T> = {
  items: T[];
} & PaginationControls;

export type PaginationControls = {
  controls: {
    currentPage: number;
    totalPages: number;
    hasBack: boolean;
    hasNext: boolean;
    onBack: VoidFunction;
    onNext: VoidFunction;
  };
};

export const Pagination = ({ controls }: PaginationControls) => {
  return (
    <>
      <Paragraph>{`Page ${controls.currentPage} of ${controls.totalPages}`}</Paragraph>
      <div data-contain="pagination_buttons">
        {controls.hasBack && <Button onClick={controls.onBack}>Back</Button>}
        {controls.hasNext && <Button onClick={controls.onNext}>Next</Button>}
      </div>
    </>
  );
};

export type UsePaginationProps<T> = {
  items: T[];
  itemsPerPage: number;
};

export function usePagination<T>({ items, itemsPerPage }: UsePaginationProps<T>) {
  const [page, setPage] = useState<number>(1);
  const [pageItems, setPageItems] = useState<T[]>(items ?? []);
  const [numItems, setNumItems] = useState<number>(items ? items.length : 0);
  const maxPages = Math.ceil(numItems / itemsPerPage);

  useEffect(() => {
    if (items && items.length) {
      setNumItems(items.length);
      setPage(1);
    }
  }, [items]);

  useEffect(() => {
    const arr = items ?? [];
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setPageItems(arr.slice(start, end));
  }, [items, page, itemsPerPage]);

  return {
    items: pageItems,
    controls: {
      currentPage: page,
      totalPages: maxPages,
      hasBack: page > 1,
      hasNext: page < maxPages,
      onBack: () => setPage(page - 1),
      onNext: () => setPage(page + 1),
    },
  };
}

export type EditActiveUserProps = {
  orgId: string;
  userId: string;
};

export const EditActiveUser = ({ orgId, userId }: EditActiveUserProps) => {
  return <div>EditActiveUser</div>;
};

export type EditPendingInvitationProps = {
  orgId: string;
  email: string;
};

export const EditPendingInvitation = ({ orgId, email }: EditPendingInvitationProps) => {
  return <div>EditPendingInvitation</div>;
};

export type EditExpiredInvitationProps = {
  orgId: string;
  email: string;
};

export const EditExpiredInvitation = ({ orgId, email }: EditExpiredInvitationProps) => {
  return <div>EditExpiredInvitation</div>;
};
