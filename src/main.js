//UI
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CocktailService } from './../src/cocktails';

$(document).ready(function() {
  $("#cocktailSearch").click(function() {
    let drink = $("#cocktailInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
    
      if (response) {
        //call getDrinkList here instead of getIngredientArray
        //let = drinkList = cocktailService.getDrinkList(response);
        //Show below in a UL
        //$(".showDrinks").text(`These are the different drinks ${drinkList} `);
        let ingredientArray = cocktailService.getIngredientArray(response);
        console.log(ingredientArray);
        //LOOK FOR JSON KEY VALUE NAMES TO REFERENCE INGREDIENTS
        $(".showIngredients").text(`The ingredients for a ${drink} are ${ingredientArray}`);
      } else {
        //ERROR MESSAGE
      }
    })();
  });

  $("#diversifySearch").click(function() {
    let drink = $("#diversifyInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
      console.log(response);

      if (response) {
        let drinkList = cocktailService.getDrinkList(response);
        $(".showIngredients").text(`Drink Ideas: ${drinkList}`);
      } else {
        ///ERROR
      }
    })();
  });
});