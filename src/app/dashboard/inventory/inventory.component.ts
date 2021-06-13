import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Input} from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private cloudinary: Cloudinary) {}
  formDisplay = 0;
  cloudinary_url = 'https://api.cloudinary.com/v1_1/dgjouil2j/upload';
  file:any;
  categoryItems=[];
  imageUploadLoader=0;
  selectedCategory=-1;
  categoryForm:FormGroup;
  itemForm:FormGroup;
  imageForm:FormGroup;
  categoryFormOperation="add";
  itemFormOperation="add";
  @Input() id:any;
  deleteCategoryId:string="";
  deleteItemId:string="";
  editItemId="";
  msg="";
  loading=0;
  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      (params) =>{
        console.log(params);
        this.id = params.id;
      }
    )
    console.log(this.id);
    this.fetchAllItems();
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
      store_id:new FormControl(this.id)
    })
    this.itemForm = new FormGroup({
      productName:new FormControl(null,Validators.required),
      price:new FormControl(null,Validators.required),
      imgUrl:new FormControl(null),
      category_id: new FormControl(null, Validators.required),
      store_id:new FormControl(this.id),
      inStock:new FormControl(false),
    })
    this.imageForm = new FormGroup({
      image : new FormControl(null,Validators.required)
    })
  }
 displayAddCategoryForm(){
   this.formDisplay=1;
    this.categoryFormOperation="add";
  }
  displayEditCategoryForm(name){
    this.categoryFormOperation="edit";
    this.categoryForm.controls['categoryName'].setValue(name);
    this.formDisplay=1;
  }
  displayAddItemForm(){
    this.formDisplay=2;
     this.itemFormOperation="add";
   }
   displayEditItemForm(obj){
     this.itemFormOperation="edit";
     this.itemForm.patchValue(obj);
     this.editItemId=obj._id;
     this.formDisplay=2;
   }

  fetchAllItems(){
    this.loading=1;
    this.http.get('http://localhost:8080/item/'+this.id)
    .subscribe((response:any) => {
      console.log("hihihihihi")
      console.log(response);
      this.categoryItems=response.categoryItems;
      if(this.categoryItems.length>0){
        this.selectedCategory=0;
      }
      this.loading=0;
    })

  }
  addCategory() {
    this.cancel();
    this.loading=1;
    console.log("calling backend");
    console.log(this.categoryForm.value);
    this.http.post('http://localhost:8080/category',this.categoryForm.value)
    .subscribe((response:any) => {
      console.log("added category")
      console.log(response);
      this.myAlert(response.msg);
      this.fetchAllItems();
      this.loading=0;
    })
  }
  editCategory(){
    this.cancel();
    this.loading=1;
    let it=this.categoryItems[this.selectedCategory].id;
    console.log("calling backend");
    console.log(this.categoryForm.value);
    let obj={...this.categoryForm.value,_id:it};
    console.log(obj);
    this.http.put('http://localhost:8080/category',obj)
    .subscribe((response:any) => {
      console.log("edited category")
      console.log(response);
      this.myAlert(response.msg);
      this.fetchAllItems();
      this.loading=0;
    })

  }
  askToDeleteItem(id){
    this.formDisplay=4;
    this.deleteItemId=id;
  }
  askToDeleteCategory(id){
    this.formDisplay=3;
    this.deleteCategoryId=id;
  }
  deleteCategory(){
    this.cancel();
    this.loading=1;
    if(this.deleteCategoryId!=""){
    this.http.delete('http://localhost:8080/category/'+this.deleteCategoryId)
    .subscribe((response:any) => {
      console.log("deleted category")
      console.log(response);
      this.myAlert(response.msg);
      this.selectedCategory=0;
      this.deleteCategoryId="";
      this.fetchAllItems();
      this.loading=0;
    })}
  }
  donotDelete(){
    this.deleteItemId="";
    this.deleteCategoryId="";
    this.cancel();
  }
  cancel() {
    this.formDisplay=0;
  }
  getItems(val) {
    console.log(val);
    this.selectedCategory =val;
  }
  submitCategory(){
    if(this.categoryFormOperation=="add"){
      this.addCategory();
    }else{
      this.editCategory();
    }

  }
  submitItem(){
    if(this.itemFormOperation=="add"){
      this.addItem();
    }else{
      this.editItem();
    }

  }
  deleteItem(){
    this.cancel();
    this.loading=1;
    if(this.deleteItemId!=""){
      console.log("deleting item")
    this.http.delete('http://localhost:8080/item/'+this.deleteItemId)
    .subscribe((response:any) => {
      console.log("deleted category")
      console.log(response);
      this.myAlert(response.msg);
      this.fetchAllItems();
      this.loading=0;
    })}
  }
  editItem(){
    this.loading=1;
    this.cancel();
    let it=this.editItemId;
    console.log("calling backend");
    console.log(this.itemForm.value);
    let obj={...this.itemForm.value,_id:it};
    console.log(obj);
    this.http.put('http://localhost:8080/item',obj)
    .subscribe((response:any) => {
      console.log("edited category")
      console.log(response);
      this.myAlert(response.msg);
      this.fetchAllItems();
      this.loading=0;
    })

  }

  addItem(){
    this.cancel();
    this.loading=1;
  this.itemForm.controls['category_id'].setValue(this.categoryItems[this.selectedCategory].id);
  console.log(this.itemForm.value);
  this.http.post('http://localhost:8080/item/',this.itemForm.value)
  .subscribe((response:any) => {
    console.log("deleted category")
    console.log(response);
    this.myAlert(response.msg);
    this.fetchAllItems();
    this.loading=0;
  })

  }
  myAlert(val){
    console.log(val);
    this.msg=val;
    this.formDisplay=5;
  }
  upload(event){
    this.file = event.target.files[0];
    console.log(this.file);
    this.imageForm.get('image').setValue(this.file);
  }

  uploadImage(){
    this.imageUploadLoader=1;
    console.log(this.imageForm.value);
    let formData = new FormData();
    formData.append('file', this.imageForm.get('image').value);
    formData.append('upload_preset','yk3jnfrh')
    console.log(formData);
    this.http.post('https://api.cloudinary.com/v1_1/dgjouil2j/upload',formData)
    .subscribe((response:any) => {
      console.log(response.url);
      this.itemForm.controls['imgUrl'].setValue(response.url);
      this.imageUploadLoader=0;
    })
  }
}

