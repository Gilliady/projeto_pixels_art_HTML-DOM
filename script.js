const createElementWithTag = (parentElement, tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  parentElement.appendChild(element);
  return element;
};

const header = document.querySelector('header');
const colorList = [];
for (let index = 0; index < 4; index += 1) {
  const elementCreated = createElementWithTag(
    document.querySelector('#color-palette'),
    'section',
    'color',
  );
  colorList.push(elementCreated);
}
const randomButton = document.createElement('button');

randomButton.id = 'button-random-color';
randomButton.innerHTML = 'Cores aleatórias';
header.appendChild(randomButton);

header.appendChild(document.createElement('br'));
const clearButton = document.createElement('button');
clearButton.id = 'clear-board';
clearButton.innerHTML = 'Limpar';
header.appendChild(clearButton);
colorList[0].style.backgroundColor = 'black';

let colorObject = ['black', '', '', ''];

const generateColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateNewPalette = () => {
  colorObject[1] = generateColor();
  colorObject[2] = generateColor();
  colorObject[3] = generateColor();
  localStorage.setItem('colorPalette', JSON.stringify(colorObject));
  for (let index = 0; index < colorList.length; index += 1) {
    colorList[index].style.backgroundColor = colorObject[index];
  }
};

randomButton.addEventListener('click', generateNewPalette);

const loadColors = () => {
  if (localStorage.getItem('colorPalette')) {
    colorObject = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 0; index < colorList.length; index += 1) {
      colorList[index].style.backgroundColor = colorObject[index];
    }
  } else {
    generateNewPalette();
  }
};

const selectColor = (event) => {
  const selectedColor = document.querySelector('.selected');
  if (selectedColor !== null) {
    selectedColor.classList.remove('selected');
  }
  event.target.classList.add('selected');
};

for (let index = 0; index < colorList.length; index += 1) {
  colorList[index].addEventListener('click', (event) => {
    selectColor(event);
  });
}

const pixels = document.querySelectorAll('.pixel');

const changeColor = (target, selectedColor) => {
  const pixel = target;
  pixel.style.backgroundColor = selectedColor;
};

const saveDrawing = () => {
  const colorPixels = [];
  for (let index = 0; index < pixels.length; index += 1) {
    colorPixels.push(pixels[index].style.backgroundColor);
    localStorage.setItem('pixelBoard', JSON.stringify(colorPixels));
  }
};

const loadDrawing = () => {
  const colors = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < pixels.length; index += 1) {
    changeColor(pixels[index], colors[index]);
  }
};

for (let index = 0; index < pixels.length; index += 1) {
  pixels[index].addEventListener('click', () => {
    const selectedColor = document.querySelector('.selected');
    changeColor(pixels[index], selectedColor.style.backgroundColor);
    saveDrawing();
  });
}
clearButton.addEventListener('click', () => {
  for (let index = 0; index < pixels.length; index += 1) {
    changeColor(pixels[index], 'white');
  }
  saveDrawing();
});

window.onload = () => {
  colorList[0].classList.add('selected');
  loadColors();
  if (localStorage.getItem('pixelBoard') !== null) {
    loadDrawing();
  }
};
