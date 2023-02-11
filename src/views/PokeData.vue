<template>
  <main v-if="pokeData.name">
    <pokedex-device :poke-data="pokeData"></pokedex-device>
  </main>
</template>

<script lang="ts">
import { PokemonData } from '@/poke-url/pokemon-url';
import { AxiosRequestConfig } from 'axios';
import { Options, Vue } from 'vue-class-component';
import PokedexDevice from '@/components/PokedexDevice.vue';

type Data = {
  pokeData: PokemonData;
  error: boolean;
};
@Options({
  name: 'PokeData',
  components: { PokedexDevice },
  data(): Data {
    return {
      pokeData: {} as PokemonData,
      error: false,
    };
  },
  methods: {
    getPokemon: function () {
      this.$http
        .get(`pokemon/${this.$route.params.name}`)
        .then(({ data }: AxiosRequestConfig<PokemonData>) => {
          this.pokeData = data;
          console.log(data);
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
  beforeMount() {
    this.getPokemon();
  },
})
export default class PokeData extends Vue {}
</script>

<style lang="scss"></style>
