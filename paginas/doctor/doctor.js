const phraseButtons = document.querySelectorAll("[data-phrase]");
const translationOutput = document.querySelector("[data-translation-output]");

phraseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!translationOutput) return;
    translationOutput.textContent = button.dataset.phrase;
  });
});

const patientSearch = document.querySelector("[data-patient-search]");
const patientRows = document.querySelectorAll("[data-patient-row]");

if (patientSearch) {
  patientSearch.addEventListener("input", () => {
    const query = patientSearch.value.trim().toLowerCase();
    patientRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "grid" : "none";
    });
  });
}