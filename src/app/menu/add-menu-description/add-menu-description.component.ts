import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/shared/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-menu-description',
  templateUrl: './add-menu-description.component.html',
  styleUrls: ['./add-menu-description.component.css']
})
export class AddMenuDescriptionComponent implements OnInit {

  menuData: Menu
  menuList: Menu[];
  addUpdate;
  menuForm: FormGroup;

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.initialiseForm()
    this.menuForm = new FormGroup({  
      MenuDescription: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]),     
    }
    )
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.menuForm.controls[controlName].hasError(errorName);
  }

  initialiseForm() {
    this.menuData = {
      Menu_ID: 0,
      MenuDescription: '',
    };
    this.menuList = [];
    this.addUpdate = 'Add menu';
  }

  onSubmit() {
    if (this.menuData.Menu_ID === 0) {
      this.menuService
        .addMenu(this.menuData)
        .subscribe((res) => {
          this.initialiseForm(); 
          this.successfullAdd()        
        });
    } else {
      this.menuService
        .updateMenu(this.menuData)
        .subscribe((res) => {
          this.initialiseForm();
        });
    }

  }

  successfullAdd(){  
    Swal.fire(
      'Success!',
      'Added Successfully!',
     
    ).then(res => this.router.navigate(['/menulist']))   
  }

}
 