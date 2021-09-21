import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { FormControl } from '@angular/forms';

export interface ISkill
{
    id:number,
    skill_Name:string,
    certificates:any
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
  templateUrl: './certform.component.html',
  styleUrls: ['./certform.component.css']
})
export class CertformComponent implements OnInit {

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

  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal
    ,private route :ActivatedRoute) { }
  //readonly _url5 :string="/assets/data/allskills.json";
  ngOnInit(): void {
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
 getname(id:number)
 { 
   var index=this.certificates.findIndex(i => i.skillId === id);
  if (index==-1)
  return false
  else{ 
    return true}

 }
 finito(){
   
  this.selectedValue.value!=this.selectedValue.value.sort((n1: number,n2: number) => n1 - n2)
 console.log(this.selectedValue.value)
    for (let element of this.selectedValue.value)
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
  if(this.selectedValue.value===null ||this.selectedValue.value.length===0)
   { //this.http.delete(this._url1+'/'+this.myid+'/certificates').subscribe(data => {console.log(data);});
   this.flag=true
  }
   else
    { 
       this.http.delete(this._url1+'/'+this.myid+'/certificates').subscribe(()=>{this.finito()})
    }
    
}

}

