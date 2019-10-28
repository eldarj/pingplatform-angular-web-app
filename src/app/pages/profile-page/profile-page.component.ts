import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private username: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.username = params.username);
  }

  ngOnInit() {
  }

}
