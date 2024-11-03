import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Srv1Service {

  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>('http://localhost:3031/etudiants')
  }

  postData(studiant:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(studiant);
    console.log(body)
    return this.http.post('http://localhost:3031/addAUser' , body,{'headers':headers})
  }


  deleteData(id: any): Observable<any>{
    return this.http.delete('http://localhost:3031/deleteUser/'+id );
  }
  putData(id: any , studiant: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    return this.http.put('http://localhost:3031/student/'+id ,studiant,{'headers':headers});
  }









  // get operations 
   get(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api')
   }

   getWithParams(valeur1:string , valeur2:string): Observable<any>{
    const params = new HttpParams().set('valeur',valeur1).set('valeur',valeur2);
    return this.http.get<any>('http://localhost:3000/api', {params} )
   }

   getWhitId(id : number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/${id}`)
   }

  // post operations 

  post( data : any , param1:string , param2: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data)
    const params = new HttpParams().set('param1',param1).set('param2',param2)
    return this.http.post<any>('http://localhost:3000/api', body , {headers ,params} )
  }
  // patch operations

  patchWithoutParams(): Observable<any> {
    const data = { name: 'John', age: 30 }; // Example data to update
    return this.http.patch('http://localhost:3000/api', data);
  }












}
