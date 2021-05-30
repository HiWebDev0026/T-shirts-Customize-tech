import React, {useState} from 'react';
//import { FaVideoSlash } from 'react-icons/fa';
import Style from './ChatbotSelect.module.css';
import ChatbotImg from '../../Images/chatbot.png';
import Chatbot from 'react-chatbot-kit'
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";


function ChatbotSelect() {

    const [chatActive, setChatActive] = useState(false);

    function handleButton (){
        setChatActive(!chatActive);
    }

    return (
      <div className={Style.container} >
          {
          chatActive?
            <div className={Style.box}>
                <button className={Style.closeButton} onClick={handleButton}>X</button>
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
            : <img width={'200px'} height={'240px'} src={ChatbotImg} onClick={handleButton} className={Style.img}/> }
      </div>
    );
}

export default ChatbotSelect;