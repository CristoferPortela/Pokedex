<template>
  <main v-if="pokeData.name">
    <div class="pokedex-and-stats">
      <div>
        <pokedex-device
          :evolution-data="evolution"
          :poke-data="pokeData"
        ></pokedex-device>
        <p>
          <small
            >Para ver a evolução, ou mudar a imagem, aperte os botões da
            pokedex</small
          >
        </p>
      </div>

      <section class="poke-stats">
        <h3>Estatisticas do pokemon</h3>
        <ul>
          <li v-bind:key="stat.stat.name" v-for="stat in pokeData.stats">
            <p>{{ stat.stat.name.replace('-', ' ') }}</p>
            <figure>
              <ui-progress
                :progress="stat.base_stat / 300"
                :buffer="1"
              ></ui-progress>
              <figcaption>{{ stat.base_stat }}</figcaption>
            </figure>
          </li>
        </ul>
      </section>
    </div>
    <section>
      <h5>Habilidades</h5>
      <ul>
        <li v-bind:key="atk.ability.name" v-for="atk in pokeData.abilities">
          {{ atk.ability.name.replace('-', ' ') }}
        </li>
      </ul>
    </section>
    <section v-if="evolution.id">
      <h5>Evolução</h5>
      <ul
        v-bind:key="evl.species.name"
        v-for="evl in this.evolution.chain.evolves_to"
      >
        <li>{{ this.evolution.chain.species.name }}</li>
        <li>
          {{ evl.species.name }}
        </li>
        <li v-bind:key="evl2.species.name" v-for="evl2 in evl.evolves_to">
          {{ evl2.species.name }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import { PokemonData } from '@/poke-url/pokemon-url';
import { AxiosRequestConfig } from 'axios';
import { Options, Vue } from 'vue-class-component';
import PokedexDevice from '@/components/PokedexDevice.vue';
import { EvolutionData } from '@/poke-url/evolution-url';

type Data = {
  pokeData: PokemonData;
  error: boolean;
  evolution: EvolutionData;
};
@Options({
  name: 'PokeData',
  components: { PokedexDevice },
  data(): Data {
    return {
      pokeData: {} as PokemonData,
      error: false,
      evolution: {} as EvolutionData,
    };
  },
  methods: {
    getPokemon: function () {
      this.$http
        .get(`pokemon/${this.$route.params.name}`)
        .then(({ data }: AxiosRequestConfig<PokemonData>) => {
          this.pokeData = data;
          this.getSpecies();
        })
        .catch(() => {
          this.error = true;
        });
    },
    getSpecies: async function () {
      try {
        const species = await this.$http.get(this.pokeData.species.url);
        const evolution = await this.$http.get(
          species.data.evolution_chain.url,
        );
        this.evolution = evolution.data;
      } catch (e) {
        this.error = true;
      }
    },
  },
  beforeMount() {
    this.getPokemon();
  },
})
export default class PokeData extends Vue {}
</script>

<style lang="scss" scopped>
@use '../styles/mixins' as m;
@use '../styles/variables' as v;
@use 'balm-ui/components/progress/progress';

li {
  color: white;
  text-transform: capitalize;
}

.pokedex-and-stats {
  @include m.flex;
  text-align: left;

  .poke-stats {
    flex: 1;
    margin: 1rem 2rem 2rem;
    h3 {
      color: white;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
