import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styles: [ `img:hover {
    cursor: pointer;
}`
  ]
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  empClick(){
    this.router.navigateByUrl('/id-entry');

  }

  adminClick(){
    this.router.navigateByUrl('/admin-choice');

  }

}

