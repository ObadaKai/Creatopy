import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { Navigate } from "react-router-dom";
import RoutePaths from "../../router/routePaths";
import User from "../../models/app/user";
import { resetUserPasswordMutation } from "../../models/graphql/mutations";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../redux/slices/globalSlice";
import Utils from "../../utils/utils";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [navigteToHome, setNavigteToHome] = useState(false);

  const [resetPassword, { data }] = useMutation<{ resetUserPassword: User }>(resetUserPasswordMutation, { onError: () => dispatch(unsetLoading()) });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.resetUserPassword?.id) {
      dispatch(unsetLoading());
      Utils.saveUser(data?.resetUserPassword);
      setNavigteToHome(true);
    }
  }, [data]);
  if (navigteToHome) return <Navigate replace to={RoutePaths.home} />;

  const submit = async () => {
    if (!email || !newPassword || !oldPassword) {
      toast("All Fields should be populated");
      return;
    }
    const dataCall = { email, newPassword, oldPassword };
    dispatch(setLoading());
    resetPassword({ variables: { dataCall } });
  };
  return (
    <div className="floating-box-wrapper">
      <div className="floating-box">
        <Input name="email" type="email" value={email} placeholder="something@something.com" label="Please Enter your Email" onChange={(e: any) => setEmail(e.target.value)}></Input>
        <Input name="newPassword" type="password" value={newPassword} placeholder="****" label="Please Enter your New password" onChange={(e: any) => setNewPassword(e.target.value)}></Input>
        <Input name="oldPassword" type="password" value={oldPassword} placeholder="****" label="Please Enter your Old password" onChange={(e: any) => setOldPassword(e.target.value)}></Input>
        <button onClick={() => submit()}>Reset Password</button>
      </div>
    </div>
  );
}
