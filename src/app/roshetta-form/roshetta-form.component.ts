import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddtocartService } from "../addtocart.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-roshetta-form',
  templateUrl: './roshetta-form.component.html',
  styleUrls: ['./roshetta-form.component.scss']
})
export class RoshettaFormComponent implements OnInit {
  imageData: File = null;
  roshettaImage;
  roshettaDtails:object;
  roshettaForm;
  roshettaImageName;
  
  constructor(private fb: FormBuilder, private addtocartService: AddtocartService,
    private router: Router) { 
    this.roshettaForm = this.fb.group({
      roshettaImage:["", [Validators.required, Validators.pattern(/.*\.(gif|jpe?g|bmp|png)$/)]],
      roshettaNotes:"",
      schedualCheck:false,
      schedual: "weekly"
    })
    this.roshettaImageName = 'Upload Roshetta';
    
    /////...... check if user add roshetta and cancel it.....////
    this.addtocartService.roshettaFlag.subscribe(flag =>{
      if(flag){
        this.roshettaImageName = 'Upload Roshetta';
        this.roshettaForm =this.fb.group({
          roshettaImage:["", [Validators.required, Validators.pattern(/.*\.(gif|jpe?g|bmp|png)$/)]],
          roshettaNotes:"",
          schedualCheck:false,
          schedual: "weekly"
        })
      }
    })

    if(sessionStorage.getItem('roshettaDetails')){
      let roshettaDetails = JSON.parse(sessionStorage.getItem('roshettaDetails'))
      this.roshettaForm = this.fb.group({
        roshettaImage: ["", [Validators.pattern(/.*\.(gif|jpe?g|bmp|png)$/)]],
        roshettaNotes: roshettaDetails.roshettaNotes,
        schedualCheck: roshettaDetails.roshettaSchedualCheck,
        schedual: roshettaDetails.roshettaSchedual
      })
      this.roshettaImage = roshettaDetails.roshettaImage ;
      this.roshettaImageName = roshettaDetails.imageName;
    }
}
  ngOnInit() {}

  //////.......load image and convert it to data......///////
  readURL(event: any) {
    this.imageData = <File>event.target.files[0];
    console.log(this.imageData);
    
    this.preview();
    this.roshettaImageName = event.target.files[0].name;
  }
  preview() {
    let mimeType = this.imageData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.imageData);
    reader.onload = () => {
      this.roshettaImage = reader.result;
    }
  }

  changeSchedual(e){
    this.roshettaForm.value.schedual = e.target.value;
  }
  saveRoshetta(form:FormGroup, e){
    if(!form.valid){
      if(form.get('roshettaImage').hasError('required')){
        document.getElementsByClassName("messError")[0].innerHTML = "*Required";
      }
      if(form.get('roshettaImage').hasError('pattern')){
        document.getElementsByClassName("fileError")[0].innerHTML = "*This is not image";
      }
    }else{
      this.roshettaDtails={
        roshettaImage:this.roshettaImage,
        roshettaNotes: form.value.roshettaNotes,
        roshettaSchedualCheck: form.value.schedualCheck
      }
      if(form.value.schedualCheck){
        this.roshettaDtails['roshettaSchedual'] = form.value.schedual;
      }
      sessionStorage.setItem('roshettaDetails', JSON.stringify({...this.roshettaDtails, imageName: this.roshettaImageName}));
      this.addtocartService.setRoshettaDetails(JSON.parse(sessionStorage.getItem('roshettaDetails')))
      this.router.navigate(['/order-summery'])
      e.target.setAttribute('data-dismiss', 'modal');
      
    }    
    }

}
