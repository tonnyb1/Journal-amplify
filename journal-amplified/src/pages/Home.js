import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import Tile from '../components/Tile';



export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [journals, setJournals] = useState([]);

   const userId = localStorage.getItem("userToken")

  async function handleSendButton() {
    try {
      const journalDetails = {
        title: journalTitle,
        content: userInput,
        userJournalsId:userId,
      };

      const result = await API.graphql(
        graphqlOperation(mutations.createJournal, { input: journalDetails })
      );
      setJournals([result.data.createJournal, ...journals])
      setUserInput("");
      setJournalTitle("")
    } catch (err) {
      console.log('Error creating journal', err);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userToken")
    
    async function fetchJournalsByUserId() {
      try {
        const result = await API.graphql(graphqlOperation(queries.listJournals, {
          filter: {
            userJournalsId: {
              eq: userId
            }
          }
        }));
        setJournals(result.data.listJournals.items)
      } catch (error) {
        console.error('Error fetching journals:', error);
        return null;
      }
    }

    fetchJournalsByUserId()
  }, []);


  return (
    <>
      <StyledPromptContainer>
      <Title>Write your journal in the box below to send anonymously</Title>
      <StyledInput
        type="text"
        placeholder="Enter Journal Title"
        value={journalTitle}
        onChange={(e) => setJournalTitle(e.target.value)}
      />
      <StyledTextarea
        placeholder="maximum 500 characters"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        maxLength={500}
      />
      <div>
        <StyledButton onClick={handleSendButton}>Send</StyledButton>
      </div>
      </StyledPromptContainer>
      { journals.length > 0 && (
        <StyledTileContainer>
            { journals.map((journal) => (
              <Tile key={ journal.id } title={ journal.title } content={ journal.content } />
            )) }
        </StyledTileContainer>   
      )}

    </>
    
  );
}


const StyledPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #273B5F;
  padding: 1em;
  text-align: center;
`;

const StyledTextarea = styled.textarea`
  border-bottom-width: 1px;
  border: solid 1px coral;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0px;
  line-height: 1.6em;
  text-align: start;
  color: #273B5F;
  text-decoration: none;
  text-transform: none;
  height: 150px;
  max-height: 200px;
  width: 80%;
  max-width: 1200px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const StyledButton = styled.button`
  background-color: #ffab34;
  color: #ffffff;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  border: solid 1px coral;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0px;
  line-height: 1.6em;
  color: #273B5F;
  text-decoration: none;
  height: 40px;
  width: 60%;
  max-width: 1200px;
  padding: 10px;
  margin-top: 20px;
  outline: none;
`;

const StyledTileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 768px) {
    margin-inline:1em;
  }

  @media (max-width: 767px) {
    justify-content: center;

    & > div {
      margin-bottom: 10px;
    }
  }

  & > div {

    @media (min-width: 768px) {
      width: calc(50% - 10px); /* 10px is the total combined left/right margin */
    }

    @media (min-width: 992px) {
      width: calc(33.33% - 10px); /* 10px is the total combined left/right margin */
    }

    @media (min-width: 1200px) {
      width: calc(25% - 10px); /* 10px is the total combined left/right margin */
    }

    margin-bottom: 20px;
  }
`;