import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AnimalsService {
  // creates a query search to the DataBase and limits the return by 100 as well as populates the data with the creator information
  async findAll(query = {}) {
    let values = await dbContext.Animals.find(query)
      .limit(100)
      .populate("creator", "name picture");
    return values;
  }
  // searches database by the given Id and makes a null check before returning data
  async findById(id) {
    let animal = await dbContext.Animals.findById({
      _id: id,
    });
    if (!animal) {
      throw new BadRequest("Invalid Id");
    }
    return animal;
  }
  // Edge case method created to scrape the data base and create multiple animal objects at once
  async createMany(array) {
    let data = await dbContext.Animals.insertMany(array);
    return data;
  }
  // Creates an animal object if they are the orginization makes a check and throws badrequest if they are not an org
  async create(rawData) {
    if (rawData.hasOrg) {
      let data = await dbContext.Animals.create(rawData);
      return data;
    }
    throw new BadRequest("Only Organizations may post new animals.");
  }
  // Makes a call to the database to edit an Animal object then makes a null check before returning data
  async edit(id, creatorEmail, update) {
    let data = await dbContext.Animals.findOneAndUpdate(
      { _id: id, creatorEmail: creatorEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not have permissions");
    }
    return data;
  }
  // Makes a call to the database to delete an animal object by the objects id then makes an additional call to delete all relationships
  async deleteById(id, creatorEmail) {
    let data = await dbContext.Animals.findByIdAndDelete({
      _id: id,
      creatorEmail: creatorEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid Id or you are not Authorized");
    }
    await dbContext.Favorites.deleteMany({ animalId: id });
  }
}

export const animalsService = new AnimalsService();
