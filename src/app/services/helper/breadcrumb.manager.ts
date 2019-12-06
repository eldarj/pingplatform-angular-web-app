import {Injectable} from '@angular/core';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbManager {
  private breadcrumbs: Map<string, DataSpaceNodeModel> = new Map();
  private parentNodeName: string = null;
  private currentNode: DataSpaceNodeModel;

  constructor() {
    this.currentNode = new DataSpaceNodeModel();
    this.currentNode.nodes = [];
  }

  public getPath(): string {
    console.log(this.currentNode);
    const path = this.currentNode.path + this.currentNode.name;
    console.log(this.currentNode.path);
    console.log(path);
    return path;
  }

  public getBreadcrumbs(): Map<string, DataSpaceNodeModel> {
    return this.breadcrumbs;
  }

  public setNodes(nodes: DataSpaceNodeModel[]) {
    this.currentNode.nodes = nodes;
  }

  public getNodes(): DataSpaceNodeModel[] {
    return this.currentNode.nodes;
  }

  public openDirectory(directory: DataSpaceNodeModel): void {
    this.parentNodeName = this.currentNode.name;
    this.currentNode = directory;
    this.breadcrumbs.set(directory.name, directory);
  }

  public openBreadcrumb(directoryName: string): void {
    this.currentNode = this.breadcrumbs.get(directoryName);

    const parentIndex: number = [...this.breadcrumbs.keys()]
      .findIndex(breadcrumbName => breadcrumbName === directoryName) - 1;
    if (parentIndex >= 0) {
      this.parentNodeName = [...this.breadcrumbs.values()][parentIndex].name;
    }

    this.breadcrumbs = new Map<string, DataSpaceNodeModel>(
      [...this.breadcrumbs.values()].slice(0, parentIndex).map(node => [node.name, node])
    );
  }

  public back(): void {
    this.openBreadcrumb(this.parentNodeName);
  }
}
