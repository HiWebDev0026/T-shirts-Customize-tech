const options = [
    "contact info", "purchase", "purchases", "design", "complaint", "behaivor", "report"
]

const hellows = [
    "hola", "hello", "hi", "que tal", "good morning", "good afternoon", "buen dia", 
    "buenos dias", "good evening"
]

const byes = [
    "bye", "byes", "see you", "adios", "nos vemos", "chau", "chao", "until tomorow"
]

const shirts = [
    "shirt size", "shirt color", "shirt image", "shirt design", "color", "what", "shirt", "shirts", "catalogue"
]

const humans = [
    "human", "human being", "talk to", "human help", "claim"
]

const payments = [
    "mercado", "pago", "discount", "shipping", "amount", "payment"
]

const lists = [options, hellows, byes, shirts, humans, payments]
const keywords = ["options", "hellows", "byes", "shirts", "humans", "payments"]

const checkMessageInList = (wordList, message) => {
    
    for (const word of wordList) {
        if (message.includes(word)) {
            return true
        }
    }
    return false
}

const searchMessage = (message) => {
    for (let ix=0; ix < lists.length; ix++) {
        const list = lists[ix]
        if(checkMessageInList(list, message)) {
            return keywords[ix]
        }
    }
}

module.exports = {
    searchMessage
}