import AgilHesapla from "./agil-hesapla";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.title = "Ağıl Hesaplama";
  const form = document.querySelector("#form") as HTMLFormElement;
  const sonucDiv = document.querySelector("#sonuc") as HTMLDivElement;
  form.style.display = 'block'


  form.addEventListener("submit", ((e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    const agilHesapla = new AgilHesapla({
      adet: Number(formData.get("adet")),
      kapasite: Number(formData.get("kapasite")),
      koyunSayisi: Number(formData.get("koyunSayisi")),
    });

    sonucDiv.innerHTML = agilHesapla.sonuc;

  }) as EventListener);
  
});


