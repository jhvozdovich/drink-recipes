import $ from 'jquery';

export class CocktailService {
  async getCocktailInfo(drink) {
    try {
      let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/search.php?s=${drink}`);
      let jsonifiedResponse;
      if (response.ok && response.status === 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch(error) {
      return false;
    }
  }

  getIngredientsFromDrink (drinkArray) {
    let ingredients = [];
    $.each(drinkArray, function(key,value){
      if (key.startsWith("strIngredient") && value) {
        ingredients.push(value);
      }
    });
    return ingredients;
  }

  getDrinkList (response) {
    let drinkList = [];
    for (let i = 1; i <= (response.drinks.length - 1); i++){ 
      drinkList.push(response.drinks[i].strDrink);
    }
    return drinkList;
  }
  
  getIngredientArray(response) {
    if (response) {
      //We should get the name of all the drinks and let user pick which drink they would like to see ingredients for via for loop?
      let drinkArray = response.drinks[0];
      let ingredients = this.getIngredientsFromDrink(drinkArray);
      console.log(ingredients);
      return ingredients;
    }
  }
}


