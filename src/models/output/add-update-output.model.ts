export class AddUpdateOutput{
    code: number;
    message: string;

    constructor(message: any){
        this.code= message.code;
        this.message= message.message;
    }
}