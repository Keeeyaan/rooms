import React from 'react';
import { useParams } from 'react-router-dom';

import Page from '../../pages/Page';
import RoomNav from '../../components/UI/RoomNav';

const RoomChat = () => {
  const { id } = useParams();
  return (
    <Page title='GAMER |' maxWidth='lg'>
      <RoomNav id={id} />
      <h1>Chat</h1>
    </Page>
  );
};

export default RoomChat;
