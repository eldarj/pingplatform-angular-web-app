export class AccountModel {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public callingCountryCode: number;
  public phoneNumber: string;
  public dateRegistered: any;
  public token: string;
  public createSession = true;
  public avatarImageUrl: string;
  public coverImageUrl: string;
  public contacts: any;

  constructor() {
  }

  public username() {
    return this.firstName + '-' + this.lastName;
  }
}
