class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    /*----------------------------Options-------------------------------- */
    handleContactInfo = ()=>{
        const message = this.createChatBotMessage('What do you want know?', {widget: 'contactInfo'});
        this.addMessageToState(message);
    }
    handlePurchases = ()=>{
        const message = this.createChatBotMessage('What do you want know?', {widget: 'purchases'});
        this.addMessageToState(message);
    }
    handleDesigns = ()=>{
        const message = this.createChatBotMessage('What do you want know?', {widget: 'designs'});
        this.addMessageToState(message);
    }
    handleComplaints = ()=>{
        const message = this.createChatBotMessage("We're so sorry, how can we help?", {widget: 'complaints'});
        this.addMessageToState(message);
    }
    handleReport = ()=>{
        const message = this.createChatBotMessage('We strive to prevent this kind of behavior, what would you like to report',
        {widget: 'report'});
        this.addMessageToState(message);
    }


    /*---------------------------Contact Info----------------------------------- */
    handleAddress = ()=>{
        const message = this.createChatBotMessage('Great! Our address is Fake Street 123, dept. 8');
        this.addMessageToState(message);
    }

    handleHours = ()=>{
        const message = this.createChatBotMessage('Ok!', {widget: 'hours'});
        this.addMessageToState(message);
    }

    handlePhone = ()=>{
        const message = this.createChatBotMessage(`Sure! Our Phone number is +541123581321`);
        this.addMessageToState(message);
    }

    handleEmail = ()=>{
        const message = this.createChatBotMessage('Sure! Our E-mail is contact@eshirt.com');
        this.addMessageToState(message);
    }

    /*--------------------------- Purchases----------------------------------------------- */
    handleAcceptedPayments = ()=>{
        const message = this.createChatBotMessage('As we charge you through MercadoPago, you can use any credit or debit card aveilable at your MercadoPago account' );
        this.addMessageToState(message);
    }

    handleDiscounts = ()=>{
        const message = this.createChatBotMessage('You can find all the discounts below', {widget:'discount'});
        this.addMessageToState(message);
    }

    handleShippingCosts = ()=>{
        const message = this.createChatBotMessage("We're so happy that you chose us that all shipping cost are on us! Enjoy shopping");
        this.addMessageToState(message);
    }

    handleShippingAreas = ()=>{
        const message = this.createChatBotMessage('We are doing shippings to Capital Federal and the rest of the country. At the moment we are not exporting');
        this.addMessageToState(message);
    }

    handleRefunds = ()=>{
        const message = this.createChatBotMessage('We take pride in our product, if for any reason you want to return it, you can do it free of charge, just submit the form below',{widget:'complaints'});
        this.addMessageToState(message);
    }

    handleMaxAmount = ()=>{
        const message = this.createChatBotMessage("As We create our shirts on demand, we have a limited stock, this is why we have limited the amount of shirts per purchase to 10 units, if you want to make a bigger purchase feel free to contact us", {widget:'contactInfo'});
        this.addMessageToState(message);
    }
    
    handleCalculateSize = ()=>{
        const message = this.createChatBotMessage("If your not sure which is your size, check the table below", {widget:'calculateSize'});
        this.addMessageToState(message);
    }

    /*--------------------------- Designs----------------------------------------------- */
    handleAvailableColors = ()=>{
        const message = this.createChatBotMessage("You can choose any of this colors for your shirt, and if you want, you can make your own design", {widget:'colors'});
        this.addMessageToState(message);
    }
    handleShirtMaterials = ()=>{
        const message = this.createChatBotMessage("We look for the quality that's why our shirts are made of 100% Sea Island Cotton, two ply, Super80’s ");
        this.addMessageToState(message);
    }

    handlePrivateDesign = ()=>{
        const message = this.createChatBotMessage("Ok, no problem, just send us a message to contact@eshirt.com with the shirt name and we'll do it for you ");
        this.addMessageToState(message);
    }
    /*--------------------------- Complaints----------------------------------------------- */
    handleAllComplaints = ()=>{
        const message = this.createChatBotMessage("We're sorry, but don´t worry, we'll sort it out. Fill the form below and we'll get on touch soon ", {widget: 'allComplaints'});
        this.addMessageToState(message);
    }
    /*-----------------------------Report----------------------------------------------- */
    handleOffensiveComment = ()=>{
        const message = this.createChatBotMessage("We're commited to stop any kind of offensive behavior, please fill the form below and tell us what happened", {widget: 'allComplaints'});
        this.addMessageToState(message);
    }

    handleOffensiveDesign = ()=>{
        const message = this.createChatBotMessage("We're commited to stop any kind of offensive behavior, please fill the form below and tell us the shirt's name so we can take it down", {widget: 'allComplaints'});
        this.addMessageToState(message);
    }
    /*-----------------------------Eze------------------------------------------------- */
    handleProblems = ()=>{
        const message = this.createChatBotMessage("We're sorry, how can we help? ", {widget: 'problems'});
        this.addMessageToState(message);
    }
    handleNotUnderstanding = ()=>{
        const message = this.createChatBotMessage("I'm sorry, but I can't understand this :( ", {widget: 'understanding'});
        this.addMessageToState(message);
    }
    handleNotUserInput = () => {
        const message = this.createChatBotMessage("Please write some text before sending the message :)");
        this.addMessageToState(message);
    }


    handleHello = () => {
        const message = this.createChatBotMessage("Hi! I'm Shirtbot, let's chat, would you?", {widget: 'hello'})
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
    handleOptions = () => {
        const message = this.createChatBotMessage("Maybe this options can help you!", {widget: 'options'})
        this.addMessageToState(message);
    }
    /*-----------------------------------------------Easter Eggs------------------------------------------------- */
    handleAgus = () => {
        const message = this.createChatBotMessage("We hope you get to work here some day", {widget: 'agus'})
        this.addMessageToState(message);
    }
    handleDani = () => {
        const message = this.createChatBotMessage("Here is a nice cat for you, there are more, just follow the link", {widget: 'dani'})
        this.addMessageToState(message);
    }
    handleGer = () => {
        const message = this.createChatBotMessage("Hope you like this book", {widget: 'ger'})
        this.addMessageToState(message);
    }
    handleJavi = () => {
        const message = this.createChatBotMessage("I just love her...", {widget: 'javi'})
        this.addMessageToState(message);
    }
    handleLean = () => {
        const message = this.createChatBotMessage("New vegan recepes for you!", {widget: 'lean'})
        this.addMessageToState(message);
    }
    handleEma = () => {
        const message = this.createChatBotMessage("Hope you get to work with them soon", {widget: 'ema'})
        this.addMessageToState(message);
    }
    handleEze = () => {
        const message = this.createChatBotMessage("And the price for the best 'Traper' goes to Eze!", {widget: 'eze'})
        this.addMessageToState(message);
    }
    handleToni = () => {
        const message = this.createChatBotMessage("Here you have 3 recomended photographers, check the out", {widget: 'toni'})
        this.addMessageToState(message);
    }
    handleFran = () => {
        const message = this.createChatBotMessage("Quilotoa is a beautiful place to go, and to make it easier, we pick a hotel for you, click the image to see it", {widget: 'fran'})
        this.addMessageToState(message);
    }

    /*---------------------------------------------------------------------------------------------------------- */


    addMessageToState = (messages) => {
        this.setState((state) => ({
            ...state,
            messages: [...state.messages, messages],
        }));
    }

}
  
export default ActionProvider;