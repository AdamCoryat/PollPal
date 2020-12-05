import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class FavoritesService {
//Makes a call to the database to findall favorite animals linked to that profile and returns to Controller
  async findAll(query = {}) {
    let all = await dbContext.Favorites.find(query).populate("animalId");
    return all;
  }
//Makes a call the the database to see if it has already been created if not it creates a new Fav if it does find the animal it throws a badrequest
  async addFav(rawData) {
    if (rawData) {
      let found = await dbContext.Favorites.findOne({
        creatorEmail: rawData.creatorEmail,
        animalId: rawData.animalId,
      });
      if (!found) {
        let data = await dbContext.Favorites.create(rawData);
        return data;
      }
      throw new BadRequest("you already have it favorited");
    }
    throw new BadRequest("Invalid Information Sent");
  }
//Makes a call to the database to find the favorite animal by its id then delete if it can not find the object it throws a badrequest
  async remove(id, creatorEmail) {
    let data = await dbContext.Favorites.findOneAndDelete({
      animalId: id,
      creatorEmail: creatorEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid Id or this Favorite does not exist.");
    }
  }
}
export const favoritesService = new FavoritesService();
