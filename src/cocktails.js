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

  getIngredientsFromDrink = (drink) => {
    let ingredients = [];
    $.each(drink, function(key,value){
      if (key.startsWith("strIngredient") && value) {
        ingredients.push(value);
      }
    })
    return ingredients;
  };

  async getIngredientArray() {
    let response = await this.getCocktailInfo();
    if (response) {
      let drinkArray = response.drinks[0];
      
      let ingredients = getIngredientsFromDrink(drinkArray);
      console.log(ingredients);
      return ingredients;
    }
  }
}


