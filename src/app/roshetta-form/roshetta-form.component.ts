import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl } from "@angular/forms";

@Component({
  selector: 'app-roshetta-form',
  templateUrl: './roshetta-form.component.html',
  styleUrls: ['./roshetta-form.component.scss']
})
export class RoshettaFormComponent implements OnInit {
  fileData: File = null;
  image;
  roshettaForm = this.fb.group({
    roshettaImage:"",
    roshettaNotes:"",
    schedualCheck:false
  })

  constructor(private fb: FormBuilder) { 
}



  ngOnInit() {
    
  }


  readURL(event: any) {
    
    this.fileData = <File>event.target.files[0];
    this.preview();
    document.getElementById('imageIcon').innerHTML = event.target.files[0].name
  }
  preview() {
    let mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.image = reader.result;
      // this.myForm.patchValue({
      //   image: this.image
      // });
    }
  }


  onsubmit(f){
console.log(f.value);

  }

}
