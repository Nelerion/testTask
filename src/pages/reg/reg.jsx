import { useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import styled from "styled-components";
import {
   Registration,
   RegTitle,
   RegUserName,
   RegPassword, 
   Label,  
  } from './style.jsx';

const ButtonReg = styled(Button)`
margin-top:20px !important;

`

const Reg = () => {
  const [reg, setReg] = useState(false);
  const [valueName, setValueName] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [url, setUrl] = useState("");

  const onChange = (e) => {
    if (e.target.name === "name") {
      setValueName(e.target.value);
    }
    if (e.target.name === "password") {
      setValuePassword(e.target.value);
    }
  };

  const fecthForm = async (body) => {
    await fetch(
      `http://79.143.31.216/register?username=${valueName}&password=${valuePassword}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("Регистрация прошла успешна");
          setReg(prev=>!prev)
          return res;
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      })
      .then((res) => res.json())
      .then((data) => console.log("+", data))
      .then(() => console.log("Регистрация прошла успешна"))
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

  return (
    <Registration>
      <RegTitle>Регистрация</RegTitle>
        <Label>
          Username
          <RegUserName
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="name"
            value={valueName}
            name="name"
          ></RegUserName>
        </Label>
        <Label>
          Password
          <RegPassword
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="password"
            value={valuePassword}
            name="password"
          ></RegPassword>
        </Label>
        <ButtonReg variant="contained" onClick={(e) => submitForm(e)}>Зарегистрироваться</ButtonReg>
      или
      <Link to="/">Войти</Link>
    </Registration>
  );
};

export default Reg;
