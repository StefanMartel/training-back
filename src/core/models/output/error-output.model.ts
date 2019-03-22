export class ErrorOutput{
    errorCode: string;
    errorDescription: string;

    constructor(errorCode: string, errorDescription: string){
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }

}