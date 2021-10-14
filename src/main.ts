import AgilHesapla from "./agil-hesapla";
import "./style.scss";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <form class="agil-form" id="form">

    <div class="form-item">
      <label for="adet">Ağıl Sayısı</label>
      <input type="number" min="0" required name="adet" />
    </div>

    <div class="form-item">
      <label for="kapasite">Ağıl Kapasitesi</label>
      <input type="number" min="0" required name="kapasite" />
    </div>

    <div class="form-item">
      <label for="koyunSayisi">Koyun Sayısı</label>
      <input type="number" min="0" required name="koyunSayisi" />
    </div>
    

    <button type="submit">YERLEŞTİR</button>
  </form>

  <div id="sonuc"></div>
`;

document.addEventListener("DOMContentLoaded", () => {
  document.title = "Ağıl Hesaplama";
  const form = document.querySelector("#form") as HTMLFormElement;
  const sonucDiv = document.querySelector("#sonuc") as HTMLDivElement;
  
  form.addEventListener("submit", ((e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(form) as FormData;

    // const data = Object.fromEntries(
    //   Array.from(formData.keys()).map((key) => [key, ~~formData.get(key)])
    // );
    // const agil = new AgilHesapla(data);

    const agil = new AgilHesapla({
      adet: Number(formData.get("adet")),
      kapasite: Number(formData.get("kapasite")),
      koyunSayisi: Number(formData.get("koyunSayisi")),
    });

    sonucDiv.innerHTML = sonucOlustur(agil);
  }) as EventListener);
});

const sonucOlustur = (agil: AgilHesapla) => `
  <div>
      ${
        agil.sonuc.disaridaKalanKoyunSayisi
          ? `<div class="agillar-fazlalik">
              Dışarıda Kalan Koyun: ${agil.sonuc.disaridaKalanKoyunSayisi}
            </div>`
          : ""
      }

      <div class="agillar">
        ${Object.values(agil.sonuc.agillar)
          .map((adet) => `<div class="agil">${agil.agilDurumu(adet)}</div>`)
          .join("")}
      </div>

  </div>
`;
