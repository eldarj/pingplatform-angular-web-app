import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TimeUtils} from '../shared/utils/time.utils';

@Injectable({
  providedIn: 'root'
})
export class CountryCodesService {
  private static COUNTRY_CODES_CACHE_EXPIRATION_KEY = 'countryCodesCacheExpirationKey';
  private static COUNTRY_CODES_CACHE_KEY = 'countryCodesCacheKey';
  private static COUNTRY_CODES_ENDPOINT = 'http://localhost:8089/api/country-codes';

  private codes: [] = null;

  constructor(private httpClient: HttpClient) {
  }

  // Returns country codes from in-memory this.codes; or localStorage cache; or makes request to API
  public getCountryCodes(): Observable<any> {
    if (this.codes !== null) {
      return of(this.codes);
    } else {
      const cachedCodes = localStorage.getItem(CountryCodesService.COUNTRY_CODES_CACHE_KEY);
      const expirationTimestamp = Number(localStorage.getItem(CountryCodesService.COUNTRY_CODES_CACHE_EXPIRATION_KEY));

      if (cachedCodes !== null && expirationTimestamp < Date.now()) {
        return of(JSON.parse(localStorage.getItem(CountryCodesService.COUNTRY_CODES_CACHE_KEY)));
      } else {
        return this.loadFromApi();
      }
    }
  }

  private loadFromApi(): Observable<any> {
    return this.httpClient.get(CountryCodesService.COUNTRY_CODES_ENDPOINT).pipe(
      map(
        (codesResponse: any) => {
          const codes = codesResponse.map(code => (
            {...code, labelValue: `${code.dialCode} - ${code.countryName} (${code.isoCode3})`}
          ));

          localStorage.setItem(CountryCodesService.COUNTRY_CODES_CACHE_KEY, JSON.stringify(codes));
          localStorage.setItem(CountryCodesService.COUNTRY_CODES_CACHE_EXPIRATION_KEY,
            String(Date.now() + TimeUtils.DAY_IN_MILLISECONDS));
          this.codes = codes;

          return codes;
        },
        (error) => console.error(error)
      )
    );
  }
}
