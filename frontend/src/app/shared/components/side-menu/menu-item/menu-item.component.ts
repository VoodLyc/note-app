import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  @Input() item: MenuItem = { label: "", icon: "" };

}
