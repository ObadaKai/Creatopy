import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { Navigate } from "react-router-dom";
import RoutePaths from "../../router/routePaths";
import User from "../../models/app/user";
import { createUserMutation } from "../../models/graphql/mutations";
import { useDispatch } from "react-redux";
import { unsetLoading, setLoading } from "../../redux/slices/globalSlice";
import Utils from "../../utils/utils";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [navigteToHome, setNavigteToHome] = useState(false);

  const [register] = useMutation<{ createUser: User }>(createUserMutation, { onError: () => dispatch(unsetLoading()) });

  const dispatch = useDispatch();

  if (navigteToHome) return <Navigate replace to={RoutePaths.home} />;

  const submit = async () => {
    if (!email || !password || !name || !surname) {
      toast("All Fields should be populated");
      return;
    }
    const dataCall = { name, surname, email, password };
    dispatch(setLoading());
    const result = await register({ variables: { data: dataCall } });
    if (result?.data?.createUser?.id) {
      dispatch(unsetLoading());
      Utils.saveUser(result?.data?.createUser);
      setNavigteToHome(true);
    }
  };

  return (
    <div className="floating-box-wrapper">
      <div className="floating-box">
        <Input name="email" type="email" value={email} placeholder="something@something.com" label="Please Enter your Email" onChange={(e: any) => setEmail(e.target.value)}></Input>
        <Input name="password" type="password" value={password} placeholder="****" label="Please Enter your Password" onChange={(e: any) => setPassword(e.target.value)}></Input>
        <Input name="name" type="text" value={name} placeholder="Name" label="Please Enter your Name" onChange={(e: any) => setName(e.target.value)}></Input>
        <Input name="surname" type="text" value={surname} placeholder="Surname" label="Please Enter your Surname" onChange={(e: any) => setSurname(e.target.value)}></Input>
        <button onClick={() => submit()}>Register</button>
      </div>
    </div>
  );
}
