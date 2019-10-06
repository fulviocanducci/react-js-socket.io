import React, { useState, useEffect } from 'react';
import socketClient from 'socket.io-client'
const socket = new socketClient('http://localhost:3001');

export function App() {

  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);

  function handlerMessageChange(event) {
    const { value } = event.target;
    setMessage(value);
  }

  function handlerButtonSend() {
    socket.emit('chat message', message);
  }

  useEffect(() => {
    socket.on('chat message', (message) => {      
      setList([...list, message]);
      });
  },[list]);

  return (
    <>
      <div>
        <input type="text" name="message" id="message" value={message} onChange={handlerMessageChange} />
      </div>
      <div>
        <button id="buttonSend" onClick={handlerButtonSend}>Send</button>
      </div>
      <div>
        <ul>
          {list.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </div>
    </>
  );
}

export default App;
