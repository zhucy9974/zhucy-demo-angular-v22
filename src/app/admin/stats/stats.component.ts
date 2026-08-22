import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VisitStats, VisitStatsService } from './visit-stats.service';

@Component({
  standalone: true,
  selector: 'app-stats',
  imports: [CommonModule, TranslateModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats: VisitStats | null = null;
  loading = true;
  error = false;
  trackingExcluded = localStorage.getItem('excludeVisitTracking') === 'true';

  constructor(
    private readonly visitStatsService: VisitStatsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = false;

    this.visitStatsService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.error = true;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  barHeight(count: number): number {
    const maximum = Math.max(...(this.stats?.daily.map((day) => day.count) ?? [0]));
    return maximum === 0 ? 0 : Math.max(8, Math.round((count / maximum) * 100));
  }

  toggleVisitTracking(): void {
    this.trackingExcluded = !this.trackingExcluded;

    if (this.trackingExcluded) {
      localStorage.setItem('excludeVisitTracking', 'true');
      return;
    }

    localStorage.removeItem('excludeVisitTracking');
  }
}
