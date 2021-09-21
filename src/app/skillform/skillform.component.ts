import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

export interface ISkill
{
    id:number,
    skill_Name:string,
    certificates:any
}

@Component({
  selector: 'app-skillform',
  templateUrl: './skillform.component.html',
  styleUrls: ['./skillform.component.css']
})
export class SkillformComponent implements OnInit {
  public act:any;
  public c_e:any;
  public myid:any;
  holder:boolean=true;
  prev_name="Skill Name"
  readonly _url:string="https://localhost:44339/api/skills"
  skill!:ISkill
  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal
    ,private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')||'{}');
       this.act = id;});
       this.c_e=this.act%10;
       this.myid=this.act/10|0;
       this.http.get<ISkill>(this._url+'/'+this.myid).subscribe(data => this.skill = data);

     if(this.c_e==0)
     { this.holder=true;
     }  
     else { this.holder=false;
      this.myid="NEW"
     }  

  }
 back(){
  this.router.navigateByUrl('/skills');
 }
 proceed(){
  var name = ((document.getElementById("Password2") as HTMLInputElement).value);
  if (name.length>=1 && name!=" ")
  { if(this.c_e==0)
    {
      this.http.put(this._url+'/'+this.myid,{
        "id":this.myid,
        "skill_Name": name
      }).toPromise().then((data:any)=>{console.log(data)});
    }
    else if(this.c_e==1)
    { 
    this.http.post(this._url,{"skill_Name": name}).toPromise().then((data:any)=>{console.log(data)});

    }
    
    this.router.navigateByUrl('/skills').then(() => {  window.location.reload(); });

   }

 }
}
