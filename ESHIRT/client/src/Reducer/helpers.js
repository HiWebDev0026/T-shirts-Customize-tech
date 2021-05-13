export const putHelper = (array, newElement) => {
    return array.map(oldElement => oldElement.id === newElement.id ? newElement : oldElement)
}

export const deleteHelper = (array, deletedId) => {
    return array.filter(oldElement => oldElement.id !== deletedId)
}