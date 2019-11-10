/**
 * Utils for rendering ahd handling files, file types etc.
 */
import typesMap from './vars/types-map';
import extensions from './vars/extensions';
import icons from './vars/icons';

export class FileTypeUtils {
  static getFileLabel(fileName: string): string {
    if (fileName.includes('.')) {
      const fileExtension = fileName.split('.').pop().toLowerCase();
      const typeDescriptionKey = Object.keys(typesMap)
        .find(desc => desc.includes(fileExtension + ','));

      return typeDescriptionKey ? typesMap[typeDescriptionKey] : fileExtension.toUpperCase();
    }

    return '-';
  }

  static getFileIcon(fileName: string): string {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    return extensions[fileExtension] || icons.file;
  }

  static getBasicType(mimeType: string): string {
    return mimeType.split('/')[0];
  }

  static downloadFile(blob: Blob, name: string) {
    FileTypeUtils.downloadFiles({ blobs: [blob], names: [name]});
  }

  static downloadFiles(files: { blobs: Blob[], names: string[]}): void {
    const domLink = document.createElement('a');
    document.body.appendChild(domLink);
    domLink.style.display = 'none';
    for (let i = 0; i < files.blobs.length; i++) {
      domLink.href = URL.createObjectURL(files.blobs[i]);
      domLink.download = files.names[i];
      domLink.click();
    }
  }
}
