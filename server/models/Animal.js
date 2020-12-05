import mongoose from "mongoose";
import { dbContext } from "../db/DbContext";
let Schema = mongoose.Schema;

const breedSchema = new Schema({
  primary: { type: String, default: null },
  secondary: { type: String, default: null },
  mixed: { type: Boolean, default: false },
  unknown: { type: Boolean, default: false },
});

const colorSchema = new Schema({
  primary: { type: String, default: null },
  secondary: { type: String, default: null },
  tertiary: { type: String, default: null },
});

const attributeSchema = new Schema({
  spayed_neutered: { type: Boolean, required: true, default: false },
  house_trained: { type: Boolean, required: true, default: false },
  declawed: { type: Boolean, default: false },
  special_needs: { type: Boolean, required: true, default: false },
  shots_current: { type: Boolean, required: true, default: false },
});

const fullSchema = new Schema({
  full: { type: String, default: null },
});

const addressSchema = new Schema({
  city: { type: String, default: null },
  state: { type: String, default: null },
  postcode: { type: String, default: null },
});

const contactSchema = new Schema({
  email: { type: String, default: null },
  phone: { type: String, default: null },
  address: addressSchema,
});

const environmentSchema = new Schema({
  children: { type: Boolean, default: false },
});

const Animal = new Schema(
  {
    organization_id: { type: String, required: true, default: null },
    species: { type: String, required: true, default: null },
    breeds: breedSchema,
    colors: colorSchema,
    age: { type: String, default: null },
    gender: { type: String, required: true, default: null },
    size: { type: String, required: true, default: null },
    attributes: attributeSchema,
    environment: environmentSchema,
    name: { type: String, required: true, default: null },
    description: { type: String, default: null },
    photos: [fullSchema],
    status: { type: String, required: true },
    contact: contactSchema,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Animal.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});
export default Animal;
