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
  "img/Alec Brink.jpg",
  "img/Alex McIvor.jpg",
  "img/Alexander Bosman.jpg",
  "img/Alexander Sacranie.jpg",
  "img/Alique Jacobs.jpg",
  "img/Andrew Swanepoel.jpg",
  "img/Anru van Wyk.jpg",
  "img/Ben Biehler.jpg",
  "img/Benjamin Love.jpg",
  "img/Brooklyn Mc Clune.jpg",
  "img/Bruce Igilige.jpg",
  "img/Bryndon Spiller.jpg",
  "img/Calla Du Toit.jpg",
  "img/Camdin van Rooyen.jpg",
  "img/Cecil Jr.jpg",
  "img/Christopher du Toit.jpg",
  "img/Cruz Swiegelaar.jpg",
  "img/Curtis A Vries.jpg",
  "img/Daniel de Wet.jpg",
  "img/De la Rey Radley.jpg",
  "img/Dhruv Patel.jpg",
  "img/Franco Jordaan.jpg",
  "img/Grant Weich.jpg",
  "img/Jaco Kriel.jpg",
  "img/Janro Oeschger.jpg",
  "img/Jevad.jpg",
  "img/Johan van Eck.jpg",
  "img/Joshua.jpg",
  "img/Juan Groenewald.jpg",
  "img/Justin Higginson.jpg",
  "img/Kenny Gordon.jpg",
  "img/Kian Bekker.jpg",
  "img/Kian Goliath.jpg",
  "img/Lentsoe Mosupye.jpg",
  "img/Leo Kala.jpg",
  "img/Liam Duvenage (Right).jpg",
  "img/Louw de Bruyn.jpg",
  "img/Luc du Toit.jpg",
  "img/Malan Nortier.jpg",
  "img/Mandre Strydom.jpg",
  "img/Marco Wessels.jpg",
  "img/Marnu van Sandwyk.jpg",
  "img/Marthinus Beyers Brink.jpg",
  "img/Medilongo Hambabi.jpg",
  "img/Michael Pearce.jpg",
  "img/Mikaail Achmat.jpg",
  "img/Mikaeel Sookool.jpg",
  "img/Munyai Maduvha Steven.jpg",
  "img/Murray Minnie.jpg",
  "img/Noah Enyang.jpg",
  "img/Noah Morris.jpg",
  "img/Obonayo Mabombo.jpg",
  "img/Oliver Sales.jpg",
  "img/R-Jay Rinkwest.jpg",
  "img/Ralph Sambo.jpg",
  "img/Reece Meyer Tezza.jpg",
  "img/Rexandro Kram.jpg",
  "img/Rohann Schultz.jpg",
  "img/Ruben Cilliers.jpg",
  "img/Samuel Marthus Mellet.jpg",
  "img/Samuel van der Walt.jpg",
  "img/Sandiswa Ngema.jpg",
  "img/Si Nan Wang.jpg",
  "img/Sibusiso Clement Shabangu.jpg",
  "img/Simvuyele Dlekedla.jpg",
  "img/Siyamukela Ntshangase.jpg",
  "img/Stefan du Randt.jpg",
  "img/Tendani Mahlaba.jpg",
  "img/Thabiso Neo Sitoe.jpg",
  "img/Tian Beyers.jpg",
  "img/Tristan Warrington.jpg",
  "img/Tristen Jacobs.jpg",
  "img/Wian Pieterse.jpg",
  "img/Yusuf Isaacs.jpg",
  "img/Zach Redfern.jpg",
  "img/Zachary Parsadh.jpg",
  "img/Zimvo Duba.jpg"
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
  seed = generateRandomSeed();
  $('#seedDisplay').text(seed);
  rng = new Math.seedrandom(seed);
  win = 0;
  loss = 0;
  setupGame();
  history.replaceState({}, document.title, location.pathname);
});

$('#roomCodeForm').on('submit', function(e){
  e.preventDefault();
  const entered = $('#roomCodeInput').val();
  if (entered) location.href = '?seed=' + entered;
});

// --------------------
$(window).on('load', setupGame);
