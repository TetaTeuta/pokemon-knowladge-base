
var pokemonRepository = (function () {   //start of IIFE
  var repository = [];

  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("add an object");
    }
  }
  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    var $pokemonList = $('.pokemon-list');
    var $listItem = $('<li>');   //create an li element that contains a button for each Pokémon
    var $button = $('<button class="my-class">' + pokemon.name + '</button>'); //creates the button element
    $listItem.addClass('pokemon-list__item');
    $button.addClass('button__style');  //Add a class to the button using the classList.add method
    $listItem.append($button);   //append the button to the list item as its child.
    $pokemonList.append($listItem); //append the child in the repository pokemon
    $button.on('click', function (event) {
      showDetails(pokemon); // creating the button as a function/event to be able to click in the future, if need more details.
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    });
  }
  // Loading data from external API
  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon)
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Get the pokemon details from URL
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function(details) {
        // we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        // loop for each of the pokemon types and
        //Also changing the background color depend on the pokemon type.
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        if (item.types.includes('grass')) {
          $('#modal-container').css('background-color', 'lightgreen');
        } else if (item.types.includes("fire")) {
          $("#modal-container").css("background-color", "red");
        } else if (item.types.includes("psychic")) {
          $("#modal-container").css("background-color", "#FF69B4");
        } else if (item.types.includes("poison")) {
          $("#modal-container").css("background-color", "purple");
        } else if (item.types.includes("water")) {
          $("#modal-container").css("background-color", "blue");
        } else if (item.types.includes("bug")) {
          $("#modal-container").css("background-color", "#3f000f");
        } else if (item.types.includes("rock")) {
          $("#modal-container").css("background-color", "#BC8F8F");
        } else if (item.types.includes("flying")) {
          $("#modal-container").css("background-color", "#2F4F4F");
        } else if (item.types.includes("electric")) {
          $("#modal-container").css("background-color", "gold");
        } else if (item.types.includes("ice")) {
          $("#modal-container").css("background-color", "#4169E1");
        } else if (item.types.includes("ghost")) {
          $("#modal-container").css("background-color", "#8B008B");
        } else if (item.types.includes("ground")) {
          $("#modal-container").css("background-color", "#D2B48C");
        } else if (item.types.includes("fairy")) {
          $("#modal-container").css("background-color", "#EE82EE");
        } else if (item.types.includes("steel")) {
          $("#modal-container").css("background-color", "#708090");
        }
        //loop to get the abilities of a selected pokemon
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // show the Modal Content
  function showModal(item) {
    var $modalContainer = $('#modal-container');

    // Clearing all existing content of  the modal
    $modalContainer.empty();

    // Create div element in DOM   // Add class to div DOM element
    var modal = $('<div class="modal"></div>');

    //creating closing button in modal content
    var closeButtonElement = $('button class="modal-close">Close</button>');

    //adding event listener to close modal when clicked on button
    closeButtonElement.on('click', hideModal);

    // Creating element for name in modal content
    var nameElement = $('<h1>' + item.name + '</h1>');

    //creating img in modal content
    var imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);


    // Creating element for height 
    var heightElement = $('<p>' + 'height : ' + item.height + '</p>');

    //creating element for weight in modal content
    var weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');

    // Creating element for weight in modal content
    var typesElement = $('<p>' + 'types : ' + item.types + '</p>');
    // Creating element for abilities in modal content
    var abilitiesElement = $('<p>' + 'abilities : ' + item.weight + '</p>');


    // Appending modal content to webpage
    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageElement);
    modal.append(heightElement);
    modal.append(weightElement);
    modal.append(typesElement);
    modal.append(abilitiesElement);
    $modalContainer.append(modal);
    // adds class to show the modal
    $modalContainer.addClass('is-visible');
  }

  // hides modal when you click on close button
  function hideModal() {
    var $modalContainer = $('#modal-container');   //jQuery - document.querySelector
    $modalContainer.removeClass('is-visible');
  }

  // Hides modal when clicked on ESC on keyboard
  jQuery(window).on("keydown", e => {
    var $modalContainer = $("#modal-container");
    if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
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
    add: add,
    getAll: getAll,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();  //this one closes IIFE

pokemonRepository.loadList().then(function () {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});