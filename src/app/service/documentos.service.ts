import { inject, Service } from '@angular/core';
import { Documento } from '../modelos/documento.modelo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry } from 'rxjs';

@Service()
export class DocumentosService {
  private documentos: Documento[] = [];
  private http = inject(HttpClient);
  private api = environment.api

  constructor() {
  }

  obterDocumetos() {
    return this.http.get<Documento[]>(this.api + "/documentos");
  }

  apagarDocumento(id: number) {
    return this.http.patch<Documento>(`${this.api}/documentos/${id}`, {
      ativo: false
    })
  }

  obterDocumento(id: number){
    
    return this.http.get<Documento>(`${this.api}/documentos/${id}`)

  }
}
