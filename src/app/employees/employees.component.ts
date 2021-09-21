import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { viewClassName } from '@angular/compiler';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';


export interface IEmployee
{
    id:number,
    name:string,
    mail:string
} 

@Component({
  selector: 'app-employees',
  templateUrl: 'employees.component.html',
  styles: [],
})
export class EmployeesComponent implements OnInit {
  closeResult = '';
  expandedElement!: IEmployee | null;
  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal) { }
  columnsToDisplay = ['id', 'name'];
  public employees:any ;
  private current=-1;
  displayedColumns: string[] = ['id', 'name','mail','Extra'];
  dataSource = new MatTableDataSource();
  
  readonly _url:string="https://localhost:44339/api/employees"
  //readonly _url1 :string="/assets/data/allemployees.json";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  applyFilter(event: any) {
   
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.http.get<IEmployee[]>(this._url).subscribe(data => this.dataSource.data = data);
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
back(){
  this.router.navigateByUrl('/admin-choice');

}
view(id:number){
  this.router.navigateByUrl('/singleemployee/'+id+'1');
}
create(){
  this.router.navigateByUrl('/empform/11').then(() => {  window.location.reload(); });
}
edit(id:number){
  this.router.navigateByUrl('/empform/'+id+'010').then(() => {  window.location.reload(); });

}
think(id:number,content:any)
{ this.current=id;
  
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
}
delete(){

this.http.delete(this._url+'/'+this.current).subscribe(data => {console.log(data);});

this.router.navigateByUrl('/employees/').then(() => {  window.location.reload(); });

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
