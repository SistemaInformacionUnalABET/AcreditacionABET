import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-items',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.css']
})
export class DashboardItemsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('token') == null) {
      let link = ['/login'];
      this.router.navigate(link);
    }

  }

}
