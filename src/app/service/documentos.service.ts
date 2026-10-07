import { inject, Injectable } from '@angular/core';
import { Documento } from '../modelos/documento.modelo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private documentos: Documento[] = [];

  private http = inject(HttpClient);

  private api = environment.api;

  constructor() {}

  obterDocumetos() {
    return this.http.get<Documento[]>(
      `${this.api}/documentos`
    );
  }

  obterDocumento(id: string) {
    return this.http.get<Documento>(
      `${this.api}/documentos/${id}`
    );
  }

  adicionarDocumento(documento: Documento) {
    return this.http.post<Documento>(
      `${this.api}/documentos`,
      documento
    );
  }

  apagarDocumento(id: string) {
    return this.http.patch<Documento>(
      `${this.api}/documentos/${id}`,
      {
        ativo: false,
        dataApagamento: new Date()
      }
    );
  }
}