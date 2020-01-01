import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataSpaceService} from '../../services/data-space.service';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-dataspace-page',
  templateUrl: './dataspace-page.component.html',
  styleUrls: ['./dataspace-page.component.scss']
})
export class DataspacePageComponent {
  node: any = {};
  childNodes: any[];

  displayBack = false;

  constructor(private location: Location, private route: ActivatedRoute,
              private dataSpaceService: DataSpaceService,
              private authenticationService: AuthenticationService) {
    let username = route.snapshot.paramMap.get('username');
    const path = route.snapshot.paramMap.get('path');

    if (username === null) {
      this.authenticationService.getCurrentUsername().subscribe(userResult => {
        username = userResult.username;
        console.log(username);
        this.location.go('/dataspace/' + username);
        this.fetchNodes(username);

      }, console.log);

    } else {
      this.fetchNodes(username + '/' + (path ? path : ''));
    }
  }

  back() {
    this.getNodes(this.node.parentNode);
  }

  getNodes(node: any) {
    let path = '';
    if (node.path !== null) {
      path += node.path + '/';
    }
    path += node.name;

    this.location.go('/dataspace/' + path);
    this.fetchNodes(path);
  }

  private fetchNodes(path: string) {
    this.dataSpaceService.getNodes(path).subscribe(result => {
      this.node = result.node;
      this.childNodes = result.childNodes;
      this.displayBack = this.node.path !== null;

    }, console.log);
  }
}
