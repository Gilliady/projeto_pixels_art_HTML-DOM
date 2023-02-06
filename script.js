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

colorList[0].style.backgroundColor = 'black';
colorList[1].style.backgroundColor = 'red';
colorList[2].style.backgroundColor = 'green';
colorList[3].style.backgroundColor = 'blue';
