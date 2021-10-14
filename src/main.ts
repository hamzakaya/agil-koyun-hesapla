import AgilHesapla from "./agil-hesapla";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <form class="agil-form" id="form">

    <div class="form-item">
      <label for="adet">Ağıl Sayısı</label>
      <input type="number" required name="adet" />
    </div>

    <div class="form-item">
      <label for="kapasite">Ağıl Kapasitesi</label>
      <input type="number" required name="kapasite" />
    </div>

    <div class="form-item">
      <label for="koyunSayisi">Koyun Sayısı</label>
      <input type="number" required name="koyunSayisi" />
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
    const formData = new FormData(form);

    // const data = Object.fromEntries(
    //   Array.from(formData.keys()).map((key) => [key, ~~formData.get(key)])
    // );
    // const agil = new AgilHesapla(data);

    const agil = new AgilHesapla({
      adet: ~~formData.get("adet") || 0,
      kapasite: ~~formData.get("kapasite") || 0,
      koyunSayisi: ~~formData.get("koyunSayisi") || 0,
    });

    sonucDiv.innerHTML = sonucOlustur(agil);
  }) as EventListener);
});

const sonucOlustur = (agil: AgilHesapla) => `
  <div>
      ${
        agil.sonuc.disaridaKalanKoyunSayisi
          ? `<div class="fazlalik">
              Dışarıda Kalan Koyun: ${agil.sonuc.disaridaKalanKoyunSayisi}
            </div>`
          : ""
      }

      <div class="agillar">
        ${Object.values(agil.sonuc.agillar).map(
          (adet) => `<p>${agil.agilDurumu(adet)}</p>`
        )}
      </div>

  </div>
`;
