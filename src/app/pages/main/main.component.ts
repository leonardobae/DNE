import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../../types/restaurant';
import { Image } from '../../../types/image';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  restaurant_url : String = '/restaurant';
  Disp_data : Restaurant;
  like_flag : boolean = false;
  num : number;

  Main_img : Image;

  get(){
    this.httpService.get()
    .subscribe(data=>{
      this.Disp_data = data.json();
      this.num = data.json().length;
      console.log(this.Disp_data);
      
    },err=>{
      console.log(err);
    });
  }

  get_img(){
    this.httpService.get_img()
    .subscribe(data=>{
      this.Main_img = data.json();
      console.log(data.json());
      
    })
    
  }

  clickLike(){
    if(this.like_flag === false)
      this.like_flag = true;
        else
      this.like_flag = false;
  }

  constructor(private httpService : HttpService) {
    this.get();
    this.get_img();
  }

  ngOnInit() {
  }

}
