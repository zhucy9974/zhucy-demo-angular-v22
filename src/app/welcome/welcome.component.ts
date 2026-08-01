import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [
    CommonModule,FormsModule, TranslateModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  nom = '';
  message = 'Je reprends angular!'
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  changeLanguage(language: string) {
    this.translateService.use(language);
  }

  changerMessage():void{
    this.message = 'Le bouton fonctionne!'
  }
}
