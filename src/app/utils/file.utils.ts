/**
 * Utils for rendering ahd handling files, file types etc.
 */
import {getContentTypes} from './content-types';

export class FileUtils {
  static getTypeDescription(fileName) {
    if (fileName.includes('.')) {
      fileName = fileName.slice(fileName.lastIndexOf('.') + 1);
    }

    const typeDescriptionKey = Object.keys(getContentTypes())
      .find(desc => desc.includes(fileName + ','));

    return typeDescriptionKey ? getContentTypes()[typeDescriptionKey] + ' File' : fileName.toUpperCase();
  }
}
