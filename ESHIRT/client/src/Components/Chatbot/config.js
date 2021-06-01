import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import Style from './ChatbotSelect.module.css';
import Avatar from './Components/Avatar';
import Options from './Components/Options';
import ContactInfo from './Components/ContactInfo';
import Purchases from './Components/Purchases';
import Designs from './Components/Designs';
import Complaints from './Components/Complaints';
import Report from './Components/Report';
import Hours from './Components/Hours';
import ShippingCosts from './Components/ShippingCosts';
import DiscountChat from './Components/DiscountChat';
import CalculateSize from './Components/CalculateSize';
import Colors from './Components/Colors';
import Default from './Components/Default';
import Understanding from './Components/Understanding';
import Hello from './Components/Hello';
import Shirts from './Components/Shirts';
import ClaimsForm from './Components/ClaimsForm';

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
    initialMessages: [createChatBotMessage(`Hi! I'm E-shirt bot, I'm here to answer your questions!
    Here some options to get us going`, {widget: 'options'})],
    widgets: [
        {
            widgetName: "options",
            widgetFunc: (props) => <Options {...props} />,
        },
        /*---------------Options------------------------- */
        {
            widgetName: "contactInfo",
            widgetFunc: (props) => <ContactInfo {...props} />,
        },
        {
            widgetName: "purchases",
            widgetFunc: (props) => <Purchases {...props} />,
        },
        {
            widgetName: "designs",
            widgetFunc: (props) => <Designs {...props} />,
        },
        {
            widgetName: "complaints",
            widgetFunc: (props) => <Complaints {...props} />,
        },
        {
            widgetName: "report",
            widgetFunc: (props) => <Report {...props} />,
        },
        /*---------------Contact Info------------------------- */
        {
            widgetName: "hours",
            widgetFunc: (props) => <Hours {...props} />,
        },
        /*---------------Purchases------------------------- */
        {
            widgetName: "shippingCosts",
            widgetFunc: (props) => <ShippingCosts {...props} />,
        },
        {
            widgetName: "discount",
            widgetFunc: (props) => <DiscountChat {...props} />,
        },
        {
            widgetName: "calculateSize",
            widgetFunc: (props) => <CalculateSize {...props} />,
        },
        /*---------------Designs------------------------- */
        {
            widgetName: "colors",
            widgetFunc: (props) => <Colors {...props} />,
        },
        /*---------------Complaints------------------------- */
        {
            widgetName: "allComplaints",
            widgetFunc: (props) => <ClaimsForm {...props} />,
        },
        /*---------------Report Inadequate Behavior---------- */
        {
            widgetName: "default",
            widgetFunc: (props) => <Default {...props} />,
        },
        /*-----------------Eze---------------------------------- */
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
    ]
}

export default config