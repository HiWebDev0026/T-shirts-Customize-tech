class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    handleAddress = ()=>{
        const message = this.createChatBotMessage('Great! Our address is Fake Street 123, dept. 8', {widget: 'default'});
        this.addMessageToState(message);
    }

    handleHours = ()=>{
        const message = this.createChatBotMessage('Ok!', {widget: 'hours'}, {widget: 'default'});
        this.addMessageToState(message);
    }

    handleProblems = ()=>{
        const message = this.createChatBotMessage("We're sorry, how can we help? ", {widget: 'problems'}, {widget: 'default'});
        this.addMessageToState(message);
    }

    addMessageToState = (messages) => {
        this.setState((state) => ({
            ...state,
            messages: [...state.messages, messages],
        }));
    }
    
}
  
export default ActionProvider;