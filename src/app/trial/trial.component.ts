import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResourceLoader, ThrowStmt } from '@angular/compiler';
import { FormControl } from '@angular/forms';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { ArrayDataSource } from '@angular/cdk/collections';
import { DxTagBoxModule, DxTemplateModule } from "devextreme-angular";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import ArrayStore from "devextreme/data/array_store";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms'
import {ViewChild} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {  Validators } from '@angular/forms';
import {  HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { ListItem} from "./model";

export interface ISkill
{
    id:number,
    skill_Name:string,
    certificates:any
}
export interface ISkill2
{
    id:number,
    skill_Name:string,
    }
export interface IEmployee
{
    id:number,
    name:string,
    mail:string
} 
export interface ICertificate
{
    id:number,
    employeeId:number,
    skillId:number,
    skill_Name:string

  } 
  

@Component({
  selector: 'app-certform',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {
  dropdownList!: ISkill[];
  dropdownSettings!:IDropdownSettings;
  form!: FormGroup;
mydata:any;
selected:any;

public act:any;
public c_e:any;
public myid:any;
public a_e:any;
public v_e:any;
skills!:ISkill[]; 
employee!:IEmployee; 
certificates!:ICertificate[];  
public flag: boolean = false;


readonly _url:string="https://localhost:44339/api/skills"
readonly _url1:string="https://localhost:44339/api/employees"
selectedValue=new FormControl();

num!:number[]
 data!:number[];
 mine!:ISkill2[]
temp22!:ISkill
constructor(private http:HttpClient,private router: Router,private modalService: NgbModal
  ,private route :ActivatedRoute,private formBuilder : FormBuilder) { }

  ngOnInit(){
    this.mine=[]
    this.skills=[]; 

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')||'{}');
       this.act = id;});
       this.c_e=this.act%10;
       this.act=this.act/10|0;
       this.a_e=this.act%10;
       this.act=this.act/10|0;
       this.v_e=this.act%10;
       this.myid=this.act/10|0;
       
       this.http.get<ISkill[]>(this._url).subscribe(res => {
        this.skills = res;      
        }
        );  
     
        this.http.get<IEmployee>(this._url1+'/'+this.myid).subscribe(data => this.employee = data);
        this.http.get<ICertificate[]>(this._url1+'/'+this.myid+'/certificates').subscribe(res => {
          this.certificates = res;
           this.data= this.certificates.map(t=>t['skillId']);
            this.selectedValue.setValue(this.data);
   
    

        });
        var promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve('delay_to_get_magic');
          }, 100);
        });
        promise.then(()=>{ this.selected =  this.magico()});
        
    this.initForm();
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      "singleSelection": false,
  "defaultOpen": false,
  "idField": "id",
  "textField": "skill_Name",
  "selectAllText": "Select All",
  "unSelectAllText": "UnSelect All",
  "enableCheckAll": true,
  "itemsShowLimit": 10,
  "allowSearchFilter": true,
  "limitSelection": -1
    };
   
  }
  
  initForm(){
    this.form = this.formBuilder.group({
      grocery : ['',[Validators.required]]
    })
   // 
//this.selected = this.mine.map(({ certificates, ...item }) => item);
  }
  


  handleButtonClick(){
  this.mydata=this.getObjectListFromData(this.form.value.grocery.map((item: { id: any; }) => item.id));
console.log(this.mydata.map((t: { [x: string]: any; })=>t['id']))



}
magico()
{ for (let v of this.selectedValue.value)
 {this.mine.push( {id:v,skill_Name:this.getname(v)})
  }
 
return this.mine
}

  onItemSelect($event: any){
    console.log('$event is ', $event); 
  }

  getObjectListFromData(ids:number[]){
    return this.getData().filter(item => ids.includes(item.id))
  }

  getData() : Array<ISkill>{
    return this.skills;
  }

  setDefaultSelection(){
    let item = this.getData()[0];
    this.form.patchValue({
      grocery : [{
        item_id : item.id,
        item_text : item.skill_Name
      },]  
    })
  }

  back(){
    if(this.c_e==1)
    this.router.navigateByUrl('/employees');
    else if( this.a_e==0)
    this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e);
    else if( this.v_e==0)
    this.router.navigateByUrl('/employees');
    else
    this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e);
  
   }
   getname(id:number):string
  { 
    var index=this.skills.findIndex(i => i.id === id);
 return this.skills[index].skill_Name;
  }
  
  
   finito(){
     
    this.data!=this.data.sort((n1: number,n2: number) => n1 - n2)
   console.log(this.data)
      for (let element of this.data)
    { 
      this.http.post(this._url1+'/'+this.myid+'/certificates',
     [{
         "id": element,
     }]).subscribe(data => {console.log(data);});
   }
   if(this.c_e==1)
        this.router.navigateByUrl('/employees').then(() => {  window.location.reload(); });
        else if( this.a_e==0)
        this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e).then(() => {  window.location.reload(); });
        else if( this.v_e==0)
        this.router.navigateByUrl('/employees').then(() => {  window.location.reload(); });
        else
        this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e).then(() => {  window.location.reload(); });
        
  
  }
   
   
   proceed(){
    this.mydata=this.getObjectListFromData(this.form.value.grocery.map((item: { id: any; }) => item.id));
    this.data=this.mydata.map((t: { [x: string]: any; })=>t['id'])
    
    if( this.data===null || this.data.length===0)
     { //this.http.delete(this._url1+'/'+this.myid+'/certificates').subscribe(data => {console.log(data);});
     this.flag=true
    }
     else
      { 
         this.http.delete(this._url1+'/'+this.myid+'/certificates').subscribe(()=>{this.finito()})
      }
      
  }
  
  }
  
  

