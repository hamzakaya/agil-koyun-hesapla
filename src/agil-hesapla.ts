type PropsType = {
  adet: number;
  kapasite: number;
  koyunSayisi: number;
};

export default class AgilHesapla {
  private adet: number;
  private kapasite: number;
  private koyunSayisi: number;
  protected agillar: Map<number, number>;

  constructor({ adet, kapasite, koyunSayisi }: PropsType) {
    this.adet = adet;
    this.kapasite = kapasite;
    this.koyunSayisi = koyunSayisi;
    this.agillar = new Map();

    this.#agillariOlustur();
    this.#koyunlariYerlestir();
  }

  #agillariOlustur(): void {
    // FOR LOOP
    for (let index = 1; index <= this.adet; index++) {
      this.agillar.set(index, 0);
    }

    // // WHILE LOOP
    // let index = 1;
    // while(index <= this.adet){
    //   this.agillar.set(index, 0);
    //   index++;
    // }

    // // Array Loop
    // Array.from(Array(this.adet).keys())
    //   .map(index => {
    //     this.agillar.set(index+1, 0);
    //   })
  }

  #koyunlariYerlestir(): void {
    let koyun_sayisi = this.koyunSayisi;

    Array.from(this.agillar.keys())
      .reverse()
      .forEach((agil_index) => {
        const adet =
          koyun_sayisi > this.kapasite ? this.kapasite : koyun_sayisi;

        koyun_sayisi -= adet;

        this.agillar.set(agil_index, adet);
      });
  }

  agilDurumu(adet: number): string {
    switch (adet) {
      case 0:
        return "Boş Ağıl";

      case this.kapasite:
        return `<b>Komple Dolu</b> (${adet} Koyun)`;

      default:
        return `(${adet} Koyun)`;
    }
  }

  get sonuc() {
    return {
      agillar: Object.fromEntries(this.agillar.entries()),
      disaridaKalanKoyunSayisi: Math.max(
        0,
        this.koyunSayisi - this.adet * this.kapasite
      ),
    };
  }
}
