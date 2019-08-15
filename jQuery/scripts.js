
var pokemonRepository = (function () {   //start of IIFE
  var repository = [];

   var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

   function add(item) {
     repository.push(item);
   };

   function getAll() {
     return repository;

   }

   // Loading data from external API
function loadList() {
  return $.ajax('apiUrl', {dataType: 'json'}).then(function (item) {$.each(item.results, function(index, item){
   
    var pokemon = {
      name: item.name,
      detailsUrl: item.url
    }
    add(pokemon)
  })

  }).catch(function(e){
  console.error(e);
});
}

var pokemonList = $('.pokemon-list');  //jQuery - document.querySelector

function addListItem(pokemon) {
  

  var listItem = $('<button class="pokemon-list__item  data-target="#modal-container"></button>');   //button
  listItem.text(pokemon.name);
  pokemonList.append(listItem);
  listItem.click(function(){
    showDetails(pokemon)   

  });
}



// Get the pokemon details from URL

function loadDetails(item){
  var url = item.detailsUrl;
  return $.ajax(url).then(function(details){
    
    console.log('Item details', details);

    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types.map(function(pokemon) {
return pokemon.type.name;
});

  console.log(item.types);

}).catch(function(e){
  console.error(e);
});
}

function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {

  var modal = $('.main-container')
                                  
      });

}

// Creating modal content
function showModal(item) {
  var $modalContainer = $('#modal-container');
  
   

  // Clearing all existing modal content
  $modalContainer.innerHTML = '';

  // Create div element in DOM   // Add class to div DOM element
  var $modal = $('<div class="modal"></div>');

  // Creating element for name in modal content
  var $nameElement = $('<h1></h1>');
  $nameElement.innerText = item.name;

  //creating img in modal content
  var $imageElement = $('<img class="modal-img">');
  img.attr('src', item.imageUrl);
 

  // Creating element for height
  var $heightElement = $('<p></p>');
  $heightElement.innerText = 'height : ' + item.height;

  // // Creating element for weight in modal content
  var typesElement = $('<p></p>');
  typesElement.innerText = 'weight : ' + item.weight;

    // Create closing button in modal content
    var $closeButtonElement = $('<button class="modal-close"></button>');
    $closeButtonElement.innerText = 'Close';
    $closeButtonElement.addEventListener('click', hideModal);

  // Appending modal content to webpage
  $('modal').append($closeButtonElement);
  $('modal').append($nameElement);
  $('modal').append($imageElement);
  $('modal').append($heightElement);
  $('modal').append($typesElement);
  $('modalContainer').append($modal);

  // adds class to show the modal
  $modalContainer.classList.add('is-visible');

  

}

// hides modal when you click on close button
function hideModal() {
  var $modalContainer = $('#modal-container');   //jQuery - document.querySelector
  $modalContainer.classList.remove('is-visible');
}

// Hides modal when clicked on ESC on keyboard

window.addEventListener('keydown', (e) => { 
var $modalContainer = document.querySelector('#modal-container');

if (
  e.key === 'Escape' && $modalContainer.classList.contains('is-visible')
) {
  hideModal();
}
});

// Hides modal if clicked outside of it
var $modalContainer = document.querySelector('.pokemon-list');
$modalContainer.addEventListener('click', (e) => {                     //vrati se na ovo kasnije, treba konvertirat u jQuery, provjeri za taj click kurac 
  var target = e.target;
  if (target === $modalContainer) {
    hideModal();
  }
});


return {
  loadList: loadList,
  addListItem: addListItem,
  showDetails: showDetails,
  add: add,
  getAll: getAll,
  loadDetails: loadDetails,
  showModal: showModal,
  hideModal: hideModal
};

})();  //this one closes IIFE



pokemonRepository.loadList().then(function() {

  var pokemon = pokemonRepository.getAll();

  $.each(pokemon, function(index, pokemon){
        addListItem(pokemon);
  });
});





