//UI
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CocktailService } from './../src/cocktails';

function displayCocktailList(drinkList) {
  let drinkListDisplay = $("#showDrinksList");
  let htmlForDrinks = "";
  console.log(drinkList);
  drinkList.forEach(function(drink) {
    console.log(drink);
    htmlForDrinks += "<li id=" + drink.split(" ").join("") + ">" + drink + "</li>";
  });
  console.log(htmlForDrinks);
  drinkListDisplay.html(htmlForDrinks);
}

$(document).ready(function() {
  $("#cocktailSearch").click(function() {
    let drink = $("#cocktailInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
    
      if (response.drinks === null) {
        $(".showIngredients").text(`We could not find your drink! Check your spelling?`);
      } else if (response) {
        let ingredientArray = cocktailService.getIngredientArray(response);
        //Show below in a UL
        $(".showIngredients").text(`The ingredients for a ${drink} are ${ingredientArray}`);
      } else {
        $(".showIngredients").text(`You request could not be processed! Check your API key?`);
      }
    })();
  });

  $("#diversifySearch").click(function() {
    let drink = $("#diversifyInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
      if (response.drinks === null) {
        $(".showIngredients").text(`We could not find your drink! Check your spelling?`);
      } else if (response) {
        let drinkList = cocktailService.getDrinkList(response);
        displayCocktailList(drinkList);
        // $(".showIngredients").text(`Drink Ideas: ${drinkList}`);
      } else {
        $(".showIngredients").text(`You request could not be processed! Check your API key?`);
      }
    })();
  });
});