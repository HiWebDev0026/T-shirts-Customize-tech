export const putHelper = (array, newElement) => {
    return array.map(oldElement => oldElement.id === newElement.id ? newElement : oldElement)
}

export const deleteHelper = (array, deletedId) => {
    return array.filter(oldElement => oldElement.id !== deletedId)
}

export const filterByName = (array, name) => {
    return array.filter(element => element.name === name)
}

export const searchById = (array, id) => {
    const result = array.find(element => element.id === id);
    if (!result) return {};
    return result;
}
