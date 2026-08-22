import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../../app.config.service';

export interface DailyVisitCount {
  date: string;
  count: number;
}

export interface VisitStats {
  today: number;
  week: number;
  total: number;
  lastVisit: string | null;
  daily: DailyVisitCount[];
}

@Injectable({ providedIn: 'root' })
export class VisitStatsService {
  private readonly http = inject(HttpClient);

  recordVisit(): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(this.apiUrl('visits'), {});
  }

  getStats(): Observable<VisitStats> {
    return this.http.get<VisitStats>(this.apiUrl('admin/stats'));
  }

  private apiUrl(path: string): string {
    return `${AppConfigService.settings.apiUrl}${path}`;
  }
}
