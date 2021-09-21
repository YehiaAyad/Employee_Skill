import { Component, OnInit } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-zero',
  templateUrl: './zero.component.html',
  styleUrls: ['./zero.component.css']
})
export class ZeroComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  mainmenu(){
    this.router.navigateByUrl('/login');
  }

}
