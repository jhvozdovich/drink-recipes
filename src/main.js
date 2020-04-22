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
      getElements(response);
      cocktailService.getIngredientArray(response);
    })();

 

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
