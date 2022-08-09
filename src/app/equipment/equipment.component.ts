import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EquipmentService } from '../services/equipment.service';
import { Equipment } from '../shared/equipment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipment: any;
  equipmentData: Equipment;

  public displayedColumns = ['Equipment Name', 'Purchase Date', 'Update', 'Delete'];
  public dataSource = new MatTableDataSource<Equipment>();

  constructor(private equipmentService: EquipmentService, private router: Router) { }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment()
  {
    this.equipmentService.getEquipment().then((res) => {(this.dataSource.data = res as Equipment[]), console.log(this.dataSource.data)});
  }

  searchEquipment(event: Event) 
  {
    this.dataSource.filter = (event.target as HTMLInputElement).value
  }

  deleteEquipment(){
    this.equipmentService.deleteEquipment(localStorage['Equipment_ID']).subscribe((res) => 
    {
      location.reload()
    })
  }

  getID(id)
  {
    localStorage['Equipment_ID'] = id
    this.confirmDelete(id)
  }

  setEditID(id)
  {
    localStorage['Equipment_ID'] = id
    this.router.navigate(["/Equipment_ID/" +id]);
  }

  editEquipment(equip: Equipment) 
  {
    this.equipmentData = equip;
  }

  confirmDelete(id: number)
  {
    Swal.fire({
      title: 'Are you sure you want to delete this equipment?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed)
      {
        this.equipmentService.deleteEquipment(id).subscribe((res) => {
          this.deleteEquipment()
          Swal.fire(
            'Deleted!',
            'The Equipment has been deleted.',
            'success'
          ).then(res => location.reload())
        }, (error) => {
          console.log(error)
        });
      }
    })
  }

}

