<template>
  <article class="pd-device-borders">
    <section class="screen-borders">
      <div class="leds-top">
        <span></span>
        <span></span>
      </div>
      <div class="screen">
        <img alt="oi" :src="pokeData.sprites?.front_default" />
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
    <section>
      <div>
        <span></span>
      </div>
      <div>
        <div>
          <span></span>
          <span></span>
        </div>
        <span></span>
      </div>
      <div>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'PokedexDevice',
  props: ['pokeData'],
})
export default class PokedexDevice extends Vue {}
</script>

<style lang="scss" scoped>
@import '../styles/poke-device';
</style>
