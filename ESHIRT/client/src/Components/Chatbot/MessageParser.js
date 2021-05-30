class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {

        console.log(message)
        const lowerCase = message.toLowerCase();
    
        if(lowerCase.includes('our address')|| lowerCase.includes('address') || lowerCase.includes('adress') || lowerCase.includes('addres')){
            this.actionProvider.handleAddress();
        }
        if(lowerCase.includes('our opening hours')|| lowerCase.includes('opening hours') || lowerCase.includes('hours') || lowerCase.includes('opening')){
            this.actionProvider.handleHours();
        }
        if(lowerCase.includes('solving problems')|| lowerCase.includes('problem') || lowerCase.includes('problems') || lowerCase.includes('help')){
            this.actionProvider.handleProblems();
        }
    }
}
  
export default MessageParser;