import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../shared/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplier: any;
  supplierData: Supplier;

  public displayedColumns = ['Name', 'Contact No.', 'Email Address', 'Update', 'Delete'];
  public dataSource = new MatTableDataSource<Supplier>();

  constructor(private supplierService: SupplierService, private route: Router) { }

  ngOnInit(): void {
    this.getSupplier();
  }

  getSupplier()
  {
    this.supplierService
    .getSupplier()
    .then((res) => {(this.dataSource.data = res as Supplier[]), console.log(this.dataSource.data)});
  }

  searchSupplier(event: Event) 
  {
    this.dataSource.filter = (event.target as HTMLInputElement).value
  }

  deleteSupplier(){
    this.supplierService.deleteSupplier(localStorage['Supplier_ID']).subscribe((res) => 
    {
      location.reload()
    })
  }

  getID(id)
  {
    localStorage['Supplier_ID'] = id
    this.confirmDelete(id)
  }

  setEditID(id)
  {
    localStorage['Supplier_ID'] = id
    this.route.navigate(["/Supplier_ID/" +id]);
  }

  editSupplier(supp: Supplier) 
  {
    this.supplierData = supp;
  }

  confirmDelete(id: number)
  {
    Swal.fire({
      title: 'Are you sure you want to delete this supplier?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed)
      {
        this.supplierService.deleteSupplier(id).subscribe((res) => {
          this.deleteSupplier()
          Swal.fire(
            'Deleted!',
            'The Supplier has been deleted.',
            'success'
          ).then(res => location.reload())
        }, (error) => {
          console.log(error)
        });
      }
    })
  }
}
