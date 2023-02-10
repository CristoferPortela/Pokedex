<template>
  <ui-form>
    <div class="home">
      <div class="flex-column">
        <ui-spinner
          active
          v-if="loading"
          size="L"
          class="super-large"
        ></ui-spinner>
        <img
          :class="`pikachu-centered ${loading ? '' : 'margin-top'}`"
          alt="Pikachu logo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        />
      </div>
      <form class="choose-poke">
        <div class="flex-column">
          <label for="poke-name">Escolha seu pokemon</label>
          <input
            placeholder="Qual pokemon você gostaria de ver agora?"
            id="poke-name"
            type="text"
            name="poke-name"
            @keyup="getPokeList"
          />
          <ui-button v-if="pokeName" raised>
            {{ pokeName }} eu escolho você!!!
          </ui-button>
        </div>
      </form>
    </div>
  </ui-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { AxiosRequestConfig } from 'axios';
import { PokemonData } from '@/poke-url/pokemon-url';

type InputEvent = Event & {
  target: { value: string };
};

@Options({
  data() {
    return {
      loading: false,
      error: false,
      pokeName: '',
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    getPokeList: function (event: InputEvent) {
      const pokeName = event.target.value;
      if (pokeName.length >= 3) {
        this.loading = true;
        this.$http
          .get(`pokemon/${pokeName}`)
          .then(({ data }: AxiosRequestConfig<PokemonData>) => {
            this.pokeName = data?.name;
          })
          .catch(() => {
            this.error = true;
            console.log('oii');
          })
          .finally(() => {
            setTimeout(() => {
              // We should give it some time, so it won't just disappear immediately in fast networks
              this.loading = false;
            }, 700);
          });
      }
    },
  },
})
export default class HomeView extends Vue {}
</script>
<style lang="scss">
@use '../styles/variables' as v;
@use '../styles/mixins' as m;
@import '../styles/vendor';

.super-large.mdc-circular-progress.mdc-circular-progress--large.mdc-circular-progress--indeterminate {
  transform: scale(8) translateY(30%); // 48 * scale
  & svg circle {
    stroke-width: 2;
  }
  & .mdc-circular-progress__spinner-layer > div:nth-child(2) svg circle {
    stroke-width: 1.2;
  }
}

.flex-column {
  @include m.flex-column-centered;
  margin: 2rem;
}
.pikachu-centered {
  width: 150px;
  &.margin-top {
    margin-top: 48px;
  }
}

.choose-poke {
  margin: 80px 40px 40px 40px;

  & .flex-column {
    gap: 20px;
  }

  label {
    color: v.$secondary;
    font-size: 1.5rem;
  }
  input[type='text'] {
    border-bottom: 2px solid v.$secondary;
    background-color: transparent;
    padding: 12px 20px;
    border-radius: 5px;
    width: 70%;
    outline: none;
    color: white;
    font-size: 1.1rem;
    &::placeholder {
      font-size: 1.1rem;
      color: v.$aLittleTransparent;
    }
    &::-webkit-input-placeholder {
      font-size: 1.1rem;
      color: v.$aLittleTransparent;
    }
  }
  button {
    margin-top: 10px;
  }
}
</style>
