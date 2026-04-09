<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <home-component/>
    <hr>
    <HomeComponent />
    <hr>
    <UsuarioComponent v-show="componentUsuarioVisivel"/>
    <hr>
    <EstiloComponent />
    <hr>
    <ImagemComponent 
    @visibilidade-img="escutarVisibilidadeImg"
      urlImagem="https://static.vakinha.com.br/uploads/vakinha/image/2763367/16482923794298474752451884422286.jpg"
      larguraImg="400"/>
  </div>
 
</template>


<script>
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';
import ImagemComponent from './components/ImagemComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data() {
    return {
      componentUsuarioVisivel: true,
    };
  },
  methods: {
    escutarVisibilidadeImg(isVisivel) {
      this.componentUsuarioVisivel = !isVisivel;
    },
  },
  mounted() {
    console.log("mounted");
  },
  errorCaptured() {
    console.log("errorCaptured");
  },
  created() {
    console.log("created");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>