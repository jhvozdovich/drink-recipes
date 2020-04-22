process.env.API_KEY

const url = ``

https://www.thecocktaildb.com/api/json/v1/   1/search.php   ?s=   margarita

export class CocktailService {
  async getCocktailName(drink) {
    try {
      let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/search.php?s=${drink}`);
      let jsonifiedResponse;
      if (response.ok && response.status === 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch {
      return false;
    }
  }
}