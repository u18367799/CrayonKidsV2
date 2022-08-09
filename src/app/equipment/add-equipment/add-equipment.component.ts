import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/shared/equipment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  equipmentData: Equipment;
  equipmentList: Equipment[];
  equipmentForm: FormGroup;
  addEquipmentUpdate;


  constructor(private equipmentService: EquipmentService, private router: Router) { }

  ngOnInit(): void {
    this.initialiseForm()
    this.equipmentForm = new FormGroup(
      {
        Name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]),
        PurchaseDate: new FormControl('', [Validators.required]),
      }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.equipmentForm.controls[controlName].hasError(errorName);
  }

  initialiseForm() 
  {
    this.equipmentData = {
      Equipment_ID: 0,
      Equipment_Name: '',
      Purchase_Date: '',
    };
    this.equipmentList = [];
    this.addEquipmentUpdate = 'Add Equipment';
  }

  onSubmit()
  {
    if(this.equipmentData.Equipment_ID === 0)
    {
      this.equipmentService.addEquipment(this.equipmentData).subscribe((result) => {
        this.initialiseForm();
        this.successfullyAdded()
      });
    }
    else
    {
      this.equipmentService.updateEquipment(this.equipmentData).subscribe((result) => {
        this.initialiseForm();
      });
    }
  }

  successfullyAdded()
  {
    Swal.fire(
      'Success!',
      'Added Successfully!',
    ).then(res => this.router.navigate(['/equipmentList']))
  }

}
