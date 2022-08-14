import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UploadPopService } from '../services/upload-pop.service';
import { UploadPop } from '../shared/upload-pop';

@Component({
  selector: 'app-upload-pop',
  templateUrl: './upload-pop.component.html',
  styleUrls: ['./upload-pop.component.css']
})
export class UploadPopComponent implements OnInit {

  popData: UploadPop;
  popList: UploadPop[];
  popForm: FormGroup;
  addPopUpdate;

  @Output() onFileSelect = new EventEmitter<File>();

  constructor(private uploadService: UploadPopService, private router: Router) { }

  ngOnInit(): void {
    this.initialiseForm()
    this.popForm = new FormGroup(
      {
        PopFile: new FormControl('', [Validators.required])
      }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.popForm.controls[controlName].hasError(errorName);
  }

  initialiseForm()
  {
    this.popData = {
      Pop_ID: 0,
      filename: '',
      date: '',
    };
    this.popList = [];
    this.addPopUpdate = 'Add Proof of Payment'
  }

  onSubmit()
  {
    if(this.popData.Pop_ID === 0)
    {
      this.uploadService.addPoP(this.popData).subscribe((result) => {
        this.initialiseForm();
        this.successfullyAdded()
      });
    }
    else
    {
      this.uploadService.updatePop(this.popData).subscribe((result) => {
        this.initialiseForm();
      });
    }
  }

  successfullyAdded()
  {
    Swal.fire(
      'Success!',
      'Added Successfully!',
    ).then(res => this.router.navigate(['/uploadPop']))
  }

  selectFile (event : Event) {
    let tgt = event.target as HTMLInputElement;
    if (tgt.files) {
        let file = tgt.files[0];
        this.onFileSelect.emit(file);
    }
  }
}

/*files : FileInfo[] = [];
  currentfilenumber : number = 0;


  onFileSelected(somefile: File) {
    somefile.webkitRelativePath
    let fdate = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    
    const reader = new FileReader();
    var imgSrc : string =  "/assets/imgicon.png";
    reader.onload = (e: any) => {
      imgSrc = e.target.result;
    };
    reader.readAsDataURL(somefile);

    reader.onloadend = () => {
      this.onAddFile(somefile.name, fdate, imgSrc);
    };
  }

  onAddFile(filename: string, filedate: string, imgSrc: string) {
    this.currentfilenumber += 1;
    switch(this.currentfilenumber) {
      case 1: {
        this.files[0] = new FileInfo (filename, filedate, 1, imgSrc);
        break;
      }
      case 2: {
        this.files[1] = new FileInfo (filename, filedate, 2, imgSrc);
        break;
      }
      default: {
        this.currentfilenumber = 0;
        this.onAddFile(filename, filedate, imgSrc);
        break;
      }
    }
  }
  
  @Output() onFileSelect = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {

  }

  //sending select file to parent
  selectFile (event : Event) {
    let tgt = event.target as HTMLInputElement;
    if (tgt.files) {
        let file = tgt.files[0];
        this.onFileSelect.emit(file);
    }
  }
*/