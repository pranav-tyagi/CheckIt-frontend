import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit,OnDestroy {
  photos = [];
  //  photos=["../../../assets/mall.jpg","../../../assets/mall1.jpg"];
  imageUploadingLoader=0;
  selectedPhoto:any;
  indexOfPhotoToDelete :any;
  user:any;
  imageForm:FormGroup;
  http:HttpClient;
  file:any;
  subscription:Subscription;
  constructor(private dataService:DataService,private cloudinary: Cloudinary,http:HttpClient) {

    this.http = http;
    this.imageForm = new FormGroup({
      image: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.user=this.dataService.user;


    console.log(this.user);
    this.dataService.changeStatusUpdate.subscribe(() => {
      this.user = this.dataService.user;
      console.log(this.user);
    });
  }

  upload(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.imageForm.get('image').setValue(this.file);
  }

  uploadImage() {
    this.imageUploadingLoader=1;
    console.log(this.imageForm.value);
    let formData = new FormData();
    formData.append('file', this.imageForm.get('image').value);
    formData.append('upload_preset', 'yk3jnfrh');
    console.log(formData);

    this.http
      .post('https://api.cloudinary.com/v1_1/dgjouil2j/upload', formData)
      .subscribe((response: any) => {
        console.log(response.url);
        this.user.images.push(response.url);
        this.dataService.editBusinessDetail(this.user);
        this.imageUploadingLoader=0;
      });
  }


  changePhoto(val){
    this.selectedPhoto=val;
    this.indexOfPhotoToDelete = this.photos.findIndex(ele => ele == val);
  }

  deletePhoto(){
    this.user.images.splice(this.indexOfPhotoToDelete,1);
    this.dataService.editBusinessDetail(this.user);
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
}
