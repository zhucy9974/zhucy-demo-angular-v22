import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  standalone: true,
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.sendCurrentItem('aboutMe');
  }
}
