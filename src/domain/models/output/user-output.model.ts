export class UserOutput{
    login: string;
    mail ?: string;

    constructor(login: string, mail ?: string){
        this.login = login;
        this.mail = mail;
    }

}