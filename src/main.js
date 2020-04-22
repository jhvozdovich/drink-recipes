//UI
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CocktailService } from './../src/cocktails';

$(document).ready(function() {
  $("#cocktailSearch").click(function() {
    let drink = $("#cocktailInput").val();
    console.log(drink);

    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailIngredients(drink);
      getElements(response);
    })();

    function getElements(response) {
      console.log(response);
      if (response) {
        //LOOK FOR JSON KEY VALUE NAMES TO REFERENCE INGREDIENTS
        $(".showIngredients").text(`The ingredients for a ${drink} are ${response.drinks[0].strIngredient1}`);
      } else {
        //ERROR MESSAGE
      }
    }
  });
});  
