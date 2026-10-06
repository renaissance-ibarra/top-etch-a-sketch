const container = document.querySelector(".container");
const reset = document.querySelector("#reset");
const resize = document.querySelector("#resize");
const color = document.querySelector(".color");

function createGrid(size) {
  container.innerHTML = "";
  const cellSize = Math.floor(500 / size);
  container.style.width = `${cellSize * size}px`;
  container.style.height = `${cellSize * size}px`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.addEventListener("mouseover", handleHover);
    container.appendChild(cell);
  }
}

let currentMode = "single";

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    currentMode = e.target.value;
  })
})

function handleHover(e) {
  const cell = e.target;

  if(currentMode ===  "single") {
    cell.style.backgroundColor = "gray";
  } else if (currentMode === "random") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  } else if (currentMode === "shade") {
    let opacity = Number(cell.dataset.opacity) || 0;
    opacity = Math.min(opacity + 0.25, 1);
    cell.dataset.opacity = opacity;
    cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }
}

reset.addEventListener('click', (e) => {
  createGrid(16);
})

function promptForSize() {
  const input = prompt("Enter a grid size (1 - 100):", "16");

  if (input === null) return;

  const size = Number(input);

  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert("Enter a whole number between 1 and 100");
    return;
  }

  createGrid(size);
}

resize.addEventListener('click', promptForSize);

promptForSize();