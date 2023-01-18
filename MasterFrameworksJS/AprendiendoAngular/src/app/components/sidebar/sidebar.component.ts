import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public searchString: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.searchString = '';
    
  }

  goSearch() {
    this._router.navigate(['/buscar', this.searchString]);
  }

}
