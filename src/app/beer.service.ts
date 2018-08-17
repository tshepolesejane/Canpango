import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './category';
import { Beer } from './beer';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BeerService {

  private canpangoUrl = 'http://apichallenge.canpango.com';
  

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


    /** GET beers from the server */
    getCategories (): Observable<Category[]> {
      return this.http.get<Category[]>(this.canpangoUrl+"/categories/")
        .pipe(
          tap(beers => this.log('fetched categories')),
          catchError(this.handleError('getCategories', []))
        );
    }

    getBeers (): Observable<Beer[]> {
      return this.http.get<Beer[]>(this.canpangoUrl+"/beers/")
        .pipe(
          tap(beers => this.log('fetched beers')),
          catchError(this.handleError('getBeers', []))
        );
    }

    getBeer(id: number): Observable<Beer> {
      const url = `${this.canpangoUrl+"/beers"}/${id}`;
      return this.http.get<Beer>(url).pipe(
        tap(_ => this.log(`fetched Beer id=${id}`)),
        catchError(this.handleError<Beer>(`getBeer id=${id}`))
      );
    }

    searchBeer(term: string): Observable<Beer[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Beer[]>(`${this.canpangoUrl+"/beers/search"}/?q=${term}`).pipe(
        tap(_ => this.log(`found beers matching "${term}"`)),
        catchError(this.handleError<Beer[]>('searchHeroes', []))
      );
    }

    updateBeer (beer: Beer): Observable<any> {
      return this.http.put(beer.url, beer, httpOptions).pipe(
        tap(_ => this.log(`updated beer id=${beer.ibu}`)),
        catchError(this.handleError<any>('updateBeer'))
      );
    }

    deleteBeer (beer: Beer): Observable<Beer> {
      return this.http.delete<Beer>(beer.url, httpOptions).pipe(
        tap(_ => this.log(`deleted beer id=${beer.ibu}`)),
        catchError(this.handleError<Beer>('deleteBeer'))
      );
    }

    addBeer (beer: Beer): Observable<Beer> {
      return this.http.post<Beer>(this.canpangoUrl+"/beers/", beer, httpOptions).pipe(
        tap((beer: Beer) => this.log(`added Beer w/ id=${beer.ibu}`)),
        catchError(this.handleError<Beer>('addBeer'))
      );
    }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BeerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BeerService: ${message}`);
  }
}
