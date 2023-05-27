import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Layout() {

  return (
    <SiteWrapper>
      <Header/>
      <Outlet />
      <Footer />
    </SiteWrapper>
  );
}
