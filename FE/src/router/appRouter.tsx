import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReduxState from "../models/app/reduxState";
import { HomeLoadablePage, LoginLoadablePage, RegisterLoadablePage, ResetPasswordLoadablePage } from "./loadableComponents";
import RoutePaths from "./routePaths";
import RoutesGuard from "./routesGuard";

export default function AppRouter() {
  const isLoadingSet = useSelector<ReduxState, boolean>((state) => state.global.isLoading);

  return (
    <React.Fragment>
      <ToastContainer />
      {isLoadingSet && (
        <div className="react-loading-container">
          <ReactLoading type={"bubbles"} color={"blue"} height={"100px"} width={"100px"} />
        </div>
      )}

      <Router>
        <Routes>
          <Route path={RoutePaths.login} element={<LoginLoadablePage />} />
          <Route path={RoutePaths.register} element={<RegisterLoadablePage />} />
          <Route path={RoutePaths.resetPassword} element={<ResetPasswordLoadablePage />} />
          <Route path={RoutePaths.home} element={<RoutesGuard />}>
            <Route path={RoutePaths.home} element={<HomeLoadablePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
