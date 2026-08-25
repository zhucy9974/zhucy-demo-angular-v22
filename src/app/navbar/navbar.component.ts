import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UserService } from '../demos/users/user.service';
import { User } from '../demos/users/user.model';
import { Observable, of } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import $ from 'jquery';
import { NavbarService } from './navbar.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData, getLocaleId } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  readonly professionalVersion = environment.professionalVersion;
  readonly homeRoute = environment.professionalVersion ? '/welcome' : '/home';
  @ViewChild('languageDropdown')
  private languageDropdown?: ElementRef<HTMLElement>;

  private readonly router = inject(Router);
  private readonly navbarService = inject(NavbarService);
  private readonly sharedService = inject(SharedService);
  private readonly userService = inject(UserService);
  private readonly translateService = inject(TranslateService);

  @Input() name: string = 'Chongyang1';
  @Output() search: EventEmitter<string> = new EventEmitter();

  languageMenuOpen = false;
  mobileMenuOpen = false;

  loginUserName: string;
  isLogin: boolean = false;
  firstName: string;

  user$: Observable<User>;
  LoginUser: User;

  showMsgDiv: boolean = false;
  msgDivType: string;
  msgDivContent: string;

  ngOnInit() {
    this.sharedService.getFirstName().subscribe((data: string) => {
      this.firstName = data;
    });
    if (this.firstName == null) {
      this.firstName = sessionStorage.getItem('firstName');
    }
    this.sharedService.getShowMsgDiv().subscribe((data: any) => {
      this.showMsgDiv = true;
      this.msgDivType = data['msgType'];
      this.msgDivContent = data['msg'];
      setTimeout(() => {
        this.showMsgDiv = false;
      }, 3000);
    });

    this.navbarService.getCurrentItem().subscribe((itemId: string) => {
      $('.nav-item-tochange').removeClass('active');
      $('#navbar_' + itemId).addClass('active');
    });
  }

  //code laisser pour l'exemple
  /*
  this.user$ =  this.userService.getLoginUser();
  this.sharedService.getLoginStatut().subscribe(value => {
    this.isLogin = value;
  });*/

  changedSearch(value) {
    this.search.emit(value);
  }

  logout() {
    //this.sharedService.sendLoginStatut(false);
    sessionStorage.clear();
    this.firstName = null;
    this.closeMobileMenu();
    this.router.navigate(['']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.languageMenuOpen = false;
  }

  navigateFromMenu(): void {
    this.closeMobileMenu();
    this.closeMsgDiv();
  }

  toggleLanguageMenu(): void {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeLanguageMenuOnOutsideClick(event: MouseEvent): void {
    const dropdownElement = this.languageDropdown?.nativeElement;
    if (!dropdownElement) {
      return;
    }
    const clickedElement = event.target as Node;

    if (!dropdownElement.contains(clickedElement)) {
      this.languageMenuOpen = false;
    }
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.sharedService.sendLocaleChanged(language);
    this.languageMenuOpen = false;
    this.closeMobileMenu();
  }

  activeItem(event) {
    this.showMsgDiv = false;
    $('.nav-item-tochange').removeClass('active');
    $('.nav-item-tochange').each(function (index) {
      if (event.target.innerText == $(this).text()) {
        $(this).addClass('active');
      }
    });
  }

  closeMsgDiv() {
    this.showMsgDiv = false;
  }
}
