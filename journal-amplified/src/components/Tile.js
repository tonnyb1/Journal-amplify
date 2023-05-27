import React from 'react';
import styled from 'styled-components';

const Tile = ( {content, title} ) => {
  console.log('tilesss',content,title)
  return (
    <TileJournalContainer>
      <Title> {title}</Title>
      <Text>{content}</Text>
    </TileJournalContainer>
  );
};

export default Tile;

const TileJournalContainer = styled.div`
  width: 80%;
  height: auto;
  background-color: #f9f9f9;
  padding: 5px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #273B5F;
  overflow: auto;
  border-radius: 5px;
  margin-bottom: 20px;
  align-self: center;

  @media screen and (min-width: 768px) {
    max-width: 250px;
    margin: 1em;
    padding: 10px;
    height: 300px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Text = styled.p`
  padding: 5px;
  margin: 10px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
  max-width: 600px;
  overflow-y: scroll;
  font-size: 18px;
  line-height: 1.5;
  color: #666;

  @media screen and (min-width: 768px) {
    margin: 20px 0;
    font-size: 20px;
    padding: 10px;
    height: 200px;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
    border: 3px solid #f1f1f1;
  }
`;
