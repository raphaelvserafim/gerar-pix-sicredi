import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';

import { InitPix, Cobranca } from './model/PixSicredi';

export class PixSicredi {
  private static readonly urlH = 'https://api-pix-h.sicredi.com.br';
  private static readonly urlP = 'https://api-pix.sicredi.com.br';

  private url: string;
  private client_id: string;
  private client_secret: string;
  private authorization: string;
  private crt_file: string;
  private key_file: string;
  private pass: string;
  private token: string | null = null;

  constructor(dados: InitPix) {
    this.url = dados.producao === 1 ? PixSicredi.urlP : PixSicredi.urlH;
    this.client_id = dados.client_id;
    this.client_secret = dados.client_secret;
    this.authorization = Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64');
    this.crt_file = dados.crt_file;
    this.key_file = dados.key_file;
    this.pass = dados.pass;
  }

  private async request(method: string, parth: string, headers: string[], fields?: string): Promise<string> {
    const config: AxiosRequestConfig = {
      method: method,
      url: this.url + parth,
      headers: {
        ...headers.reduce((acc: Record<string, string>, curr: string) => {
          const [key, value] = curr.split(':');
          acc[key.trim()] = value.trim();
          return acc;
        }, {}),
        'User-Agent': 'Mozilla/5.0'
      },
      httpsAgent: {
        key: fs.readFileSync(this.key_file),
        cert: fs.readFileSync(this.crt_file),
        passphrase: this.pass
      }
    };

    if (fields) {
      config.data = fields;
    }

    const response = await axios(config);
    return response.data;
  }

  public async accessToken(): Promise<string> {
    const parth = '/oauth/token?grant_type=client_credentials&scope=cob.write+cob.read+webhook.read+webhook.write';
    const header = [
      'Accept: application/json',
      'Content-Type: application/json',
      `Authorization: Basic ${this.authorization}`
    ];
    const response: any = await this.request('POST', parth, header);
    if (response?.access_token) {
      this.token = response.access_token;
    }

    return response;
  }

  public async updateWebhook(url: string, chave: string): Promise<string> {
    if (!this.token) {
      throw new Error('Token de acesso não está disponível.');
    }
    const parth = `/api/v2/webhook/${chave}`;
    const header = ['Content-Type: application/json', `Authorization: Bearer ${this.token}`];
    const fields = JSON.stringify({ webhookUrl: url });
    return await this.request('PUT', parth, header, fields);
  }

  public async getUrlWebhook(chave: string): Promise<string> {
    if (!this.token) {
      throw new Error('Token de acesso não está disponível.');
    }
    const parth = `/api/v2/webhook/${chave}`;
    const header = [`Authorization: Bearer ${this.token}`];
    return await this.request('GET', parth, header);
  }

  public async deleteUrlWebhook(chave: string): Promise<string> {
    if (!this.token) {
      throw new Error('Token de acesso não está disponível.');
    }
    const parth = `/api/v2/webhook/${chave}`;
    const header = [`Authorization: Bearer ${this.token}`];
    return await this.request('DELETE', parth, header);
  }

  public async criarCobranca(data: Cobranca): Promise<string> {
    if (!this.token) {
      throw new Error('Token de acesso não está disponível.');
    }
    const fields = JSON.stringify(data);
    const parth = '/api/v2/cob';
    const header = ['Content-Type: application/json', `Authorization: Bearer ${this.token}`];
    return await this.request('POST', parth, header, fields);
  }

  public async dadosDeCobranca(id: string): Promise<string> {
    if (!this.token) {
      throw new Error('Token de acesso não está disponível.');
    }
    const parth = `/api/v2/cob/${id}`;
    const header = [`Authorization: Bearer ${this.token}`];
    return await this.request('GET', parth, header);
  }
}
