import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-choice',
  templateUrl: 'admin-choice.component.html',
  styles: [
  ]
})
export class AdminChoiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
 
  }

  skillclick(){
    this.router.navigateByUrl('/skills');
  }
  empclick(){
    this.router.navigateByUrl('/employees');

  }
  back(){
    this.router.navigateByUrl('/login');


  }
}
