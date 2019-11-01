export class DataSpaceNodeModel {
  public name: string;
  public path: string;
  public url: string;

  public ownerFirstname: string;
  public ownerLastname: string;

  public fileSizeInKB: number;
  public private: boolean | string;
  public nodeType: string;
  public mimeType: string;

  public creationTime: string;
  public lastModifiedTime: string;

  public nodes: DataSpaceNodeModel[];

  public ownerName: string;

  constructor() {
  }
}
