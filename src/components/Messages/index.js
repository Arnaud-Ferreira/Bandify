import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './style.scss';

const Messages = ({
  messages, getMessages, receiverName, reicever, sender,
}) => {
  const messageRef = useRef();
  useEffect(() => {
    getMessages();

    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
    ref={messageRef}
    className="messages">
      <p className="messages__author">{receiverName}</p>
      {messages.map((message) => (
        <Message
          key={message.id}
          {...message}
          reicever={reicever}
          sender={sender}
        />
      ))}
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  })).isRequired,
  getMessages: PropTypes.func.isRequired,
  receiverName: PropTypes.string.isRequired,
  reicever: PropTypes.number.isRequired,
  sender: PropTypes.number.isRequired,
};

export default Messages;
