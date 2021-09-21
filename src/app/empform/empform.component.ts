import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, retry, startWith } from 'rxjs/operators';
import { ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms'
import { not } from '@angular/compiler/src/output/output_ast';

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
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {

  public act:any;
  public c_e:any;
  public myid:any;
  public a_e:any;
  public v_e:any;
  public temp_id:any;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits!: Observable<any[]>;
  mydata:any;
  holder:boolean=true;
  cert_b:boolean=false;
  delete_2:boolean=false;
  public flag: boolean = false;
  public mish: boolean = false;

  readonly _url:string="https://localhost:44339/api/employees"
  readonly _url1:string="https://localhost:44339/api/skills"
   employee!:IEmployee; 
   skills!:ISkill[]; 
   selectedValue=new FormControl();
   flag2=false
   mine!:ISkill2[]
   temp22!:ISkill[];

   num!:number[]
  data!:number[];
  data1!:any[];
  isDataAvailable:boolean = true;
   certificates!:ICertificate[];  
  errorw!:number[];
  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal
    ,private route :ActivatedRoute,private formBuilder : FormBuilder) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.skills.slice()));
     

     }

  ngOnInit():void  {
    this.skills=[];
    this.mydata=[];
    this.data=[];
    this.temp22=[]
    this.mine=[]
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')||'{}');
       this.act = id;});
       this.c_e=this.act%10;
       this.act=this.act/10|0;
       this.a_e=this.act%10;
       this.act=this.act/10|0;
       this.v_e=this.act%10;
       this.myid=this.act/10|0;
       this.http.get<ISkill[]>(this._url1).subscribe(res => {
        this.skills = res; 
this.temp22=res        }
        );  
if(this.c_e==0)
 { this.http.get<IEmployee>(this._url+'/'+this.myid).subscribe(data => this.employee = data);
  this.http.get<ICertificate[]>(this._url+'/'+this.myid+'/certificates').subscribe(res => {
    this.certificates = res;
     this.data= this.certificates.map(t=>t['skillId']);

     //  this.mydata =this.magico();
     //console.log(this.mydata);
    // console.log(this.mydata)
  },);
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('delay_to_get_magic');
    }, 100);
  });
  promise.then(()=>{this.mydata= this.magico();

    
    console.log(this.mydata)});
 }
 else {   this.mydata=[];
  this.isDataAvailable = true
 }

     if(this.c_e==0)
     { this.holder=true;
     }  
     else { this.holder=false;
      this.myid="NEW"
     }    
  }
  
   
  magico()
{ for (let v of this.data)
 {this.mine.push( {id:v,skill_Name:this.getname3(v)})
 var index=this.skills.findIndex(i => i.id === v);
 if (index >= -1) {
  this.skills.splice(index, 1);
}
  
}
 
return  this.mine
}
getname3(id:number)
{ 
  var index=this.skills.findIndex(i => i.id === id);
return this.skills[index].skill_Name;
}

datatize(){
  for (let element of this.mydata)
   {  var index = this.skills.indexOf(element);
    if (index >= -1) {
      this.skills.splice(index, 1);
   }
  }
}

remove(fruit:any): void {
  const index = this.mydata.indexOf(fruit);

  if (index >= 0) {
    this.mydata.splice(index, 1);
   console.log(this.getname55(fruit.id))
    this.skills.push(fruit)
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.skills.slice()));
  }

  console.log(this.mydata)
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.fruitInput.nativeElement.blur();

  console.log(event.option.value)
  var ses=this.getname1(event.option.value) 
  if(!this.getname2(event.option.value))
 { this.mydata.push(this.getname1(event.option.value));
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
this.mish=false
var index = this.skills.indexOf(this.getname1(event.option.value), 0);
    if (index > -1) {
       this.skills.splice(index, 1);}}
else
this.mish=true

  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => fruit ? this._filter(fruit) : this.skills.slice()));
  console.log(this.mydata);


}


private _filter(value: string) {
  const filterValue = value.toLowerCase();

  return this.skills.filter(fruit => fruit.skill_Name.toLowerCase().includes(filterValue));
}

 async back(){
  if(this.c_e==1)
  this.router.navigateByUrl('/employees');
    else if( this.a_e==0)
  this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e);
  else if( this.v_e==0)
  this.router.navigateByUrl('/employees');
  else
  this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e);

 }
 
 cert(){
  this.cert_b = !this.cert_b; 
 }
 getname(id:number)
 { 
   var index=this.certificates.findIndex(i => i.skillId === id);
  if (index==-1)
  return false
  else{ 
    return true}
  }
  getname1(id:number)
  { 
    var index=this.skills.findIndex(i => i.id === id);
 return this.skills[index];
  }

  getname55(id:number)
  { 
    var index=this.temp22.findIndex(i => i.id === id);
 return this.temp22[index];
  }
  getname2(id:number)
  { 
    var index=this.mydata.findIndex((i: { id: number; }) => i.id === id);
    if(index==-1)
    return false;
    else return true;
  }
  open1()
  { this.http.get<ICertificate[]>(this._url+'/'+this.myid+'/certificates').subscribe(res => {
    if (res.length==0) 
   { 
   this.finito()}
   else {
     this.delete_cert()
     this.open1()
   }
  });}





  finito(){
    this.data1=this.mydata.map((t: { [x: string]: any; })=>t['id'])

    this.data1!= this.data1.sort((n1: number,n2: number) => n1 - n2)
   console.log( this.data1)
      for (let element of  this.data1)
    { 
      this.http.post(this._url+'/'+this.myid+'/certificates',
     [{
         "id": element,
     }]).subscribe(data => {console.log(data);});
   }}
  async delete_cert(){
 return await  this.http.delete(this._url + '/' + this.myid + '/certificates').subscribe(res => {
  });      

}
wow()
{console.log(this.mydata)}
  proceed(){
  var name = ((document.getElementById("Password2") as HTMLInputElement).value);
  var mail = ((document.getElementById("Password3") as HTMLInputElement).value);

  if (name.length>=4 && name!=" "&&mail.length>=6 && mail!=" ")
  { if(this.c_e==0)
    {
      this.http.put(this._url+'/'+this.myid,{
        "id":this.myid,"Name": name,"Mail":mail
         
      }).toPromise().then((data:any)=>{console.log(data)});
    if(this.cert_b)
    {
      const someVal = this.http.delete(this._url + '/' + this.myid + '/certificates').subscribe(res => { this.open1()
      });      
    }
    
     // }}
  }
    else if(this.c_e==1)
    { 
    this.http.post(this._url,{"Name": name,"Mail":mail}).toPromise().then((data:any)=>{
      this.temp_id=data.id;
      console.log(data.id);
      if(this.cert_b)
      { this.data1=this.mydata.map((t: { [x: string]: any; })=>t['id'])
      this.data1!=this.data1.sort((n1: number,n2: number) => n1 - n2)
      console.log("dsad")

      console.log(this.data1)
           for (let element of this.data1)
         { 
           this.http.post(this._url+'/'+this.temp_id+'/certificates',
          [{
              "id": element,
          }]).subscribe(data => {console.log(data);});
        
      }}
    
    
    });
   
  this.back()
    }

    //this.back()
    /*
    if(this.c_e==1)
    this.router.navigateByUrl('/employees').then(() => {  window.location.reload(); });
    else if( this.a_e==0)
    this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e).then(() => {  window.location.reload(); });
    else if( this.v_e==0)
    this.router.navigateByUrl('/employees').then(() => {  window.location.reload(); });
    else
    this.router.navigateByUrl('/singleemployee/'+this.myid+this.a_e).then(() => {  window.location.reload(); });
*/
this.flag2=true
   }
   

 }
 
}

