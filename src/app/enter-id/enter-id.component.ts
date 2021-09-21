import { Component, OnInit } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';


export interface IEmployee
{
    id:number,
    name:string,
    mail:string
} 


@Component({
  selector: 'app-enter-id',
  templateUrl: 'enter-id.component.html',
  styles: [ 
  ]
})
export class EnterIdComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal) { }
  public flag: boolean = false;
  readonly _url:string="https://localhost:44339/api/employees"
  private errn:any;
  employee!:IEmployee[];  
  
    ngOnInit(): void {
      this.http.get<IEmployee[]>(this._url).subscribe(data => this.employee = data);
    }


 
  mainmenu(){
    this.router.navigateByUrl('/login');
  }
  getname(id:number)
  { 
    var index=this.employee.findIndex(i => i.id === id);
 return index;
  }
  proceed(num2:string){
    var check=this.getname(parseInt(num2))
    console.log(check)
    if(check==-1)
    { this.flag=true;
      }
    else
    { this.flag=false;
      this.router.navigateByUrl('/singleemployee/'+num2+'0'); 
  }

  }

}
