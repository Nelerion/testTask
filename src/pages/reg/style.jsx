import styled from "styled-components";

export const Registration = styled.div`
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
export const RegTitle = styled.h1`
  color: #af9e9e;
`;
export const RegUserName = styled.input`
  color: #3a3434;
  height: 25px;
  outline: none;
  border-radius: 5px;
  border: 1px solid gray;
`;
export const RegPassword = styled(RegUserName)``;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const SubmitForm = styled.input`
  margin-top: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #0bacdd;
  border: 0;
  width:200px;
  font-size: 18px;
  border-radius:5px;
  padding:8px;
  &:hover{
    background-color:#0fc1f7;
  }
`;
