import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  public user: any;
  public campo!: string;

  constructor(){
    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: ''
    };
  }

  onSubmit(){
    alert("Formulario enviado");
    console.log(this.user);
  }

  hasDadoClick(){
    alert('Has dado click');
  }

  hasSalido(){
    alert('Has salido del campo');
  }

  hasDadoEnter(){
    alert('Has pulsado enter');
  }

}
