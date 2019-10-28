export class ResponseModel<T> {
  constructor(
    public content: T,
    public message: string,
    public messageCode: string,
    public success: boolean
  ) {
  }
}
