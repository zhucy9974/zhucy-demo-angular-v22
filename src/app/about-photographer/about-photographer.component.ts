import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-about-photographer',
  imports: [RouterLink, TranslateModule],
  templateUrl: './about-photographer.component.html',
  styleUrls: ['./about-photographer.component.scss'],
})
export class AboutPhotographerComponent {}
