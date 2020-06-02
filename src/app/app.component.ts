import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Promise';

  constructor(private http: HttpClient) {}

  onObservableLoad() {
    this.http.get('http://jsonplaceholder.typicode.com/todos/1').subscribe(result1 => {
      alert(JSON.stringify(result1));
      this.http.get('http://jsonplaceholder.typicode.com/todos/2').subscribe(result2 => {
        alert(JSON.stringify(result2));
        this.http.get('http://jsonplaceholder.typicode.com/todos/3').subscribe(result3 => {
          alert(JSON.stringify(result3));
        });
      });
    });
  }

  onPromiseLoad() {
    this.http.get('http://jsonplaceholder.typicode.com/todos/1').toPromise().then(result => {
      alert(JSON.stringify(result));
    }).then(() => {
      alert('2');
    }).then(() => {
      alert('3');
    }).then(() => {
      alert('4');
    });
  }

  onPromiseMultipleLoad() {
    const p1 = this.http.get('http://jsonplaceholder.typicode.com/todos/1').toPromise();
    const p2 = this.http.get('http://jsonplaceholder.typicode.com/todos/2').toPromise();
    const p3 = this.http.get('http://jsonplaceholder.typicode.com/todos/3').toPromise();

    Promise.all([p1, p2, p3]).then(results => {
      alert(JSON.stringify(results[0]));
      alert(JSON.stringify(results[1]));
      alert(JSON.stringify(results[2]));
    });
  }

  async onAsyncAwaitLoad() {
    const result1 = await this.http.get('http://jsonplaceholder.typicode.com/todos/1').toPromise();
    alert(JSON.stringify(result1));
    const result2 = await this.http.get('http://jsonplaceholder.typicode.com/todos/2').toPromise();
    alert(JSON.stringify(result2));
    const result3 = await this.http.get('http://jsonplaceholder.typicode.com/todos/3').toPromise();
    alert(JSON.stringify(result3));
  }

}
