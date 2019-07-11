export class ErrorOutput{
    errorCode: string;
    errorDescription: string;

    constructor(error: any){
        this.errorCode = error.code;
        this.errorDescription = error.message;
    }

}