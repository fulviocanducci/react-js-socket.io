import React, { useState, useEffect, useRef } from 'react';
import socketClient from 'socket.io-client'
const socket = new socketClient('http://localhost:3001');

export default function App() {

  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const inputMessage = useRef();

  function handlerMessageChange(event) {
    const { value } = event.target;
    setMessage(value);
  }

  function handlerButtonSend() {
    socket.emit('chat message', message);
    setMessage(''); 
    handleInputMessageFocus();   
  }

  function handleInputMessageFocus() {
    if (inputMessage) {
      inputMessage.current.focus();
    }
  }
  
  useEffect(() => {
    handleInputMessageFocus(); 
    socket.emit('chat message', '');    
  },[]);

  useEffect(() => {
    socket.on('chat message', (message) => {       
      const messages = JSON.parse(message);     
      setList(messages);      
    });
  },[list]);

  function ListShow({item}) {
    return ( <li>{item}</li>);
  }

  return (
    <>
      <div>
        <input type="text" ref={inputMessage} name="message" id="message" value={message} onChange={handlerMessageChange} />
      </div>
      <div>
        <button id="buttonSend" onClick={handlerButtonSend}>Send</button>
      </div>
      <div>
        <ul>
          {list.map((item, index) => (<ListShow key={index} item={item} />))}
        </ul>
      </div>
    </>
  );
}