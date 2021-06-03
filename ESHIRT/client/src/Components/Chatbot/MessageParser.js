import searchMessage from './keywordsParser'

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        if (message.length > 0) {
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
            if(lowerCase.includes('agus')){
                this.actionProvider.handleAgus();
            }
            else if(lowerCase.includes('dani')){
                this.actionProvider.handleDani();
            }
            else if(lowerCase.includes('ger')){
                this.actionProvider.handleGer();
            }
            else if(lowerCase.includes('javi')){
                this.actionProvider.handleJavi();
            }
            else if(lowerCase.includes('lean')){
                this.actionProvider.handleLean();
            }
            else if(lowerCase.includes('ema')){
                this.actionProvider.handleEma();
            }
            else if(lowerCase.includes('toni')){
                this.actionProvider.handleToni();
            }
            else if(lowerCase.includes('fran')){
                this.actionProvider.handleFran();
            }
            else if(lowerCase.includes('eze')){
                this.actionProvider.handleEze();
            }else if(parsedMessage === "hellows") {
                this.actionProvider.handleHello();
            } else if (parsedMessage === "byes"){
                this.actionProvider.handleBye();
            } else if (parsedMessage === "shirts"){
                this.actionProvider.handleShirts();
            } else if (parsedMessage === "humans") {
                this.actionProvider.handleHumans();
            } else if (parsedMessage === "options") {
                this.actionProvider.handleOptions();
            } else if (parsedMessage === "payments") {
                this.actionProvider.handlePurchases();
            } else {
                this.actionProvider.handleNotUnderstanding();
            }
        
        } else {
            this.actionProvider.handleNotUserInput();
        }
    }
}
  
export default MessageParser;