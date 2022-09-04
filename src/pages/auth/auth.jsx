import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  AuthBlock,
  AuthTitle,
  AuthUserName,
  AuthPassword,
  Label,
  SubmitForm
} from './style.jsx';

import Button from '@mui/material/Button';

const Auth = () => {
  const [valueName, setValueName] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [url, setUrl] = useState("");
  const [authUser, setAuthUser] = useState(false);

  const onChange = (e) => {
    if (e.target.name === "name") {
      setValueName(e.target.value);
    }
    if (e.target.name === "password") {
      setValuePassword(e.target.value);
    }
  };

  const fecthForm = async (body) => {
    await fetch(`http://79.143.31.216/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(
        `grant_type=&username=${valueName}&password=${valuePassword}&scope=&client_id=&client_secret=`
      ),
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          alert("Вы вошли");
          setAuthUser((prev) => !prev);
          return res;
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", data.access_token);
      })
      .then(() => console.log("Вы вошли"))
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      username: valueName,
      password: valuePassword,
    };
    const fetchBody = JSON.stringify(body);
    console.log(body);
    fecthForm(fetchBody);
    console.log(url);
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (authUser) {
      return navigate("/table");
    }
  }, [authUser]);

  return (
    <AuthBlock>
      <AuthTitle>Авторизация</AuthTitle>
        <Label>
          Username
          <AuthUserName
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="name"
            value={valueName}
            name="name"
          ></AuthUserName>
        </Label>
        <Label>
          Password
          <AuthPassword
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="password"
            value={valuePassword}
            name="password"
          ></AuthPassword>
        </Label>
        <Button variant="contained" onClick={(e) => submitForm(e)}>Войти</Button>
      или
      <Link to="/reg">Зарегистрироваться</Link>
    </AuthBlock>
  );
};

export default Auth;
