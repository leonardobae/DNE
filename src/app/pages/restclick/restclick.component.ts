import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU } from '../../../config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-restclick',
  templateUrl: './restclick.component.html',
  styleUrls: ['./restclick.component.css']
})
export class RestclickComponent implements OnInit {

  res_name;
  menu_link;
  img_url;

  constructor(
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) { 
    this.menu_link = MENU;
    console.log(this.menu_link);
    this.getRestaurant();
  }

  ngOnInit() {
  }

  getRestaurant(): void {
    const res = this.route.snapshot.paramMap.get('restaurant');
    this.res_name = res.concat("_menu.PNG");
    console.log(this.res_name);
  }

  getMenuImg() {
    this.img_url = this.menu_link.concat(this.res_name);

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.img_url);
  }

}
