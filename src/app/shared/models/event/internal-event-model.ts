export class InternalEventModel {
  public event: string;
  public data: any;

  constructor(event: string, data: any) {
    this.event = event;
    this.data = data;
  }
}
