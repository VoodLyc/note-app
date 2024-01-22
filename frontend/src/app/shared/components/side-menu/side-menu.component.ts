import { Component } from '@angular/core';
import { MenuItem } from './menu-item/menu-item.model';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [{ label: "Notes", icon: "bx bxs-note", url: ["/notes"] }, { label: "Tags", icon: "bx bxs-purchase-tag", url: ["/tags"] }];

}
