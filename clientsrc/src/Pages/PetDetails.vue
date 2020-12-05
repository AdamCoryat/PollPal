<template>
  <div class="pet-details container-fluid">
    <main class="row" v-if="activeAnimal.id">
      <section class="col-12 d-flex justify-content-center" id="carousel">
        <div
          id="carouselExampleFade"
          class="shadow card-img-top carousel slide carousel-fade d-flex justifty-content-center m-2 carousel-image"
          data-ride="carousel"
        >
          <div class="carousel-inner carousel-image">
            <div class="carousel-image carousel-item active">
              <img
                class="d-block w-100"
                :src="activeAnimal.photos[0].full"
                alt=""
              />
            </div>
            <div
              v-for="photo in activeAnimal.photos"
              :key="photo.full._id"
              class="carousel-item arousel-image"
            >
              <img :src="photo.full" class="cd-block w-100" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleFade"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>

      <section class="col-12 justify-content-center" id="pet-details-card">
        <div class="shadow st card my-2">
          <div class="card-body">
            <article class="flex-wrap" id="pet-details-title">
              <h3 class="mt-2 card-title text-center">
                {{ activeAnimal.name }}
              </h3>
              <hr />
              <br />
            </article>

            <article class="mb-2" id="pet-description">
              <p class="card-text">{{ activeAnimal.description }}</p>
              <hr />
            </article>

            <article class="my-2" id="age">
              <p class="card-text">
                <span class="h6">Age:</span> {{ activeAnimal.age }}
              </p>
              <hr />
            </article>

            <article v-if="activeAnimal.breeds.primary" id="breeds">
              <p class="card-text h6">Breeds</p>
              <pre class="pre-text">
      Primary: {{ activeAnimal.breeds.primary }}</pre
              >
              <pre class="pre-text" v-if="activeAnimal.breeds.secondary">
      Secondary: {{ activeAnimal.breeds.secondary }}</pre
              >
              <pre v-if="activeAnimal.breeds.mixed" class="pre-text">
      Mixed Breed</pre
              >
              <hr />
            </article>

            <article v-if="activeAnimal.colors.primary" id="color">
              <p class="card-text h6">Color</p>
              <pre class="pre-text">
      Primary: {{ activeAnimal.colors.primary }}</pre
              >
              <pre v-if="activeAnimal.colors.secondary" class="pre-text">
      Secondary: {{ activeAnimal.colors.secondary }}</pre
              >
              <pre v-if="activeAnimal.colors.tertiary" class="pre-text">
      Tertiary: {{ activeAnimal.colors.tertiary }}</pre
              >
              <hr />
            </article>

            <article class="my-2" id="gender">
              <p class="card-text h6">
                Gender:
                <span class="pre-text">{{ activeAnimal.gender }}</span>
              </p>
              <hr />
            </article>

            <article class="mb-2" id="size">
              <p class="card-text h6">
                Size: <span class="pre-text">{{ activeAnimal.size }}</span>
              </p>
              <hr />
            </article>

            <article id="attributes">
              <p class="card-text h6">Attributes</p>
              <pre
                v-if="activeAnimal.attributes.spayed_neutered"
                class="pre-text"
              >
      Spayed/Neutered</pre
              >
              <pre
                v-if="activeAnimal.attributes.house_trained"
                class="pre-text"
              >
      House Trained</pre
              >
              <pre v-if="activeAnimal.attributes.declawed" class="pre-text">
     Declawed</pre
              >
              <pre
                v-if="activeAnimal.attributes.special_needs"
                class="pre-text"
              >
      Has Special Needs</pre
              >
              <hr />
            </article>

            <article v-if="activeAnimal.environment.children" id="enviroment">
              <p class="card-text h6">Enviroment:</p>
              <pre class="pre-text">     Good With Children</pre>
              <hr />
            </article>

            <article class="mb-2" id="status">
              <p class="card-text h6">
                Status:
                <span class="pre-text">{{ activeAnimal.status }}</span>
              </p>
              <hr />
            </article>

            <article id="contact">
              <p class="card-text h6">Contact Info</p>
              <pre v-if="activeAnimal.contact.email" class="pre-text">
      Email: {{ activeAnimal.contact.email }}</pre
              >
              <pre v-if="activeAnimal.contact.phone" class="pre-text">
      Phone: {{ activeAnimal.contact.phone }}</pre
              >
              <pre v-if="activeAnimal.contact.address.city" class="pre-text">
      City: {{ activeAnimal.contact.address.city }}</pre
              >
              <pre v-if="activeAnimal.contact.address.phone" class="pre-text">
      State: {{ activeAnimal.contact.address.phone }}</pre
              >
              <pre
                v-if="activeAnimal.contact.address.postcode"
                class="pre-text"
              >
      ZipCode: {{ activeAnimal.contact.address.postcode }}</pre
              >
              <hr />
            </article>
            <article id="buttons" class="d-flex">
              <a
                class="btn btn-success m-2"
                :href="'mailto:' + activeAnimal.contact.email"
              >
                Contact about Adoption
              </a>

              <button class="btn btn-danger m-2" @click="removeFavorite">
                Remove from Favorite
              </button>
            </article>
          </div>
        </div>
      </section>
    </main>
    <section v-else>
      <h1>loading...</h1>
    </section>
  </div>
</template>

<script>
export default {
  name: "petDetails",
  mounted() {
    this.$store.dispatch("getResource", {
      path: "animals/" + this.$route.params.id,
      resource: "animalDetails",
    });
  },
  data() {
    return {};
  },

  computed: {
    activeAnimal() {
      return this.$store.state.animalDetails;
    },
  },
  watch: {},
  methods: {
    removeFavorite() {
      this.$store.dispatch("delete", {
        deletePath: "profile/favorites/" + this.$route.params.id,
      });
    },
  },
  components: {},
};
</script>

<style scoped>
.pre-text {
  font-family: Arial, Helvetica, sans-serif;
}
.shadow {
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}
.carousel-image {
  border-radius: 10px;
}
.pet-details {
  height: 80vh;
  overflow-y: scroll;
}
</style>
