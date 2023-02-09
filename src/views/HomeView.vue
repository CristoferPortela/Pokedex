<template>
  <ui-form>
    <div class="home">
      <ui-button @click="$alert('Hello BalmUI')" raised>Click Me</ui-button>
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
@import '../styles/vendor';
</style>
