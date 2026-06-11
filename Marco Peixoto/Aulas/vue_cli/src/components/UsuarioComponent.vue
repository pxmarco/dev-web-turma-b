<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="isInterCampeao">O que não tem em casa</h1>
        <img  :width="largura" :height="altura"  :src="urlImg" style="transition: 3s" />
    </div>
</template>

<script>
export default {
    name: "UsuarioComponent",
    data() {
        return {
            nome: "Marco",
            email: "marco@gmail.com",
            isInterCampeao: true,
            altura: 200,
            largura: 300,
            urlImg: 
            "https://thumbs.dreamstime.com/b/mulher-triste-e-casal-em-casamento-infeliz-por-disputa-ou-desacordo-sobre-sof%C3%A1-de-sala-estar-casa-chateada-aborrecida-com-259411645.jpg",
        };
    },
    mounted() {
        setTimeout(() => {
            this.isInterCampeao = false;
            this.urlImg = "https://www.rbsdirect.com.br/filestore/8/0/7/9/9/2/2_a8883c51ed86dff/2299708_b45f7593d58f614.jpg";
        }, 3 * 1000);
        setTimeout(() => {
            this.altura = 200;
            this.largura = 300;
        }, 3 * 1000);
        setTimeout(() => {
            this.altura = 300;
            this.largura = 500;
        }, 3 * 1000);
    },
};
</script>

<style>

</style>