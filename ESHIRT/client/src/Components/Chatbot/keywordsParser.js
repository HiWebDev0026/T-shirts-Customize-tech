const hellows = [
    "hola", "hello", "hi", "que tal", "good morning", "good afternoon", "buen dia", 
    "buenos dias", "good evening"
]

const byes = [
    "bye", "byes", "see you", "adios", "nos vemos", "chau", "chao", "until tomorow"
]

const shirts = [
    "shirt size", "shirt color", "shirt image", "shirt design", "color", "what", "shirt", "shirts"
]

const humans = [
    "human", "human being", "talk to", "human help", "claim"
]

const lists = [hellows, byes, shirts, humans]
const keywords = ["hellows", "byes", "shirts", "humans"]

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