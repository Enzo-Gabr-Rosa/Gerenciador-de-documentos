import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonMenuButton, IonButtons, IonToolbar, IonIcon, IonTitle, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  imports: [IonHeader, IonMenuButton, IonButtons, IonToolbar, IonIcon, IonTitle, IonContent],
})
export class DetalhesPage {

  private route = inject(ActivatedRoute);

  id!: number;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id'); //Obtem o id

    if (id === null) { //Verifica se veio o id
      console.error('ID não informado');
      alert('ID não informado');
      return;
    }

    this.id = Number(id); //Salva o id no atributo this.id

    if (Number.isNaN(this.id)) { //Verifica se é número
      console.error('ID inválido:', id);
      alert('ID inválido:'+id);
      return;
    }

    console.log('ID recebido:', this.id);
  }

}
