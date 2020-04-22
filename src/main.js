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
      const response = await cocktailService.getCocktailIngredients(drink);
      getElements(response);
      getIngredientArray(response);
    })();

    function getIngredientArray(response) {
      if (response) {
        let drinkArray = response.drinks[0];
        let valueArray = Object.values(drinkArray);
        console.log(valueArray);
        console.log(valueArray[21]);
        let finalIngredientArray = [];
        for (let i = 21; i < 36; i++) { 
          if(valueArray[i]) {
            finalIngredientArray.push(valueArray[i])
          }
        }
        console.log(finalIngredientArray);
        return finalIngredientArray;
      }
    }

    function getElements(response) {
      if (response) {
        //LOOK FOR JSON KEY VALUE NAMES TO REFERENCE INGREDIENTS
        $(".showIngredients").text(`The ingredients for a ${drink} are ${response.drinks[0].strIngredient1}`);
      } else {
        //ERROR MESSAGE
      }
    }
  });
});  
