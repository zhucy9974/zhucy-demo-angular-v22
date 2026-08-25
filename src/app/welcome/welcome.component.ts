import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [RouterLink, TranslateModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  readonly professionalVersion = environment.professionalVersion;

  ngOnInit(): void {}
}
