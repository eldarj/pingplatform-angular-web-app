import {Injectable} from '@angular/core';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbManager {
  private breadcrumbs: Map<string, DataSpaceNodeModel> = new Map();
  private parentNode: DataSpaceNodeModel = undefined;
  private currentNode: DataSpaceNodeModel;

  constructor() {
    this.currentNode = new DataSpaceNodeModel();
    this.currentNode.nodes = [];
  }

  public getPath(): string {
    return this.currentNode.path;
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
    this.parentNode = this.currentNode;
    this.currentNode = directory;
    this.breadcrumbs[directory.name] = directory;
    this.breadcrumbs = new Map(
      [...this.breadcrumbs.values()].map(node => [node.name, node])
    );
  }

  public openBreadcrumb(directoryName: string): void {
    this.currentNode = this.breadcrumbs.get(directoryName);

    const parentIndex: number = [...this.breadcrumbs.keys()]
      .findIndex(breadcrumbName => breadcrumbName === directoryName) - 1;
    if (parentIndex >= 0) {
      this.parentNode = [...this.breadcrumbs.values()][parentIndex];
    }

    this.breadcrumbs = new Map<string, DataSpaceNodeModel>(
      [...this.breadcrumbs.values()].slice(0, parentIndex).map(node => [node.name, node])
    );
  }

  public back(): void {
    this.currentNode = this.parentNode;
  }
}
