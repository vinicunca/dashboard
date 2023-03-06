export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
