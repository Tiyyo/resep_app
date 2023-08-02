export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}
