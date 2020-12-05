import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService.js";
import ns from "../Services/NotificationService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    animals: [],
    activeAnimal: {},
    animalDetails: {},
    favorites: [],
  },
  mutations: {
    //SECTION Auth0 mutations
    setProfile(state, profile) {
      state.profile = profile;
    },
    //SECTION Edge case mutations
    setFavorites(state, favorites) {
      state.favorites = favorites;
    },
    //SECTION Array Mutations
    setResource(state, payload) {
      state[payload.resource] = payload.data;
    },
    addResource(state, payload) {
      let resource = state[payload.resource];
      if (Array.isArray(resource)) {
        resource.push(payload.data);
      } else {
        console.error(
          "Cannot add to ${payload.resource} as it is not an array"
        );
      }
    },
  

    //SECTION Dictionary Mutations
    setDictionary(state, payload) {
      Vue.set(state[payload.resource], payload.parentId, payload.data);
    },
    addDictionary(state, payload) {
      let resource = state[payload.resource][payload.id];
      resource.push(payload.data);
    },
  },
  actions: {
    //SECTION Auth0 and key bearer methods
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit, dispatch, state }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
        if (!res.data.completedQuiz) {
          router.push({ name: "Home" });
        }
      } catch (error) {
        console.error(error);
      }
    },


    //SECTION Array Methods
    // API call to get resource takes in a payload then commits to set the resources
    async getResource({ commit, state }, payload) {
      try {
        let res = await api.get(payload.path);
        commit("setResource", {
          data: res.data,
          resource: payload.resource,
        });
      } catch (error) {
        console.error(error);
      }
    },
    // API call to create after reciving payload then get resource to refresh data
    async create({ dispatch }, payload) {
      try {
        let res = await api.post(payload.path, payload.data);
        dispatch("getResource", {
          path: payload.getPath,
          resource: payload.resource,
        });
      } catch (error) {
        console.error(error);
      }
    },
    // API call to edit after receiving payload
    async edit({ dispatch }, payload) {
      try {
        await api.put(payload.path, payload.data);
        dispatch("getResource", {
          path: payload.getPath,
          resource: payload.resource,
        });
      } catch (error) {
        console.error(error);
      }
    },
    // API Call to delete then push to profile page after deleting
    async delete({ dispatch }, payload) {
      try {
        await api.delete(payload.deletePath);
        router.push({ name: "Profile" });
      } catch (error) {
        console.error(error);
      }
    },
    //SECTION Edge Cases
    // ADD favorite or create many to many relation ship for profile page
    async addFavorite({ dispatch, commit }, payload) {
      try {
        await api.post(payload.path, payload.data);
      } catch (error) {
        console.error(error);
      }
    },
    // API call to get favorites for the the profile
    async getFavorites({ commit }) {
      try {
        let res = await api.get("profile/favorites");
        commit("setFavorites", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    // Swipe page call to set active animal on the page
    setActive({ commit }, data) {
      commit("setResource", {
        resource: "activeAnimal",
        data: data,
      });
    },
  },
});
