import loadable from "@loadable/component";

export const HomeLoadablePage = loadable(() => import("../pages/home/Home"));
export const LoginLoadablePage = loadable(() => import("../pages/login/Login"));
export const RegisterLoadablePage = loadable(() => import("../pages/register/Register"));
export const ResetPasswordLoadablePage = loadable(() => import("../pages/reset-password/ResetPassword"));
