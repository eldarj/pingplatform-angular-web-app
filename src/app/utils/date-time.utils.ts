/**
 * Utils for transforming and checking date-time variables
 */
export class DateTimeUtils {
  /**
   * Returns isoDate in human readable format
   * @param isoDate - ISO format date
   */
  public static formatISODate(isoDate): string {
    if (!DateTimeUtils.isISOFormat(isoDate)) {
      return isoDate;
    }

    const dt = new Date(isoDate);
    return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}`;
  }

  /**
   * Checks whether dateString is in ISO format
   * @param dateString ISO format date
   */
  public static isISOFormat = (dateString): boolean => {
    return dateString.includes('T');
  }
}
