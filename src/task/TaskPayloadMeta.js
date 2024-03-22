
export class TaskPayloadMeta{
    #isValid = false;
    constructor(inMeta){
        this.meta = inMeta;
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
  