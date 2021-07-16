import React, { FunctionComponent } from 'react';

type Props = {
  id: string;
};

const Chatbox: FunctionComponent<Props> = () => {
  console.log('use chatbox');
  return <div>some content</div>;
};

export default Chatbox;
