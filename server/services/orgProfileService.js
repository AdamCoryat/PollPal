import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
//NOTE this is a future feature
class OrgProfileService {
//Makes a call to the database to find all OrgProfiles
    async findAll(query = {}) {
        let all = await dbContext.OrgProfile.find(query).populate("profileId");
        return all;
    }
//Makes a call to the database to reterive a OrgProfile
    async getOrgProfile(id) {
        let data = await dbContext.OrgProfile.findOne({ _id: id }).populate("profileId")
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this list")
        }
        return data
    }
//Makes a call to the database to create a new OrgProfile
    async createOrg(rawData) {
        let data = await dbContext.OrgProfile.create(rawData)
        return data
    }
//Makes a call to the database to edit an OrgProfile and makes a null check on the data recieved 
    async edit(id, userEmail, update) {
        let org = await this.getOrgProfile(id)
        let data = null
        if (org.creatorEmail == userEmail) {
            data = await dbContext.OrgProfile.findOneAndUpdate({ _id: id }, update, { new: true })
        }
        if (!data) {
            throw new BadRequest("Invalid information or you do not own this Org");
        }
        return data;
    }


} export const orgProService = new OrgProfileService();