import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import axios from 'axios';
import Header from './Header';
import RequestList from './RequestList';
import { baseURL, publicURL, COLORS } from '../constants.js';

const InspectPage = () => {
  const { url } = useParams();
  const [ requests, setRequests ] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get(`${baseURL}/inspect/${url}`);
      setRequests(response.data.requests);
    };

    fetchRequests();
  }, []);

  return (
    <Container>
      <Header />
      <Info><h3>Your new URL is: {publicURL}/r/{url}</h3></Info>
      <RequestList requests={requests} />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const Info = styled.div`
  background-color: ${COLORS.seagreen};
  text-align: center;
  padding: 20px;
  margin: 0 auto;
`;

export default InspectPage;