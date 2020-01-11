export class PathUtils {
  public static getNodePath(node: any) {
    let path = '';
    if (node.path !== '') {
      path += node.path + '/';
    }
    path += node.name;
    return path;
  }

  public static getNodePathToParent(node: any) {
    let path = '';
    if (node.path !== '') {
      path += node.path;
    }
    return path;
  }
}
