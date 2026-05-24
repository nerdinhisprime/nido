export var GetCreationDate = (key: string) => JSON.parse(localStorage.getItem(key)).taskCreationData;
