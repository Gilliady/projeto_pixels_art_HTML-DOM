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
    console.log('teste');
    colorObject = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 0; index < colorList.length; index += 1) {
      colorList[index].style.backgroundColor = colorObject[index];
    }
  } else {
    generateNewPalette();
  }
};

window.onload = (event) => {
  loadColors();
};
