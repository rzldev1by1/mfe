export const disabledCharacterName = (e) => {
    if((e.target.selectionStart == 0) && !(/[a-zA-Z0-9]/g.test(e.key))){
        e.preventDefault();
    }else{
        if(!(/[a-zA-Z0-9 _-]/g.test(e.key))){
            e.preventDefault();
        }
    }
}