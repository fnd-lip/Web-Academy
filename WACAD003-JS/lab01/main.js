//elementos da página
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText = "Em 2025, a comunidade gamer se reuniu para ver de perto o lançamento do :insertx:. O evento aconteceu em :inserty:, trazendo fãs de todo o país. Durante a apresentação, :insertz:. Bob, que ainda jogava no seu velho notebook, ficou impressionado com o desempenho do :insertx: e prometeu começar a juntar dinheiro para um upgrade.";

const insertX = [
  'Lenovo Legion 9i com refrigeração líquida',
  'ASUS ROG Strix Scar 18 com tela Mini LED',
  'Razer Blade 16 com RTX 4090',
  'Alienware x16 com som espacial',
  'Acer Predator Helios Neo 16 com Intel de 14ª geração',
  'Samsung Galaxy Book Odyssey RTX 4070'
];

const insertY = [
  'um evento secreto da Pichau em Florianópolis',
  'uma final da Liga Brasileira de CS:GO em São Paulo',
  'uma live do Gaules com 2 milhões de espectadores',
  'uma sala gamer futurista em Belo Horizonte',
  'uma cobertura da Arena Gamer na BGS',
  'uma competição surpresa na TwitchCon Brasil'
];

const insertZ = [
  'o notebook rodou Elden Ring com Ray Tracing sem nem ligar os coolers',
  'todos ficaram hipnotizados com os 500Hz da tela',
  'o desempenho foi tão alto que derreteu o adaptador de energia',
  'uma IA integrada começou a dar dicas no jogo sozinha',
  'os LEDs sincronizaram com o clima e começou a chover RGB',
  'um benchmark fez o FPS passar de 1000 e o tempo desacelerou'
];


randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':insertx:', xItem); 
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
