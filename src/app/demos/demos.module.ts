import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemosComponent } from './demos.component';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { SharedModule } from '../shared/shared.module';
import {RolesComponent} from 'src/app/demos/roles/roles.component';


@NgModule({
  declarations: [DemosComponent],
  exports: [DemosComponent],
  imports: [
    CommonModule,
    UsersModule,
    GroupsModule,
    RolesComponent,
    SharedModule
  ]
})
export class DemosModule { }
