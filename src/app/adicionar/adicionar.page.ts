import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Documento } from '../modelos/documento.modelo';
import { DocumentosService } from '../service/documentos.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class AdicionarPage {

  private documentosService = inject(DocumentosService);
  private http = inject(HttpClient);
  private router = inject(Router);

  @ViewChild('arquivoInput') arquivoInput!: ElementRef<HTMLInputElement>;

  protected arquivo: File | null = null;
  protected nome: string = "";
  protected criador: string = "";

  constructor() { }

  selecionarPDF(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.arquivo = input.files[0];

    console.log(this.arquivo);
    console.log(this.arquivo.name);
    console.log(this.arquivo.type);
    console.log(this.arquivo.size);
  }

  adicionarDocumento() {

    if (!this.nome) {
      console.error('Nome não informado');
      return;
    }

    if (!this.criador) {
      console.error('Criador não informado');
      return;
    }

    if (!this.arquivo) {
      console.error('PDF não selecionado');
      return;
    }

    console.log('Tudo certo!');
    console.log(this.nome);
    console.log(this.criador);
    console.log(this.arquivo);


    // 1. Criamos os dados que serão enviados para o servidor
    const formData = new FormData();

    formData.append('arquivo', this.arquivo);


    // 2. Enviamos o PDF para o servidor de upload
    this.http.post<{
      nome: string;
      arquivoURL: string;
    }>(
      'http://localhost:3001/upload',
      formData
    ).subscribe({

      next: (resposta) => {

        console.log('PDF enviado!');
        console.log(resposta);


        // 3. Agora temos a URL real do PDF
        const documento: Documento = {

          nome: this.nome,

          criador: this.criador,

          dataCriacao: new Date(),

          dataApagamento: null,

          ativo: true,

          arquivoURL: resposta.arquivoURL
        };


        // 4. Salvamos o Documento no json-server
        this.documentosService.adicionarDocumento(documento).subscribe({

          next: (resultado) => {

            console.log('Documento salvo!');
            console.log(resultado);

            // 5. Limpamos os campos
            this.nome = "";
            this.criador = "";
            this.arquivo = null;

            // 6. Limpamos o input do arquivo
            this.arquivoInput.nativeElement.value = '';

            // 7. Voltamos para a Home
            this.router.navigate(['/home']);
          },

          error: (exception) => {
            console.error('Erro ao salvar documento:', exception);
          }

        });

      },

      error: (exception) => {
        console.error('Erro ao enviar PDF:', exception);
      }

    });
  }
}