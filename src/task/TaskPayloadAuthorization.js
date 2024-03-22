
export class TaskPayloadAuthorization{
    #isValid = false;

    constructor(inAuthorization){
        this.inAuthorization = inAuthorization;
    }

    isValid(){
        return this.#isValid;
    }

    setValid(flag = true){
        this.#isValid = flag;
    }

    async validate(){
        
    }
}