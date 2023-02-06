const createElementWithTag = (parentElement, tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  parentElement.appendChild(element);
  return element;
};
const colorPalette = document.createElement('section');

colorPalette.id = 'color-palette';

const header = document.querySelector('header');

header.appendChild(colorPalette);
const colorList = [];
for (let index = 0; index < 4; index += 1) {
  const elementCreated = createElementWithTag(colorPalette, 'section', 'color');
  colorList.push(elementCreated);
}
const randomButton = document.createElement('button');
randomButton.id = 'button-random-color';
randomButton.innerHTML = 'Cores aleatórias';
header.appendChild(randomButton);
colorList[0].style.backgroundColor = 'black';

const generateNewPalette = () => {
  for (let index = 1; index < colorList.length; index += 1) {
    const newColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
    colorList[index].style.backgroundColor = newColor;
  }
};
window.onload = () => { generateNewPalette(); };
randomButton.addEventListener('click', generateNewPalette);
