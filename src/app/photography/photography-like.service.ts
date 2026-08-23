import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../app.config.service';

export interface PhotoLikeState {
  count: number;
  liked: boolean;
}

export type PhotoLikeStates = Record<string, PhotoLikeState>;

@Injectable({ providedIn: 'root' })
export class PhotographyLikeService {
  private readonly visitorStorageKey = 'photographyVisitorId';
  private readonly http = inject(HttpClient);
  private readonly visitorId = this.getOrCreateVisitorId();

  getAll(): Observable<PhotoLikeStates> {
    return this.http.get<PhotoLikeStates>(this.apiUrl(), { headers: this.headers() });
  }

  like(photoId: string): Observable<PhotoLikeState> {
    return this.http.put<PhotoLikeState>(`${this.apiUrl()}/${photoId}`, {}, { headers: this.headers() });
  }

  unlike(photoId: string): Observable<PhotoLikeState> {
    return this.http.delete<PhotoLikeState>(`${this.apiUrl()}/${photoId}`, { headers: this.headers() });
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'X-Visitor-Id': this.visitorId });
  }

  private apiUrl(): string {
    return `${AppConfigService.settings.apiUrl}photo-likes`;
  }

  private getOrCreateVisitorId(): string {
    const storedId = localStorage.getItem(this.visitorStorageKey);
    if (storedId) {
      return storedId;
    }

    const visitorId = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(this.visitorStorageKey, visitorId);
    return visitorId;
  }
}
