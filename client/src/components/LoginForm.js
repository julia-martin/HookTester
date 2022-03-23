import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import { COLORS } from '../constants.js';
import { WaypostContext } from 'waypost-sdk-react';
import { UserContext } from '../App';

const LoginForm = () => {
  const { sdkClient } = useContext(WaypostContext);
  const { setUserId } = useContext(UserContext);
  const [ newUserId, setNewUserId ] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setUserId(newUserId);
    localStorage.setItem("hooktester-userId", newUserId);
    sdkClient.addContext({ userId: newUserId });
    axios.post('/login', { userId: newUserId });
  };

  return (
    <Wrapper onSubmit={handleLogin}>
      <h2>Log In</h2>
      <label htmlFor="userid" >User ID</label>
      <input id="userid" type="text" value={newUserId} onChange={e => setNewUserId(e.target.value)} />
      <button type="submit">Submit</button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  background-color: ${COLORS.transparentPurple};
  border-radius: 8px;
  width: 50%;
  padding: 50px;
  margin: 10px auto;
  text-align: center;
`;

export default LoginForm;