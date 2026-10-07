import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IonHeader, IonMenuButton, IonButtons, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonContent } from '@ionic/angular';
import { DocumentosService } from '../service/documentos.service';
import { Documento } from '../modelos/documento.modelo';
import { RouterLink } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'; 

import { addIcons } from 'ionicons';
import { expandOutline } from 'ionicons/icons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonMenuButton, IonButtons, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonContent, RouterLink, NgxExtendedPdfViewerModule],
})
export class HomePage {
  private documetosService = inject(DocumentosService);
  private cdr = inject(ChangeDetectorRef)
  protected documentos: Documento[] = [];

  constructor() {
    addIcons({ expandOutline })
    this.obterDocumentosAtivos();
  }

  ionViewWillEnter(){
    this.obterDocumentosAtivos();
  }

  async obterDocumentosAtivos() {
    console.log('Tentativa de requisição');

    this.documetosService.obterDocumetos().subscribe({

      next: async (documentos: any[]) => {
        
        this.documentos = documentos.filter((doc) => doc.ativo == true )
        
        console.log('Requisição concluída');
        console.log(this.documentos);
        
        this.cdr.detectChanges();
      }, 
      error: (exception) => {
        console.error('Erro na requisição:', exception);
      }
    })
  }

  async apagarDocumento(id: string){
    console.log(`Deletando documento de id : ${id}`);
    this.documetosService.apagarDocumento(id).subscribe({
      next: (resultado) => {

        console.log(resultado);
        console.log("Documento apagado");
        this.obterDocumentosAtivos()
      },

      error: (e) => {
        
        console.log(e);
        console.log("Erro ao apagar o documento");
        
      }
    })
    
    
  }


}
