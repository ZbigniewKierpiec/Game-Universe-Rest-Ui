import { Injectable } from '@angular/core';
import { AddGameRequest } from '../models/add-game-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Games } from '../models/games.model';
import { environment } from '../../environments/environment';
import { UpdateGameRequest } from './../models/update-game-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  addGame(model: AddGameRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/Games`,
      model,

      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  getAllGames(
    query?: string,
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<Games[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    return this.http.get<Games[]>(`${environment.apiBaseUrl}/api/Games`, {
      params: params,
    });
  }

  getGameById(id: string): Observable<Games> {
    return this.http.get<Games>(`${environment.apiBaseUrl}/api/Games/${id}`);
  }

  getGameCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/api/Games/count`);
  }

  updateGame(
    id: string,
    updateGameRequest: UpdateGameRequest
  ): Observable<Games> {
    console.log('To jest z cookie' + this.cookieService.get('Authorization'));
    return this.http.put<Games>(
      `${environment.apiBaseUrl}/api/Games/${id}`,
      updateGameRequest,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  deleteGame(id: string): Observable<Games> {
    return this.http.delete<Games>(
      `${environment.apiBaseUrl}/api/Games/${id}`,

      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }
}
