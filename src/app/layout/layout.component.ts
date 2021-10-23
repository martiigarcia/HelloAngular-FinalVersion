import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../security/service/authentication.service";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title = 'Curso de Angular';

  public isExpanded = false;

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  public logOut() {
    this.authenticationService.logout();
  }
}
