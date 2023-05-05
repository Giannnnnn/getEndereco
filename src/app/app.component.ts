import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public cep: string = '';
  public address: any;
  public showData: boolean = false;
  public formGroup: FormGroup = new FormGroup([]);

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.formGroup.addControl('cep', new FormControl(''));
    this.formGroup.controls['cep'].valueChanges.subscribe((value) => {
      this.formIsInvalid();
    });
  }

  onSubmit() {
    this.showData = false;
    this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`).subscribe((data: any) => {
      if (data.erro) {
        this._snackBar.open('Não encontrado', 'x');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 2000);
      } else {
        this.address = data;
        this.showData = true;
        this._snackBar.open('Endereço encontrado!', 'x');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 2000);
      }

    }, (error) => {
      this._snackBar.open(error.message, 'x');
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 2000);
    });
  }

  public formIsInvalid(): boolean {
    if (this.cep.length < 8) {
      return true
    } else {
      return false
    }
  }

  public cleanSearch() {
    this.showData = false;
    this.address = null;
    this.cep = '';
    this.formGroup.controls['cep'].setValue('');
  }

}
