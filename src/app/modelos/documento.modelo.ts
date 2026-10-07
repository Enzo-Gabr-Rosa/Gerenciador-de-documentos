export interface Documento {
  id?: string;
  nome: string;
  criador: string; //Trocar para id do usuario futuramente
  dataCriacao: Date;
  dataApagamento: Date | null;
  ativo: boolean;
  arquivoURL: string;
}
