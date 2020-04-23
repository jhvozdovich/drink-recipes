//UI
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CocktailService } from './../src/cocktails';
import { RandomCocktailService } from './../src/cocktails';

function displayIngredientList(ingredientArray) {
  let ingredientListDisplay = $("#showIngredientsList");
  let htmlForIngredients = "";
  
  ingredientArray.forEach(function(ingredient) {
    htmlForIngredients += "<li id=" + ingredient.split(" ").join("") + ">" + ingredient + "</li>";
  });
  ingredientListDisplay.html(htmlForIngredients);
}

function displayCocktailList(drinkList) {
  let drinkListDisplay = $("#showDrinksList");
  let htmlForDrinks = "";
  drinkList.forEach(function(drink) {
    htmlForDrinks += "<li id=" + drink.split(" ").join("") + ">" + drink + "</li>";
  });
  drinkListDisplay.html(htmlForDrinks);
}

function displayCocktail(drink) {
  let drinkDisplay = $("#showDrinksList");
  let htmlForDrink = "<p id=" + drink.split(" ").join("") + "> <strong>" + drink + "</strong></p>";
  drinkDisplay.html(htmlForDrink);
}

function displayGif(gifUrl) {
  let gifDisplay = $("#showGif");
  let htmlForGif = "<img src=" + gifUrl + ">";
  gifDisplay.html(htmlForGif);
}

// function expandIngredientList() {
//   let ingredientListDisplay = $("#expandIngredients");
//   let htmlForIngredients = "";
//   $("ul#showDrinkList").on("click", "li", function() {
//     htmlForIngredients += "<li id=" + this.id.split(" ").join("") + ">" + this.id + "</li>";
  
//   drinkList.forEach(function(drink) {
//     displayIngredientList(drink);
//     // htmlForDrinks += "<li id=" + drink.split(" ").join("") + ">" + drink + "</li>";
//   });
//   ingredientListDisplay.html(htmlForIngredients);
//   });
// }

$(document).ready(function() {
  $("#cocktailSearch").click(function() {
    let drink = $("#cocktailInput").val();
    if (drink !== "") {
      (async () => {
        let cocktailService = new CocktailService();
        const response = await cocktailService.getCocktailInfo(drink);
    
        if (response.drinks === null) {
          $("#showDrinksList").text("");
          $("#showIngredientsList").text("");
          $("#showErrors").text(`We could not find your drink! Check your spelling?`);
        } else if (response) {
          $("#showDrinksList").text("");
          $("#showErrors").text("");

          let ingredientArray = cocktailService.getIngredientArray(response);
          //Show below in a UL
          displayCocktail(drink.toUpperCase());
          displayIngredientList(ingredientArray);
        } else {
          $("#showDrinksList").text("");
          $("#showIngredientsList").text("");
          $("#showErrors").text(`You request could not be processed! Check your API key?`);
        }
      })();
    } else {
      $("#showDrinksList").text("");
      $("#showIngredientsList").text("");
      $("#showErrors").text(`Please enter a drink!`);
    }
  });

  $("#diversifySearch").click(function() {
    let drink = $("#diversifyInput").val();
    if (drink !== "") {
      (async () => {
        let cocktailService = new CocktailService();
        const response = await cocktailService.getCocktailInfo(drink);
        if (response.drinks === null) {
          $("#showDrinksList").text("");
          $("#showIngredientsList").text("");
          $("#showErrors").text(`We could not find your drink! Check your spelling?`);
        } else if (response) {
          $("#showErrors").text("");
          $("#showIngredientsList").text("");
          let drinkList = cocktailService.getDrinkList(response);
          displayCocktailList(drinkList);
        } else {
          $("#showDrinksList").text("");
          $("#showIngredientsList").text("");
          $("#showErrors").text(`You request could not be processed! Check your API key?`);
        }
      })();
    } else{
      $("#showDrinksList").text("");
      $("#showIngredientsList").text("");
      $("#showErrors").text(`Please enter a drink!`);
    }
  });

  $("#randomSearch").click(function() {
    (async () => {
      let randomCocktailService = new RandomCocktailService();
      const response = await randomCocktailService.getRandomCocktailInfo();
      if (response) {
        $("#showErrors").text("");
        $("#showIngredientsList").text("");
        let drink = randomCocktailService.getRandomDrink(response);
        let ingredients = randomCocktailService.getRandomIngredientArray(response);
        displayCocktail(drink.toUpperCase());
        displayIngredientList(ingredients);
        const responseGiph = await randomCocktailService.giphyCall(drink);
        let gifUrl = randomCocktailService.getGif(responseGiph);
        displayGif(gifUrl);
      } else {
        $("#showDrinksList").text("");
        $("#showIngredientsList").text("");
        $("#showErrors").text(`You request could not be processed! Check your API key?`);
      }
    })();
  });
});