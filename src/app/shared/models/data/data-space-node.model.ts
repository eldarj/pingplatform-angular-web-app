export class DataSpaceNodeModel {
  public name = '';
  public path = '';
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

  public fileObjectUrl = '';

  constructor() {
  }
}
