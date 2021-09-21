import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {empty, Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { templateJitUrl } from '@angular/compiler';
import { trigger,state,style,animate,transition,keyframes,query,stagger } from '@angular/animations';
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
  

  export interface ISkill
  {
      id:number,
      skill_Name:string,
      certificates:any
  }
  

@Component({
  selector: 'app-singleemployee',
  templateUrl: './singleemployee.component.html',
  styleUrls: ['./singleemployee.component.css']
})
export class SingleemployeeComponent implements OnInit {
  closeResult = '';
  it=0;

  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal 
    ,private route :ActivatedRoute) { }
  employee!:IEmployee;  
  skills!:ISkill[]; 

  readonly _url:string="https://localhost:44339/api/employees"
  readonly _url1:string="https://localhost:44339/api/skills"


  //displayedColumns: string[] = ['id', 'skill_name'];
  public myact:any; 
  public myid: any;
  public a_e:any;


  certificates!:ICertificate[];  
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')||'{}');
       this.myact = id;});
       this.a_e=this.myact%10;
       this.myid=this.myact/10|0;

    this.http.get<IEmployee>(this._url+'/'+this.myid).subscribe(data => this.employee = data);

    
     this.http.get<ICertificate[]>(this._url+'/'+this.myid+'/certificates').subscribe(res => {
      this.certificates = res;
    });
    
      this.http.get<ISkill[]>(this._url1).subscribe(res => {
        this.skills = res;      
        }
        );  
     
  }

  getname(id:number)
  { 
    var index=this.skills.findIndex(i => i.id === id);
 return this.skills[index].skill_Name;
  }
    
  columns = [
    {
      columnDef: 'name',
      header: 'Skill Name',
      cell: (element: ICertificate) => `${this.getname(element.skillId)}`
    }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  mainmenu(){
    this.router.navigateByUrl('/login');

  }

 
delete(){
this.http.delete(this._url+'/'+this.myid).subscribe(data => {console.log(data);});
if(this.a_e==0)
this.router.navigateByUrl('/id-entry').then(() => {  window.location.reload(); });
else
this.router.navigateByUrl('/employees').then(() => {  window.location.reload(); });
}
delete1(){

  this.http.delete(this._url+'/'+this.myid+'/certificates').subscribe(data => {console.log(data);});
  let currentUrl = this.router.url;
  this.router.navigateByUrl(currentUrl) .then(() => {  window.location.reload(); });  }

  next(){
    this.router.navigateByUrl('/admin-choice');
  }
  back(){
    if(this.a_e==0)
    this.router.navigateByUrl('/id-entry');
    else
    this.router.navigateByUrl('/employees');
  }
  edit(id:number)
  {  if(this.a_e==0)
    this.router.navigateByUrl('/empform/'+id+'000');
    else
    this.router.navigateByUrl('/empform/'+id+'110');
  }

  add_cert(id:number)
  {  if(this.a_e==0)
    this.router.navigateByUrl('/trial/'+id+'000').then(() => {  window.location.reload(); });
    else
    this.router.navigateByUrl('/trial/'+id+'110').then(() => {  window.location.reload(); });
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  

}
