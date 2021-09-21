import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';

 
export interface ISkill
{
    id:number,
    skill_Name:string,
    certificates:any
}


@Component({
  selector: 'app-skills',
  templateUrl: 'skills.component.html',
  styles: [
  ]
})
export class SkillsComponent implements OnInit {
  private current=-1;
  closeResult = '';

  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public skills!: Observable<ISkill[]>;
  readonly _url:string="https://localhost:44339/api/skills"
  displayedColumns: string[] = ['id', 'skill_name','Extra'];
  dataSource = new MatTableDataSource();
  
  get(){
    this.skills=this.http.get<ISkill[]>(this._url);
  }
  
  applyFilter(event: any) {
   
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.http.get<ISkill[]>(this._url).subscribe(data => this.dataSource.data = data);

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
back(){
  this.router.navigateByUrl('/admin-choice');


}
create(){
  this.router.navigateByUrl('/skillform/1');
}
edit(id:number){
  this.router.navigateByUrl('/skillform/'+id+'0');


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
let currentUrl = this.router.url;
/*this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
});*/

this.router.navigateByUrl(currentUrl) .then(() => {  window.location.reload(); });


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



