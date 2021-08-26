import React from 'react';
import './message-envelope.css';

export const MessageEnvelope = ({ message, show }) => {
  return (
    <main className="container">
      <div className="env">
        <label for="open-env">
          <input type="checkbox" id="open-env" />
          <label className="top" for="open-env" />
          <div className="content">
            <h2>Hey there!!</h2>
            <p> {message} </p>
          </div>
          <div className="rest" />
        </label>
      </div>
    </main>
  );
};
