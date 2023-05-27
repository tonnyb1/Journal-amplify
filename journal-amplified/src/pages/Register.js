import { useState } from "react";
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false); // state to toggle verification code input
  const [verificationCode, setVerificationCode] = useState(''); // state to store verification code
  const [userToken, setUserSub] = useState('')

  async function signUp() {
    try {
      const {user, userSub} = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
        autoSignIn: true
      });
      console.log('user', user);
      setUserSub(userSub)
      setShowCodeInput(true); // show verification code input
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp() { // function to confirm sign-up with verification code
    try {
      await Auth.confirmSignUp(email, verificationCode);
      localStorage.setItem("userToken", userToken)
      navigate("/"); // navigate to home page after successful confirmation
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  return (
    <LoginSection>
      <LoginForm>
        <LoginInput>
          <LoginTitle>Create your account</LoginTitle>
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
          <LoginButton onClick={signUp}>Create Account</LoginButton>
          {showCodeInput && (
            <>
              <LoginTitle>Check your email for verification code</LoginTitle>
              <LoginField
                id="verificationCode"
                type="text"
                placeholder="Verification Code"
                name="verificationCode"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
              />
              <LoginButton onClick={confirmSignUp}>Submit</LoginButton>
            </>
          )}
          <LoginText>
            Already have an account? <a href="/login">Sign in</a>
          </LoginText>
        </LoginInput>
      </LoginForm>
    </LoginSection>
  );
}


const LoginSection = styled.div`
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
