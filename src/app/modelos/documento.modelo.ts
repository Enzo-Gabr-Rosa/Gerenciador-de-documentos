export interface Documento {
  id: number;
  nome: string;
  criador: string; //Trocar para id do usuario futuramente
  dataCriacao: Date;
  dataApagamento: Date;
  ativo: boolean;
  imageURL: string;
}
