import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = styled.div`
  width: 500px;
  height: 400px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.09);
`;
const RegTitle = styled.h1`
  color: #af9e9e;
`;
const RegUserName = styled.input`
  color: #3a3434;
  height: 25px;
  outline: none;
  border-radius: 5px;
  border: 1px solid gray;
`;
const RegPassword = styled(RegUserName)``;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SubmitForm = styled.input`
  margin-top: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #0bacdd;
  border: 0;
  width: 150px;
  height: 25px;
  font-size: 18px;
`;

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
      <RegTitle>Registration</RegTitle>
      <form>
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
        <SubmitForm type="submit" value="Send" onClick={(e) => submitForm(e)} />
      </form>
      или
      <Link to="/auth">Войти</Link>
    </Registration>
  );
};

export default Reg;
