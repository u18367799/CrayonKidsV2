import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '../shared/menu-item';
import { MenuItemService } from '../services/menu-item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  // Menu_Item_Description
  menuitems: any;
  menuitem: any;  
  menuitemData: MenuItem
  constructor(private menuitemService: MenuItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getMenuItems();
  }
  getMenuItems(){
    this.menuitemService.getMenuItems()
    .then((res) => {(this.menuitems = res as string[]), console.log(this.menuitems)});
  }

  deleteMenuItem(){
    this.menuitemService.deleteMenuItem(localStorage['Menu_Item_ID']).subscribe((res) => {
      location.reload()
    })
  }

  setID(id){
    localStorage['Menu_Item_ID'] = id
    this.confirmDelete(id)
  }

  setEditID(id){
    localStorage['Menu_Item_ID'] = id
    this.router.navigate(["/MenuItem/" +id]);
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuitemService.deleteMenuItem(id).subscribe((res) => {
          this.deleteMenuItem()
          Swal.fire(
            'Deleted!',
            'The record has been deleted.',
            'success'
          ).then(res => location.reload())
        },
        (error) => {

          console.log(error)
        });
      }
    })
  }

  editMenuItem(men: MenuItem) {
    this.menuitemData = men;
    // this.cusButtonText = 'Update Category';
    
  }

}
