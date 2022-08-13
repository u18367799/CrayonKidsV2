import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { MenuItem } from 'src/app/shared/menu-item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-menu-item-description',
  templateUrl: './add-menu-item-description.component.html',
  styleUrls: ['./add-menu-item-description.component.css']
})
export class AddMenuItemDescriptionComponent implements OnInit {

  menuitemData: MenuItem
  menuitemList: MenuItem[];
  addUpdate;
  menuitemForm: FormGroup;

  constructor(private menuitemService: MenuItemService, private router: Router) { }
 
  ngOnInit(): void {
    this.initialiseForm()
    this.menuitemForm = new FormGroup({  
      Menu_Item_Description: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]),     
    }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.menuitemForm.controls[controlName].hasError(errorName);
  }

  initialiseForm() {
    this.menuitemData = {
      Menu_Item_ID: 0,
      Menu_Item_Description: '',
    };
    this.menuitemList = [];
    this.addUpdate = 'Add menu item';
  }

  onSubmit() {
    if (this.menuitemData.Menu_Item_ID === 0) {
      this.menuitemService
        .addMenuItem(this.menuitemData)
        .subscribe((res) => {
          this.initialiseForm(); 
          this.successfullAdd()        
        });
    } else {
      this.menuitemService
        .updateMenuItem(this.menuitemData)
        .subscribe((res) => {
          this.initialiseForm();
        });
    }
  }
  successfullAdd(){  
    Swal.fire(
      'Success!',
      'Added Successfully!',
     
    ).then(res => this.router.navigate(['/menuItemlist']))   
  }

}
