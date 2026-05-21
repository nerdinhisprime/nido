export var GetKeysStorageArray= () => Object.keys(localStorage).filter(str => !str.includes('__vue'));
