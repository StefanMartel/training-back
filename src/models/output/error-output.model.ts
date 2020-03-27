export class ErrorOutput{
    errorCode: number;
    errorDescription: string;

    constructor(error: any){
        this.errorCode = error.code;
        this.errorDescription = error.message;
    }

}