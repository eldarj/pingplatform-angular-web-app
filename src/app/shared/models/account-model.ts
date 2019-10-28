export class AccountModel {
  public id: number;
  public email: string;
  public firstname: string;
  public lastname: string;
  public callingCountryCode: number;
  public phoneNumber: string;
  public dateRegistered: any;
  public token: string;
  public createSession = true;
  public avatarImageUrl: string;
  public coverImageUrl: string;
  public contacts: any;

  constructor() {
  }l

  public username() {
    return this.firstname + '-' + this.lastname;
  }
}
