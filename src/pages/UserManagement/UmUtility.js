export function writeToLocalStorage (keyName,value){
    
    if(localStorage.getItem(keyName)){
        localStorage.removeItem(keyName);        
    }
    
    localStorage.setItem(keyName,JSON.stringify(value));
}

export function readFromLocalStorage (keyName){
    let result = {};
    if(localStorage.getItem(keyName)){        
        result = JSON.parse(localStorage.getItem(keyName))
    }
    return result;
}

