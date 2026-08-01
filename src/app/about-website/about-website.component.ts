import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import {SharedModule} from 'src/app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [TranslateModule],
  selector: 'app-about-website',
  templateUrl: './about-website.component.html',
  styleUrls: ['./about-website.component.scss'],
})
export class AboutWebsiteComponent implements OnInit {
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.sendCurrentItem('aboutWebsite');
  }
}
