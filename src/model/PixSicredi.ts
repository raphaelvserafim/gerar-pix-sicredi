export interface InitPix {
  producao: number;
  client_id: string;
  client_secret: string;
  crt_file: string;
  key_file: string;
  pass: string;
}

export interface Cobranca {
  calendario: {
    dataDeVencimento: string;
    validadeAposVencimento: number;
  };
  valor: {
    original: number;
    modalidadeAlteracao: number;
  };
  chave: string;
  solicitacaoPagador: string;
  infoAdicionais: {
    nome: string;
    valor: string | number;
  }[];
}