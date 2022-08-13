import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { Menu } from '../shared/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  menus: any;
  menu: any;  
  menuData: Menu

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getMenus();
  }
  getMenus(){
    this.menuService.getMenus()
    .then((res) => {(this.menus = res as string[]), console.log(this.menus)});
  }

  deleteMenu(){
    this.menuService.deleteMenu(localStorage['Menu_ID']).subscribe((res) => {
      location.reload()
    })
  }

  setID(id){
    localStorage['Menu_ID'] = id
    this.confirmDelete(id)
  }

  setEditID(id){
    localStorage['Menu_ID'] = id
    this.router.navigate(["/Menu/" +id]);
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
        this.menuService.deleteMenu(id).subscribe((res) => {
          this.deleteMenu()
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

  editMenu(men: Menu) {
    this.menuData = men;
    // this.cusButtonText = 'Update Category';
    
  }

}
