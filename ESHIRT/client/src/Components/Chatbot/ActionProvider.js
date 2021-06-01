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

    handleNotUnderstanding = ()=>{
        const message = this.createChatBotMessage("I'm sorry, but I can't understand this :( ", {widget: 'understanding'});
        this.addMessageToState(message);
    }
    handleHello = () => {
        const message = this.createChatBotMessage("Hi! I'm Shirtbot, let's chat, why not?", {widget: 'hello'})
        this.addMessageToState(message);
    }
    handleBye = () => {
        const message = this.createChatBotMessage("Thanks for asking! I'll be here if you need anything else");
        this.addMessageToState(message);
    }
    handleShirts = () => {
        const message = this.createChatBotMessage("Doubts about shirts?", {widget: 'shirts'});
        this.addMessageToState(message);
    }
    handleHumans = () => {
        const message = this.createChatBotMessage("You want to talk to a human? If so, send an e-mail to e.shirt2021@gmail.com");
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