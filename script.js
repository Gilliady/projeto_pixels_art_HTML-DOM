/* Variáveis e criação de Elementos: */
const header = document.querySelector('header');

const pixelBoard = document.querySelector('#pixel-board');

const randomButton = document.createElement('button');
randomButton.id = 'button-random-color';
randomButton.innerHTML = 'Cores aleatórias';
header.appendChild(randomButton);

header.appendChild(document.createElement('br'));

const clearButton = document.createElement('button');
clearButton.id = 'clear-board';
clearButton.innerHTML = 'Limpar';
header.appendChild(clearButton);

header.appendChild(document.createElement('br'));

const boardSizeInput = document.createElement('input');
const boardSizeButton = document.createElement('button');
boardSizeInput.id = 'board-size';
boardSizeButton.id = 'generate-board';
boardSizeButton.innerHTML = 'VQV';
boardSizeInput.type = 'number';
boardSizeInput.min = '1';
boardSizeInput.max = '50';
header.appendChild(boardSizeInput);
header.appendChild(boardSizeButton);

/* Functions e atribuições de eventos: */
const createElementWithTag = (parentElement, tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  parentElement.appendChild(element);
  return element;
};

const colorList = [];
for (let index = 0; index < 4; index += 1) {
  const elementCreated = createElementWithTag(
    document.querySelector('#color-palette'),
    'section',
    'color',
  );
  colorList.push(elementCreated);
}

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

const changeColor = (target, selectedColor) => {
  const pixel = target;
  pixel.style.backgroundColor = selectedColor;
};

const saveDrawing = () => {
  const colorPixels = [];
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    colorPixels.push(pixels[index].style.backgroundColor);
    localStorage.setItem('pixelBoard', JSON.stringify(colorPixels));
  }
};

const loadDrawing = () => {
  const colors = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    changeColor(pixels[index], colors[index]);
  }
};

const addListenerInPixel = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', () => {
      const selectedColor = document.querySelector('.selected');
      changeColor(pixels[index], selectedColor.style.backgroundColor);
      saveDrawing();
    });
  }
};
addListenerInPixel();
clearButton.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    changeColor(pixels[index], 'white');
  }
  saveDrawing();
});
const createPixelBoard = (number) => {
  for (let index = 0; index < number; index += 1) {
    for (let index2 = 0; index2 < number; index2 += 1) {
      createElementWithTag(pixelBoard, 'section', 'pixel');
    }
    pixelBoard.appendChild(document.createElement('br'));
  }
  localStorage.setItem('boardSize', number);
  addListenerInPixel();
};

if (localStorage.getItem('boardSize') === null) {
  localStorage.setItem('boardSize', 5);
}
const pixelLength = localStorage.getItem('boardSize');
createPixelBoard(pixelLength);

let value;
const clearPixelBoard = () => {
  while (pixelBoard.children.length > 0) {
    pixelBoard.removeChild(pixelBoard.lastElementChild);
  }
  localStorage.removeItem('pixelBoard');
};
boardSizeInput.addEventListener('change', () => {
  value = Number(boardSizeInput.value);
});

const valueCheck = () => boardSizeInput.value !== '';

const updateBoardSize = () => {
  if (value <= 5) {
    clearPixelBoard();
    value = 5;
    createPixelBoard(value);
  } else if (value > 5 && value < 50) {
    clearPixelBoard();
    createPixelBoard(value);
  } else if (value >= 50) {
    clearPixelBoard();
    createPixelBoard(50);
  }
};

boardSizeButton.addEventListener('click', () => {
  if (!valueCheck()) {
    alert('Board inválido!');
  } else {
    updateBoardSize();
  }
});

window.onload = () => {
  colorList[0].classList.add('selected');
  loadColors();
  if (localStorage.getItem('pixelBoard') !== null) {
    loadDrawing();
  }
};
