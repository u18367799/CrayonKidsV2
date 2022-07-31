import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/shared/employee';

@Component({
  selector: 'app-update-employee-details',
  templateUrl: './update-employee-details.component.html',
  styleUrls: ['./update-employee-details.component.css']
})
export class UpdateEmployeeDetailsComponent implements OnInit {  

  employees: any
  employeeData: Employee
  employeeForm: FormGroup;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.employee = this.employeeService.getEmployees(+this.route.snapshot.params['id'])
    // console.log(this.employee)
    this.employeeForm = new FormGroup({
      Name:new FormControl(''),
      surname:new FormControl(''),
      birthDate:new FormControl(''),
      hireDate:new FormControl(''),
      email:new FormControl(''),
      contactNr:new FormControl(''),
      streetAddress:new FormControl(''),
      address2:new FormControl(''),
      province:new FormControl(''),
      city:new FormControl(''),
      postalCode:new FormControl('')
  
    }
    )
    this.getEmployees()
    console.log(this.employees)
  }
  getEmployees(){
    this.employeeService
    .getEmployees()
    .then((res) => {(this.employees = res as string[]), console.log(this.employees)});
  }

  // onSubmit(){
  //   // this.employeeService.addEmployee(this.employeeForms.value) 
  //   this.router.navigate(['/employeelist'])  
  //   }

    editEmployee(emp: Employee) {
      this.employeeData = emp;
      // this.cusButtonText = 'Update Category';
      
    }
    onSubmit() {

        this.employeeService
          .updateEmployee(this.employeeData)
          .subscribe((res) => {
            location.reload()
          });
     
    }
    
}