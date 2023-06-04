import React from "react"
import { Link, NavLink, } from "react-router-dom";
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    async function signOut() {
        try {
          await Auth.signOut();
          console.log("sign out successful")
          localStorage.clear()
          navigate("/login")
        } catch (error) {
          console.log('error signing out: ', error);
        }
    }

    const isLoggedIn = localStorage.getItem("userToken") !== null;
    
    return (
        <HeaderContainer>
            <SiteLogo to="/">#DAILYJOURNAL</SiteLogo>
            <Nav>
                {/* Conditional rendering based on 'isLoggedIn' */}
                {isLoggedIn ? (
                <button className="send-btn" onClick={signOut}>Logout</button>
                ) : (
                <>
                    <StyledNavLink 
                    to="/register"
                    style={({isActive}) => isActive ? activeStyles : null}
                    >
                    SIGN UP
                    </StyledNavLink>
                    <StyledNavLink 
                    to="/login"
                    style={({isActive}) => isActive ? activeStyles : null}
                    >
                    LOG IN
                    </StyledNavLink>
                </>
                )}
            </Nav>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  padding-block: 10px;
  box-shadow: 0px 2.9825618267059326px 7.456404209136963px 0px #0000001A;
`;

const SiteLogo = styled(Link)`
  color: #273B5F;
  margin-right: auto;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 20px;
  padding: 1em;
`;

const Nav = styled.nav`
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: coral;
  font-weight: 600;
  padding: 5px 15px;

  &:hover {
    color: #161616;
    text-decoration: underline;
  }
`;

// const LoginIcon = styled.img`
//   height: 18px;
//   width: 18px;
// `;

// const LoginLink = styled.div`
//   display: inline-flex;
//   align-items: center;
// `;

