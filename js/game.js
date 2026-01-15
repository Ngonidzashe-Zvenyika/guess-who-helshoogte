// --------------------
// Seed handling
// --------------------
function getSeedFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('seed');
}

function generateRandomSeed() {
  return Math.floor(Math.random() * 1000000).toString();
}

let seed = getSeedFromURL() || generateRandomSeed();
$('#seedDisplay').text(seed);

let rng = new Math.seedrandom(seed);

// --------------------
// Images
// --------------------
const allPics = [
  "img/Allen Grootboom.jpg",
  "img/Anco de Koning.jpg",
  "img/Asanda Adam.jpg",
  "img/Asemahle Maseti.jpg",
  "img/Azeem Majiet.jpg",
  "img/Ben Anderson.jpg",
  "img/Benjamin Griffin.jpg",
  "img/Braam van der Westhuizen.jpg",
  "img/Chris Li.jpg",
  "img/Christiaan Mc Donald.jpg",
  "img/Christiaan de Beer Christiaan.jpg",
  "img/Daniel van Zyl-Smit.jpg",
  "img/David Versfeld.jpg",
  "img/Eben Olivier.jpg",
  "img/Francois Le Roux.jpg",
  "img/Francois Viljoen.jpg",
  "img/Gabriel Heitor.jpg",
  "img/Gabriel Van Der Westhuizen.jpg",
  "img/Gideon Kuhn.jpg",
  "img/Gugulethu Jalisa.jpg",
  "img/Hendré Kritzinger.jpg",
  "img/Imi Nkosiyane.jpg",
  "img/Jan-Hendrik van Wyk.jpg",
  "img/Jean Retief.jpg",
  "img/Jean-Pierre le Roux.jpg",
  "img/Jesse.jpg",
  "img/Karel Beyers.jpg",
  "img/Kean Enslin.jpg",
  "img/Keano Samaai.jpg",
  "img/Keegan Ashton Mike.jpg",
  "img/Kyle Coetzee.jpg",
  "img/Languita Mokatse.jpg",
  "img/Lee Rothman.jpg",
  "img/Liander Pottas.jpg",
  "img/Lilitha.jpg",
  "img/Lunathi Mhlahlo.jpg",
  "img/Lwazi Bradley Zwane.jpg",
  "img/Malachi Potgieter.jpg",
  "img/Malcolm Retief.jpg",
  "img/Martin Louw.jpg",
  "img/Mathew Heitor.jpg",
  "img/Matthew Wylie.jpg",
  "img/Nahum Miller.jpg",
  "img/Nathan Roed.jpg",
  "img/Nicholas Nejthardt.jpg",
  "img/Nicolas Nel.jpg",
  "img/Petrus Nel.jpg",
  "img/Ralu van Huyssteen.jpg",
  "img/Robert Ford.jpg",
  "img/Shaun-Lee Remas.jpg",
  "img/Shushil Navsaria.jpg",
  "img/Stefan Prinsloo.jpg",
  "img/Thabiso Manci Thabiso.jpg",
  "img/Tjeerdo Polderman.jpg",
  "img/Xola Lengisi.jpg"
];


let selectedPics = [];
let opponentCharacter = null;
let win = 0;
let loss = 0;

// --------------------
function prettifyName(path) {
  let name = path.split('/').pop().replace('.jpg','');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// --------------------
function displayRandomPhotos() {
  $('#gameboard').empty();

  let shuffled = allPics.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  selectedPics = shuffled.slice(0, 15);
  opponentCharacter = selectedPics[Math.floor(rng() * selectedPics.length)];

  selectedPics.forEach(pic => {
    $('#gameboard').append(`
        <div class="card-container">
        <div class="card"><img src="${pic}"></div>
        <div class="card-name">${prettifyName(pic)}</div>
        </div>
    `);
  });
}

// --------------------
function myCharacter() {
  let remaining = selectedPics.filter(p => p !== opponentCharacter);
  let myPic = remaining[Math.floor(Math.random() * remaining.length)];

  $("#me").html(`<img src="${myPic}">`);
  $("#name").text("You are " + prettifyName(myPic));
}

// --------------------
function setupGame() {
  displayRandomPhotos();
  myCharacter();
  $('#score').text(`${win} - ${loss}`);
}

// --------------------
// Events
// --------------------
$("#gameboard").on('click', '.card', function(){
  $(this).toggleClass("flipped");
});

$('#win').on('click', function(){
  win++;
  $('#customPopup').css('display','flex');
});

$('#loss').on('click', function(){
  loss++;
  $('#customPopup').css('display','flex');
});

$('#yesButton').on('click', function(){
  $('#customPopup').hide();
  setupGame();
});

$('#noButton').on('click', function(){
  $('#customPopup').hide();
});

$('#ref-seed').on('click', function(){
  location.href = window.location.pathname;
});

$('#roomCodeForm').on('submit', function(e){
  e.preventDefault();
  const entered = $('#roomCodeInput').val();
  if (entered) location.href = '?seed=' + entered;
});

// --------------------
$(window).on('load', setupGame);
