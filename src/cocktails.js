export class CocktailService {
  async getCocktailIngredients(drink) {
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

 
}


