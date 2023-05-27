import { useState } from "react";
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log('user', user.username)
      localStorage.setItem("userToken", user.username)
      navigate("/")
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  return (
    <LoginSection>
      <LoginForm>
        <LoginInput>
          <LoginTitle>Sign in to your account</LoginTitle>
          {/* {errorMessage && <h3>{errorMessage}</h3>} */}
          <LoginField
            id="email"
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <LoginField
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <LoginButton onClick={signIn}>Sign In</LoginButton>
          <LoginText>
            Don't have an account? <a href="/register">Create one now</a>
          </LoginText>
        </LoginInput>
      </LoginForm>
    </LoginSection>
  );
}


const LoginSection = styled.div`
  padding: 1em;
  margin-top: auto;
`;

const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center:
`;

const LoginInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 30px 0px 30px;
  background-color: #FFF7ED;
  border-radius: 10px;
  max-width: 768px;
`;

const LoginTitle = styled.h1`
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #273B5F;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const LoginField = styled.input`
  width: 90%;
  height: 42px;
  border-radius: 5px;
  border: 1px solid #D1D5DB;
  margin: 10px;
`;

const LoginButton = styled.button`
  background-color:#ffab34;
  color: white;
  font-size: 1.125rem;
  border-radius: 5px;
  margin-top: 20px;
  width: 90%;
  margin-bottom: 27px;
  border: none;
  height: 55px;
`;

const LoginText = styled.p`
  color: #273B5F;
  font-weight: 400;
  padding-bottom: 10px;

  a {
    text-decoration: none;
    color: #ffab34;
  }
`;
