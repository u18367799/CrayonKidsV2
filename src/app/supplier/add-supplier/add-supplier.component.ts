import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from 'src/app/shared/supplier';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  supplierData: Supplier;
  supplierList: Supplier[];
  supplierForm: FormGroup;
  addSupplierUpdate;


  constructor(private supplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
    this.initialiseForm()
    this.supplierForm = new FormGroup(
      {
        Name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]),
        Email: new FormControl('', [Validators.required, Validators.email]),
        ContactNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]),
        StreetAddress: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9]+$/)]),
        Address2: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9]+$/)]),
        City: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]),
        Province: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]),
        PostalCode: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]*$/)]),
      }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.supplierForm.controls[controlName].hasError(errorName);
  }

  initialiseForm() 
  {
    this.supplierData = {
      Supplier_ID: 0,
      SupplierName: '',
      Supplier_Phone: '',
      Supplier_Email: '',
      Supplier_Street_Address: '',
      Supplier_Address_2: '',
      Supplier_City: '',
      Supplier_Province: '',
      Supplier_Postal_Code: '',
    };
    this.supplierList = [];
    this.addSupplierUpdate = 'Add Supplier';
  }

  onSubmit()
  {
    if(this.supplierData.Supplier_ID === 0)
    {
      this.supplierService.addSupplier(this.supplierData).subscribe((result) => {
        this.initialiseForm();
        this.successfullyAdded()
      });
    }
    else
    {
      this.supplierService.updateSupplier(this.supplierData).subscribe((result) => {
        this.initialiseForm();
      });
    }
  }

  successfullyAdded()
  {
    Swal.fire(
      'Success!',
      'Added Successfully!',
    ).then(res => this.router.navigate(['/supplierList']))
  }
}
