import { Component, OnInit } from '@angular/core';
import { UnderConstructionComponent} from 'src/app/shared/under-construction/under-construction.component';

@Component({
  standalone: true,
  imports: [UnderConstructionComponent],
  selector: 'app-userMgt-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
}
