import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import Options from './Components/Options';
import Address from './Components/Address';
import Hours from './Components/Hours';
import Problems from './Components/Problems';
import Default from './Components/Default';
import Understanding from './Components/Understanding';
import Hello from './Components/Hello';
import Shirts from './Components/Shirts';
import Avatar from './Components/Avatar';
import Style from './ChatbotSelect.module.css'

const config = {
    botName: 'E-shirt bot',
    customComponents: {
        header: () => <div className={Style.header}>E-Shirt Chat Bot</div>,
        botAvatar: (props) => <Avatar {...props}/>,
        userAvatar: (props) => <Avatar {...props} isUser={true}/>
    },
    customStyles: {
        // Overrides the chatbot message styles
        botMessageBox: {
            backgroundColor: "rgba(125, 125, 125)",
        },
        // Overrides the chat button styles
        chatButton: {
          backgroundColor: "#ffb627",
        },
    },
    initialMessages: [createChatBotMessage(`Hi! How can we help?`, {widget: 'options'})],
    widgets: [
        {
            widgetName: "options",
            widgetFunc: (props) => <Options {...props} />,
        },
        {
            widgetName: "address",
            widgetFunc: (props) => <Address {...props} />,
        },
        {
            widgetName: "hours",
            widgetFunc: (props) => <Hours {...props} />,
        },
        {
            widgetName: "problems",
            widgetFunc: (props) => <Problems {...props} />,
        },
        {
            widgetName: "default",
            widgetFunc: (props) => <Default {...props} />,
        },
        {
            widgetName: "hello",
            widgetFunc: (props) => <Hello {...props} />,
        },
        {
            widgetName: "bye",
            //widgetFunc: (props) => <Bye {...props} />,
        },
        {
            widgetName: "shirts",
            widgetFunc: (props) => <Shirts {...props} />,
        },
        {
            widgetName: "understanding",
            widgetFunc: (props) => <Understanding {...props} />,
        },
        {
            widgetName: "humans"
        },
    ]
}

export default config