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
  "img/alice.jpg","img/bob.jpg","img/charlie.jpg","img/david.jpg",
  "img/emma.jpg","img/fatima.jpg","img/george.jpg","img/hannah.jpg",
  "img/isaac.jpg","img/jade.jpg","img/kyle.jpg","img/leila.jpg",
  "img/michael.jpg","img/nina.jpg","img/oscar.jpg","img/paula.jpg",
  "img/quinn.jpg","img/ryan.jpg","img/sophia.jpg","img/tariq.jpg"
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

$('#roomCodeForm').on('submit', function(e){
  e.preventDefault();
  const entered = $('#roomCodeInput').val();
  if (entered) location.href = '?seed=' + entered;
});

// --------------------
$(window).on('load', setupGame);
