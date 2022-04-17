import { Navigate, Outlet } from "react-router-dom";
import Utils from "../utils/utils";
import RoutePaths from "./routePaths";

const RoutesGuard = () => {
  return Utils.getUser() ? <Outlet /> : <Navigate replace to={RoutePaths.login} />;
};
export default RoutesGuard;
