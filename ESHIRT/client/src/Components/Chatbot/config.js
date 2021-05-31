import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import Options from './Components/Options';
import Address from './Components/Address';
import Hours from './Components/Hours';
import Problems from './Components/Problems';
import Default from './Components/Default';
import Understanding from './Components/Understanding';
import Hello from './Components/Hello';

const config = {
    botName: 'E-shirt bot',
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
            widgetName: "understanding",
            widgetFunc: (props) => <Understanding {...props} />,
        },
    ]
}

export default config