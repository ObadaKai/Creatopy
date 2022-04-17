import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { Link, Navigate } from "react-router-dom";
import RoutePaths from "../../router/routePaths";
import { getUserByEmailAndPasswordQuery } from "../../models/graphql/queries";
import User from "../../models/app/user";
import { useDispatch } from "react-redux";
import { unsetLoading, setLoading } from "../../redux/slices/globalSlice";
import Utils from "../../utils/utils";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigteToHome, setNavigteToHome] = useState(false);

  const [login, { data }] = useLazyQuery<{ getUserByEmailAndPassword: User }>(getUserByEmailAndPasswordQuery, { onError: () => dispatch(unsetLoading()) });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.getUserByEmailAndPassword?.id) {
      dispatch(unsetLoading());
      Utils.saveUser(data?.getUserByEmailAndPassword);
      setNavigteToHome(true);
    }
  }, [data]);
  if (navigteToHome) return <Navigate replace to={RoutePaths.home} />;

  const submit = async () => {
    if (!email || !password) {
      toast("Email and Password Fields should be valid!");
      return;
    }
    dispatch(setLoading());
    login({ variables: { email, password } });
  };
  return (
    <div className="floating-box-wrapper">
      <div className="floating-box">
        <Input name="email" type="email" value={email} placeholder="something@something.com" label="Please Enter your Email" onChange={(e: any) => setEmail(e.target.value)}></Input>
        <Input name="password" type="password" value={password} placeholder="****" label="Please Enter your Password" onChange={(e: any) => setPassword(e.target.value)}></Input>
        <button onClick={() => submit()}>Login</button>
        <div><Link to={RoutePaths.register}>Register</Link></div>
        <div><Link to={RoutePaths.resetPassword}>Reset Password</Link></div>
      </div>
    </div>
  );
}
