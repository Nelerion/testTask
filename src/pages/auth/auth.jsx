import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthBlock = styled.div`
  width: 500px;
  height: 300px;
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
const AuthTitle = styled.h1`
  color: #af9e9e;
`;
const AuthUserName = styled.input`
  color: #3a3434;
  height: 25px;
  outline: none;
  border-radius: 5px;
  border: 1px solid gray;
`;
const AuthPassword = styled(AuthUserName)``;
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

const Auth = () => {
  const [valueName, setValueName] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [url, setUrl] = useState("");
  const [authUser, setAuthUser] = useState(false);
  const [token, setToken] = useState("");


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
      <AuthTitle>Authorization</AuthTitle>
      <form>
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
        <SubmitForm type="submit" value="Send" onClick={(e) => submitForm(e)} />
      </form>
    </AuthBlock>
  );
};

export default Auth;
