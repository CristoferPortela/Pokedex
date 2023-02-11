<template>
  <article class="pd-device-borders">
    <section class="screen-borders">
      <div class="leds-top">
        <span></span>
        <span></span>
      </div>
      <div class="screen">
        <img alt="oi" :src="picsList[pic]" />
      </div>
      <div class="screen-bottom">
        <span></span>
        <svg viewBox="0 0 150 80" width="20" height="13">
          <rect width="150" height="10"></rect>
          <rect y="25" width="150" height="10"></rect>
          <rect y="50" width="150" height="10"></rect>
          <rect y="75" width="150" height="10"></rect>
        </svg>
      </div>
    </section>
    <footer class="pd-footer">
      <div class="big-button">
        <span></span>
      </div>
      <div class="flat-led-and-green-area">
        <div class="flat-led">
          <span></span>
          <span></span>
        </div>
        <span class="green-area"></span>
      </div>
      <div class="direction-buttons">
        <button @click="nextEvolution"></button>
        <div class="horizontal">
          <button @click="previousPic"></button>
          <span class="central-square"></span>
          <button @click="nextPic"></button>
        </div>
        <button @click="previousEvolution"></button>
      </div>
    </footer>
  </article>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'PokedexDevice',
  data() {
    return {
      pic: 0,
      picsList: [],
    };
  },
  beforeMount() {
    const picsList: string[] = [];
    Object.keys(this.pokeData.sprites).forEach((attr) => {
      if (typeof this.pokeData.sprites[attr] === 'string') {
        if (attr === 'front_default') {
          picsList.unshift(this.pokeData.sprites[attr]);
        } else {
          picsList.push(this.pokeData.sprites[attr]);
        }
      }
    });
    this.picsList = picsList;
  },
  methods: {
    previousPic: function () {
      const pic = this.pic;
      this.pic = pic === 0 ? this.picsList.length - 1 : pic - 1;
    },
    nextPic: function () {
      console.log(this.evolutionData);

      const pic = this.pic;
      this.pic = pic === this.picsList.length - 1 ? 0 : pic + 1;
    },
    nextEvolution: function () {
      if (this.evolutionData.id) {
        let next = '';
        const name = this.pokeData.name;
        const chain = this.evolutionData.chain;

        const isFirst = name === chain.species.name;
        const isSecond = name === chain.evolves_to[0].species.name;
        const isThird = name === chain.evolves_to[0].evolves_to[0].species.name;

        if (isFirst) {
          next = chain.evolves_to[0].species.name;
        }
        if (isSecond) {
          next = chain.evolves_to[0].evolves_to[0].species.name;
        }
        if (isThird) {
          next = chain.species.name;
        }
        this.$router.push('/pokemon/' + next).then(() => {
          this.$router.go();
        });
      }
    },
    previousEvolution: function () {
      if (this.evolutionData.id) {
        let next = '';
        const name = this.pokeData.name;
        const chain = this.evolutionData.chain;

        const isFirst = name === chain.species.name;
        const isSecond = name === chain.evolves_to[0].species.name;
        const isThird = name === chain.evolves_to[0].evolves_to[0].species.name;

        if (isFirst) {
          next = chain.evolves_to[0].evolves_to[0].species.name;
        }
        if (isSecond) {
          next = chain.species.name;
        }
        if (isThird) {
          next = chain.evolves_to[0].species.name;
        }
        this.$router.push('/pokemon/' + next).then(() => {
          this.$router.go();
        });
      }
    },
  },
  props: ['pokeData', 'evolutionData'],
})
export default class PokedexDevice extends Vue {}
</script>

<style lang="scss" scoped>
@import '../styles/poke-device';
</style>
