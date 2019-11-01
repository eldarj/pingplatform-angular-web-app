/**
 * Utils for rendering ahd handling files, file types etc.
 */
import typesMap from './vars/types-map';
import extensions from './vars/extensions';
import icons from './vars/icons';

export class FileTypeUtils {
  static getFileLabel(fileName) {
    if (fileName.includes('.')) {
      const fileExtension = fileName.split('.').pop().toLowerCase();
      const typeDescriptionKey = Object.keys(typesMap)
        .find(desc => desc.includes(fileExtension + ','));

      return typeDescriptionKey ? typesMap[typeDescriptionKey] : fileExtension.toUpperCase();
    }

    return '-';
  }

  static getFileIcon(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    return extensions[fileExtension] || icons.file;
  }
}
