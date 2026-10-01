import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonMenuButton, IonList, IonItem, IonButtons, IonToolbar, IonIcon, IonTitle, IonContent } from '@ionic/angular';
import { Documento } from '../modelos/documento.modelo';
import { DocumentosService } from '../service/documentos.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  imports: [IonHeader, IonMenuButton, IonList, IonItem, IonButtons, IonToolbar, IonIcon, IonTitle, IonContent, NgxExtendedPdfViewerModule],
})
export class DetalhesPage {

  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private documentosService = inject(DocumentosService)

  public documento: any = ""

  id!: number;

  constructor() {
  }

  ionViewWillEnter() {
    this.obterDocumento()
  }

  obterDocumento() {
    const id = this.actRoute.snapshot.paramMap.get('id'); //Obtem o id

    if (id === null) { //Verifica se veio o id
      console.error('ID não informado');
      alert('ID não informado');
      this.router.navigate([''])
      return;
    }
    
    this.id = Number(id); //Salva o id no atributo this.id
    
    if (Number.isNaN(this.id)) { //Verifica se é número
      console.error('ID inválido:', id);
      this.router.navigate([''])
      alert('ID inválido:' + id);
      return;
    }

    console.log('ID recebido:', this.id);
    console.log("Iniciando requisição...");

    this.documentosService.obterDocumento(this.id).subscribe({
      next: (resultado: Documento) => {
        this.documento = resultado;
        console.log('Requisição concluída');
        console.log(this.documento);
      },
      error: (exception) => {
        console.log("Erro na requisição");
        console.log(exception);
      }
    })
  }

}
