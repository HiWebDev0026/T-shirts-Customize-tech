import {searchMessage} from './keywordsParser'

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCase = message.toLowerCase();
        const parsedMessage = searchMessage(lowerCase)
        
        // if(lowerCase.includes('our address')|| lowerCase.includes('address') || lowerCase.includes('adress') || lowerCase.includes('addres')){
        //     this.actionProvider.handleAddress();
        // }
        // if(lowerCase.includes('our opening hours')|| lowerCase.includes('opening hours') || lowerCase.includes('hours') || lowerCase.includes('opening')){
        //     this.actionProvider.handleHours();
        // }
        // if(lowerCase.includes('solving problems')|| lowerCase.includes('problem') || lowerCase.includes('problems') || lowerCase.includes('help')){
        //     this.actionProvider.handleProblems();
        //        }
        if(parsedMessage === "hellows") {
            this.actionProvider.handleHello();
        } else if (parsedMessage === "byes"){
            this.actionProvider.handleBye();
        } else if (parsedMessage === "shirts"){
            this.actionProvider.handleShirts();
        } else if (parsedMessage === "humans") {
            this.actionProvider.handleHumans();
        } else {
            this.actionProvider.handleNotUnderstanding();
        }
    }
}
  
export default MessageParser;