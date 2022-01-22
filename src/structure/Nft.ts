import { client } from "..";



export class Nft {
  id: string;
  ownerID?: string;
  url: string;
  active = false;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
  }

  static fromID(id: string) {
    const data = client.nft.get(id);

    if (!data) {
      throw new Error(`no nft with id "${id}" found`);
    }

    const nft = new Nft(data.id, data.url);
    Object.assign(nft, data);

    return nft;
  }

  static findByUrl(url: string) {
    const data = client.nft.find(x => x.url === url);
    if (!data) return;

    const nft = new Nft(data.id, data.url);
    Object.assign(nft, data);
    return nft;
  }

  save() {
    client.nft.set(this.id, { ...this });
  }
}
