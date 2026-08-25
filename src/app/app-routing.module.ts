import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UsersComponent } from "./demos/users/users.component";
import { Page404Component } from "./page404/page404.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutWebsiteComponent } from './about-website/about-website.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { DemosComponent } from './demos/demos.component';
import { PhotographyComponent } from './photography/photography.component';
import { StatsComponent } from './admin/stats/stats.component';
import { authGuard } from './shared/auth.guard';
import { environment } from '../environments/environment';

const publicRoutes: Routes = [
  {
    path: 'photography',
    component: PhotographyComponent
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: environment.professionalVersion ? 'welcome' : 'home',
    component: WelcomeComponent
  }
];

const professionalRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'demos',
    component: DemosComponent
  },
  {
    path: 'admin/stats',
    component: StatsComponent,
    canActivate: [authGuard]
  }, {
    path: 'aboutWebsite',
    component: AboutWebsiteComponent
  },{
    path: 'aboutMe',
    component: AboutMeComponent
  }
];

const personalRoutes: Routes = [
  {
    path: 'about-photographer',
    loadComponent: () => import('./about-photographer/about-photographer.component')
      .then(module => module.AboutPhotographerComponent)
  }
];

const routes: Routes = [
  ...publicRoutes,
  ...(environment.professionalVersion ? professionalRoutes : []),
  ...(!environment.professionalVersion ? personalRoutes : []),
  {
    path: '**', //souvent on l'utilise pour 404
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
