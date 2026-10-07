import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonMenuButton,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonContent
} from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Documento } from '../modelos/documento.modelo';
import { DocumentosService } from '../service/documentos.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  imports: [
    IonHeader,
    IonMenuButton,
    IonList,
    IonItem,
    IonButtons,
    IonButton,
    IonToolbar,
    IonIcon,
    IonTitle,
    IonContent,
    NgxExtendedPdfViewerModule,
    DatePipe
  ],
})
export class DetalhesPage {

  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private documentosService = inject(DocumentosService);
  private cdr = inject(ChangeDetectorRef);

  public documento?: Documento;
  public quantidadePaginas?: number;

  protected id!: string;

  constructor() { }

  ionViewWillEnter() {
    this.obterDocumento();
  }

  obterDocumento() {

    const id = this.actRoute.snapshot.paramMap.get('id');

    if (id === null) {
      console.error('ID não informado');
      alert('ID não informado');
      this.router.navigate(['/home']);
      return;
    }

    this.id = id;

    this.documentosService.obterDocumento(this.id).subscribe({

      next: (resultado: Documento) => {

        console.log('Documento recebido:', resultado);

        this.documento = resultado;

        this.cdr.detectChanges();

      },

      error: (exception) => {

        console.error('Erro na requisição');
        console.error(exception);

      }

    });
  }

  pdfCarregado(event: any) {

    console.log('PDF carregado:', event);
    console.log('Quantidade de páginas:', event.pagesCount);

    this.quantidadePaginas = event.pagesCount;

    this.cdr.detectChanges();

  }

  apagarDocumento() {
  console.log(`Deletando documento de id: ${this.id}`);

  this.documentosService.apagarDocumento(this.id).subscribe({
    next: (resultado) => {
      console.log('Documento apagado!');
      console.log(resultado);

      this.router.navigate(['/home']);
    },
    error: (exception) => {
      console.error('Erro ao apagar documento:', exception);
    }
  });
}
}