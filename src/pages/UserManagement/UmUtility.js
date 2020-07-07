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

export function generateUserID(textValue){
    let result = "";

    if (textValue && textValue.length > 2) {
      var anysize = 3;//the size of string
      var charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
      for (var i = 0; i < anysize; i++)
        result += charset[Math.floor(Math.random() * (9))];
    }
    return result;
  }

