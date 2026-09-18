interface TimeZone {
  id: number;
  name: string;
}

export interface AdminResponse {
  id: string;
  status: number;
  child_count: number;
  ip: string;
}

export interface CreateAdminForm {
  username: string;
  password: string;
  confirmPassword: string;
  timezone: string;
}

export interface CreateAdminRequest {
  username: string;
  password: string;
  time_zone: string;
}

export interface ResetPasswordRequest {
  originalPassword: string;
  newPassword: string;
  confirmPassword: string;
}
