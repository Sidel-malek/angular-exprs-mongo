import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Srv1Service } from './srv1.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule ,HttpClientModule, RouterLink, FormsModule , MatIconModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mongo_exp_angular';
  data!: any[];
  name!: string;
  age: number | undefined;

  newname!: string;
  newage!: number |undefined;

  editIndex: number = -1;
  id!:number;


  constructor(private dataService:Srv1Service){}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data)=>{
        this.data = data ;
        console.log(data)
      },
      (error)=>{
        console.log('Error fetching data:', )
      }

    )  
  }
  
  addStudent() {
    let student={name: this.name , age: this.age}
    console.log(student)
    this.dataService.postData(student)
      .subscribe(data => {
        console.log(data)
        this.ngOnInit();
        this.age = undefined;
        this.name='';
      })      
  }
 

  delete(id:number): void {
    this.dataService.deleteData(id)
            .subscribe(() =>console.log('Delete successful'));
            this.ngOnInit();
  }
  
  toggleEditForm(i: number, id:number): void {
    this.editIndex= i;
    this.id=id;
  }

  editStudent() {
    let student={name: this.newname , age: this.newage}

    console.log(student)
    this.dataService.putData(this.id, student)
      .subscribe(data => {
        console.log(data)
        this.editIndex= -1;
        this.newage=undefined;
        this.newname= '';

        this.ngOnInit();
      })  
         
  }
  

}
