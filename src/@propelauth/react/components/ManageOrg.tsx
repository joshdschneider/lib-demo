import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { ElementAppearance } from "../state";
import { useClient } from "../state/useClient";
import { InviteUser, InviteUserAppearance } from "./InviteUser";
import {
  Alert,
  AlertProps,
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  Container,
  ContainerProps,
  H3,
  H3Props,
  Input,
  InputProps,
  Label,
  LabelProps,
  Modal,
  ModalProps,
  Paragraph,
  ParagraphProps,
  Popover,
  PopoverProps,
  Select,
  SelectProps,
  Table,
  TableProps,
} from "../elements";

export type ManageOrgProps = {
  orgId: string;
  appearance?: OrgAppearance;
  inviteUserAppearance?: InviteUserAppearance;
};

export type OrgAppearance = {
  options?: {
    rowsPerPage?: number;
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    SearchInput?: ElementAppearance<InputProps>;
    FilterButton?: ElementAppearance<ButtonProps>;
    FilterPopover?: ElementAppearance<PopoverProps>;
    FilterCheckbox?: ElementAppearance<CheckboxProps>;
    InviteButton?: ElementAppearance<ButtonProps>;
    InviteModal?: ElementAppearance<ModalProps>;
    Table?: ElementAppearance<TableProps>;
    EditUserButton?: ElementAppearance<ButtonProps>;
    EditUserModal?: ElementAppearance<ModalProps>;
    EditUserModalHeader?: ElementAppearance<H3Props>;
    EditUserAlert?: ElementAppearance<AlertProps>;
    ChangeRoleLabel?: ElementAppearance<LabelProps>;
    ChangeRoleSelect?: ElementAppearance<SelectProps>;
    SaveRoleButton?: ElementAppearance<ButtonProps>;
    RemoveUserButton?: ElementAppearance<ButtonProps>;
    RevokeInvitationButton?: ElementAppearance<ButtonProps>;
    ResendInvitationButton?: ElementAppearance<ButtonProps>;
    DeleteInvitationButton?: ElementAppearance<ButtonProps>;
    PageText?: ElementAppearance<ParagraphProps>;
    PageBackButton?: ElementAppearance<ButtonProps>;
    PageNextButton?: ElementAppearance<ButtonProps>;
  };
};

export const ManageOrg = ({ orgId, appearance }: ManageOrgProps) => {
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const { users, invitations, inviteePossibleRoles, roles, methods } = useSelectedOrg({ orgId });
  const { results } = useOrgSearch({ users, invitations, query, filters });
  const itemsPerPage = appearance?.options?.rowsPerPage || 10;
  const { items, controls } = usePagination<UserOrInvitation>({ items: results, itemsPerPage });
  const { rows, editRowModal } = useRowEditor({ rows: items, orgId, methods, appearance });
  const columns = [null, "Email", "Role", "Status", null];

  return (
    <div data-contain="component" data-width="full">
      <Container appearance={appearance?.elements?.Container}>
        <div data-contain="search_action">
          <OrgControls
            orgId={orgId}
            query={query}
            setQuery={setQuery}
            filters={filters}
            setFilters={setFilters}
            roles={roles}
            inviteePossibleRoles={inviteePossibleRoles}
            addInvitation={methods.addInvitation}
            appearance={appearance}
          />
        </div>
        <div data-contain="table">
          <Table columns={columns} rows={rows} appearance={appearance?.elements?.Table} />
          {editRowModal}
        </div>
        <div data-contain="pagination">
          <Pagination controls={controls} appearance={appearance} />
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

export const useSelectedOrg = ({ orgId }: UseOrgInfoProps) => {
  const { orgApi } = useClient();
  const [users, setUsers] = useState<User[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteePossibleRoles, setInviteePossibleRoles] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    setUsers([
      {
        user_id: "123",
        email: "andrew@propelauth.com",
        role: "Owner",
        possible_roles: ["Owner", "Admin", "Member"],
        can_be_deleted: false,
      },
      {
        user_id: "353",
        email: "kayla@propelauth.com",
        role: "Admin",
        possible_roles: ["Admin", "Member"],
        can_be_deleted: true,
      },
      {
        user_id: "464",
        email: "josh@propelauth.com",
        role: "Admin",
        possible_roles: ["Admin", "Member"],
        can_be_deleted: true,
      },
      {
        user_id: "685",
        email: "justin@propelauth.com",
        role: "Admin",
        possible_roles: ["Admin", "Member"],
        can_be_deleted: true,
      },
      {
        user_id: "565",
        email: "foo@propelauth.com",
        role: "Member",
        possible_roles: ["Member"],
        can_be_deleted: true,
      },
      {
        user_id: "003",
        email: "bar@propelauth.com",
        role: "Member",
        possible_roles: ["Member"],
        can_be_deleted: true,
      },
      {
        user_id: "775",
        email: "another@propelauth.com",
        role: "Member",
        possible_roles: ["Member"],
        can_be_deleted: true,
      },
    ]);
    setInvitations([
      {
        email: "jane@propelauth.com",
        role: "Admin",
        status: "pending",
      },
      {
        email: "john@propelauth.com",
        role: "Admin",
        status: "pending",
      },
      {
        email: "joe@propelauth.com",
        role: "Member",
        status: "pending",
      },
      {
        email: "jim@propelauth.com",
        role: "Member",
        status: "expired",
      },
      {
        email: "jeff@propelauth.com",
        role: "Member",
        status: "expired",
      },
    ]);
    setRoles(["Owner", "Admin", "Member"]);
    setInviteePossibleRoles(["Owner", "Admin", "Member"]);
  }, [orgId]);

  function setUserRole(userId: string, role: string) {
    setUsers((users) => {
      const updatedUsers = users.map((user) => {
        if (user.user_id === userId) {
          return { ...user, role };
        }
        return user;
      });
      return updatedUsers;
    });
  }

  function removeUser(userId: string) {
    setUsers((users) => users.filter((u) => u.user_id !== userId));
  }

  function addInvitation(invitation: Invitation) {
    setInvitations((invitations) => [...invitations, invitation]);
  }

  function removeInvitation(email: string) {
    setInvitations((invitations) => invitations.filter((i) => i.email !== email));
  }

  return {
    users,
    invitations,
    inviteePossibleRoles,
    roles,
    methods: {
      setUserRole,
      removeUser,
      addInvitation,
      removeInvitation,
    },
  };
};

export type UseRowEditorProps = {
  rows: UserOrInvitation[];
  orgId: string;
  methods: {
    setUserRole: (userId: string, role: string) => void;
    removeUser: (userId: string) => void;
    addInvitation: (invitation: Invitation) => void;
    removeInvitation: (email: string) => void;
  };
  appearance?: OrgAppearance;
};

export const useRowEditor = ({ rows, orgId, methods, appearance }: UseRowEditorProps) => {
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
      edit: (
        <Button onClick={() => editRow(row)} appearance={appearance?.elements?.EditUserButton}>
          Edit
        </Button>
      ),
    };
  });

  function getModalContents() {
    if (rowToEdit) {
      if (rowToEdit.status === "active" && rowToEdit.user_id) {
        return (
          <EditActiveUser
            orgId={orgId}
            user={rowToEdit as User}
            onClose={closeEditRow}
            setUserRole={methods.setUserRole}
            removeUser={methods.removeUser}
            appearance={appearance}
          />
        );
      } else if (rowToEdit.status === "pending") {
        return (
          <EditPendingInvitation
            orgId={orgId}
            user={rowToEdit as Invitation}
            onClose={closeEditRow}
            removeInvitation={methods.removeInvitation}
            appearance={appearance}
          />
        );
      } else if (rowToEdit.status === "expired") {
        return (
          <EditExpiredInvitation
            orgId={orgId}
            user={rowToEdit as Invitation}
            onClose={closeEditRow}
            addInvitation={methods.addInvitation}
            removeInvitation={methods.removeInvitation}
            appearance={appearance}
          />
        );
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
  orgId: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  roles: string[];
  inviteePossibleRoles: string[];
  addInvitation: (invitation: Invitation) => void;
  appearance?: OrgAppearance;
};

export const OrgControls = ({
  orgId,
  query,
  setQuery,
  filters,
  setFilters,
  roles,
  inviteePossibleRoles,
  addInvitation,
  appearance,
}: OrgControlsProps) => {
  const [filterPopover, setFilterPopover] = useState<HTMLButtonElement | null>(null);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const canInviteUsers = !!inviteePossibleRoles && inviteePossibleRoles.length > 0;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFilters((state) => {
      if (e.target.checked) {
        return [...state, e.target.id];
      } else {
        return [...state.filter((i) => i !== e.target.id)];
      }
    });
  }

  function onSuccessfulInvite(invitation: Invitation) {
    if (invitation) {
      addInvitation(invitation);
    }

    setShowInviteModal(false);
  }

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Search"}
        appearance={appearance?.elements?.SearchInput}
      />
      <Button
        ref={setFilterPopover}
        onClick={() => setShowFilterPopover(!showFilterPopover)}
        appearance={appearance?.elements?.FilterButton}
      >
        Filter
      </Button>
      {canInviteUsers && (
        <Button onClick={() => setShowInviteModal(true)} appearance={appearance?.elements?.InviteButton}>
          Invite User
        </Button>
      )}
      <Popover
        referenceElement={filterPopover}
        show={showFilterPopover}
        setShow={setShowFilterPopover}
        appearance={appearance?.elements?.FilterPopover}
      >
        <div data-contain="filter_group">
          {roles.map((role) => {
            const alias = `role:${role.toLowerCase()}`;
            return (
              <Checkbox
                key={role}
                label={role}
                id={alias}
                onChange={handleChange}
                checked={filters.includes(alias)}
                appearance={appearance?.elements?.FilterCheckbox}
              />
            );
          })}
        </div>
        <div data-contain="filter_group">
          <Checkbox
            label={"Pending"}
            id={"status:pending"}
            onChange={handleChange}
            checked={filters.includes("status:pending")}
            appearance={appearance?.elements?.FilterCheckbox}
          />
          <Checkbox
            label={"Active"}
            id={"status:active"}
            onChange={handleChange}
            checked={filters.includes("status:active")}
            appearance={appearance?.elements?.FilterCheckbox}
          />
        </div>
      </Popover>
      {canInviteUsers && (
        <Modal
          show={showInviteModal}
          setShow={setShowInviteModal}
          onClose={() => setShowInviteModal(false)}
          appearance={appearance?.elements?.InviteModal}
        >
          <InviteUser orgId={orgId} onSuccess={onSuccessfulInvite} />
        </Modal>
      )}
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
  appearance?: OrgAppearance;
};

export const Pagination = ({ controls, appearance }: PaginationControls) => {
  return (
    <>
      <Paragraph
        appearance={appearance?.elements?.PageText}
      >{`Page ${controls.currentPage} of ${controls.totalPages}`}</Paragraph>
      <div data-contain="pagination_buttons">
        {controls.hasBack && (
          <Button onClick={controls.onBack} appearance={appearance?.elements?.PageBackButton}>
            Back
          </Button>
        )}
        {controls.hasNext && (
          <Button onClick={controls.onNext} appearance={appearance?.elements?.PageNextButton}>
            Next
          </Button>
        )}
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
  user: User;
  onClose: VoidFunction;
  setUserRole: (userId: string, role: string) => void;
  removeUser: (userId: string) => void;
  appearance?: OrgAppearance;
};

export const EditActiveUser = ({ orgId, user, onClose, setUserRole, removeUser, appearance }: EditActiveUserProps) => {
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const changeRoleDisabled = !user.possible_roles || user.possible_roles.length === 0;

  function getRoleOptions() {
    if (user.possible_roles && user.possible_roles.length > 0) {
      return user.possible_roles.map((role) => {
        return { label: role, value: role };
      });
    } else {
      return [{ label: role, value: role }];
    }
  }

  async function handleRoleChange(e: FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options = { role, orgId, userId: user.user_id };
      //const response = await orgUserApi.changeRole(options);
      // if (response.ok) ..
      setUserRole(user.user_id, role);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveUser() {
    try {
      setLoading(true);
      setError(undefined);
      const options = { orgId, userId: user.user_id };
      //const response = await orgUserApi.removeUser(options);
      // if (response.ok) ..
      removeUser(user.user_id);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="modal">
      <div data-contain="header">
        <H3 appearance={appearance?.elements?.EditUserModalHeader}>Edit {user.email}</H3>
      </div>
      <div data-contain="form">
        <form onSubmit={handleRoleChange}>
          <Label htmlFor={"change_role"} appearance={appearance?.elements?.ChangeRoleLabel}>
            Change role
          </Label>
          <Select
            id={"change_role"}
            options={getRoleOptions()}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={changeRoleDisabled}
            appearance={appearance?.elements?.ChangeRoleSelect}
          />
          <Button loading={loading} disabled={user.role === role} appearance={appearance?.elements?.SaveRoleButton}>
            Save
          </Button>
        </form>
      </div>
      {user.can_be_deleted && (
        <Button loading={loading} onClick={handleRemoveUser} appearance={appearance?.elements?.RemoveUserButton}>
          Remove user
        </Button>
      )}
      {error && <Alert type={"error"}>{error}</Alert>}
    </div>
  );
};

export type EditPendingInvitationProps = {
  orgId: string;
  user: UserOrInvitation;
  onClose: VoidFunction;
  removeInvitation: (email: string) => void;
  appearance?: OrgAppearance;
};

export const EditPendingInvitation = ({
  orgId,
  user,
  onClose,
  removeInvitation,
  appearance,
}: EditPendingInvitationProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  async function revokeInvitation() {
    try {
      setLoading(true);
      setError(undefined);
      const options = { email: user.email, orgId };
      //const response = await orgUserApi.revokeUserInvitation(options);
      // if (response.ok) ..
      removeInvitation(user.email);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="modal">
      <div data-contain="header">
        <H3 appearance={appearance?.elements?.EditUserModalHeader}>Edit {user.email}</H3>
      </div>
      <Button loading={loading} onClick={revokeInvitation} appearance={appearance?.elements?.RevokeInvitationButton}>
        Revoke Invitation
      </Button>
      {error && (
        <Alert type={"error"} appearance={appearance?.elements?.EditUserAlert}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export type EditExpiredInvitationProps = {
  orgId: string;
  user: UserOrInvitation;
  onClose: VoidFunction;
  addInvitation: (invitation: Invitation) => void;
  removeInvitation: (email: string) => void;
  appearance?: OrgAppearance;
};

export const EditExpiredInvitation = ({
  orgId,
  user,
  onClose,
  addInvitation,
  removeInvitation,
  appearance,
}: EditExpiredInvitationProps) => {
  const { orgUserApi } = useClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  async function deleteInvitation() {
    try {
      setLoading(true);
      setError(undefined);
      const options = { email: user.email, orgId };
      //const response = await orgUserApi.revokeUserInvitation(options);
      // if (response.ok) ..
      removeInvitation(user.email);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function resendInvitation() {
    try {
      setLoading(true);
      setError(undefined);
      //const response = await orgUserApi.revokeUserInvitation(options);
      // if (response.ok) ..
      removeInvitation(user.email);
      //const response = await orgUserApi.inviteUser(options);
      // if (response.ok) ..
      addInvitation({
        email: user.email,
        role: user.role,
        status: "pending",
      });
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="modal">
      <div data-contain="header">
        <H3 appearance={appearance?.elements?.EditUserModalHeader}>Edit {user.email}</H3>
      </div>
      <Button loading={loading} onClick={resendInvitation} appearance={appearance?.elements?.ResendInvitationButton}>
        Resend Invitation
      </Button>
      <Button loading={loading} onClick={deleteInvitation} appearance={appearance?.elements?.DeleteInvitationButton}>
        Delete Invitation
      </Button>
      {error && (
        <Alert type={"error"} appearance={appearance?.elements?.EditUserAlert}>
          {error}
        </Alert>
      )}
    </div>
  );
};
