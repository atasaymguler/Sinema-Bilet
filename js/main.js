// Elementleri Seçmek
let container = document.querySelector(".container");
let selectMovie = document.querySelector("#selectMovie");
let count = document.querySelector("#count");
let amount = document.querySelector("#amount");
let seats = Array.from(document.querySelectorAll(".seat"));
let buyButton = document.querySelector("#buyButton");
let clearButton = document.querySelector("#clearButton")

runEventListeners();

function runEventListeners() {
  container.addEventListener("click", select);
  selectMovie.addEventListener("change", changeMovie);
  document.addEventListener("DOMContentLoaded", runPageLoaded);
  buyButton.addEventListener("click", buyTicket);
  clearButton.addEventListener("click",clearTicket);
}
function clearTicket(){
    Storagex.clearAll();
    seats.forEach((seat)=>{
        seat.classList.remove("selected");
        seat.classList.remove("full");
    })
    count.textContent = 0;
    amount.textContent = 0;  
    selectMovie.selectedIndex = 0;
}

function runPageLoaded() {
  // Sayfa yenilendiğinde seçili koltukların gitmesini engelleme
  let selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
  let fullSeatsIndex = Storagex.getFullSeatsFromStorage();
  seats.forEach((seat, index) => {
    if (selectedSeatsIndex.includes(index)) {
      seat.classList.add("selected");
    }
  });
  seats.forEach((seat, index) => {
    if (fullSeatsIndex.includes(index)) {
      seat.classList.add("full");
    }
  });

  selectMovie.selectedIndex = Storagex.getSelectedMovieFromStorage();
    calculate();
}

function buyTicket() {
  if (confirm("Satın Almak İstiyor Musunuz ?")) {
    let selectedSeats = getSelectedSeats();
    let selectedSeatsIndex = getSelectedSeatsIndex();
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("full");
    });

    Storagex.addFullSeatToStorage(selectedSeatsIndex);
    Storagex.addSelectedSeatToStorage(getSelectedSeatsIndex());
    calculate();
  }
}

function select(e) {
  let selectedElement = e.target.parentElement;
  // ! contains dom için, array için includes kullanılır.
  if (
    selectedElement.classList.contains("seat") &&
    !selectedElement.classList.contains("full")
  ) {
    // ? Seçilen elementin classları içerisinde seat classı olması gerekiyor ve seçilen elementin classı içerisin de full classının olmaması gerekmektedir.
    selectedElement.classList.toggle("selected");
    calculate();
    saveSelectedSeatsIndexToStorage();
    saveSelectedMovieIndexToStorage();
  }
}

function changeMovie() {
  calculate();
  saveSelectedMovieIndexToStorage();
}

function getSelectedSeats() {
  let selectedList = [...container.querySelectorAll(".selected")];
  return selectedList;
}

function getSelectedSeatsIndex() {
  // Seçilen koltukların index sırasını bulma
  let selectedList = getSelectedSeats();
  let selectedSeatsIndex = selectedList.map((seat) => {
    return seats.indexOf(seat);
  });
  return selectedSeatsIndex;
}

function saveSelectedSeatsIndexToStorage() {
  let selectedSeatsIndex = getSelectedSeatsIndex();
  Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
  // Storagex.addSelectedSeatToStorage(getSelectedSeatsIndex());
}

function saveSelectedMovieIndexToStorage() {
  // Storagex.addSelectedMovieToStorage(selectMovie.options[selectMovie.selectedIndex])
  let selectedMovieIndex = selectMovie.selectedIndex;
  Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function calculate() {
  let selectedList = getSelectedSeats().length;
  // ? let price = selectMovie.options[selectMovie.selectedIndex].value; İki şekilde çekebiliriz değeri
  let price = selectMovie.value;

  count.textContent = selectedList;
  amount.textContent = price * selectedList;
}
