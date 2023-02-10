<template>
  <ui-form>
    <div class="home">
      <div class="flex-column">
        <ui-spinner active size="L" class="super-large"></ui-spinner>
        <img
          class="pikachu-centered"
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
          />
          <ui-button @click="getPokeList" raised>Eu escolho você!!!</ui-button>
        </div>
      </form>
    </div>
  </ui-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { AxiosRequestConfig } from 'axios';

@Options({
  components: {
    HelloWorld,
  },

  methods: {
    getPokeList: function () {
      this.$http.get('pokemon/ditto').then((data: AxiosRequestConfig) => {
        console.log(data);
      });
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
