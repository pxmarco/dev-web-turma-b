<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="isInterCampeao">Se der trabalho</h1>
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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxVbNu41egHdruMi0im-6QmbJQFTAltTgiw&s",
        };
    },
    mounted() {
        setTimeout(() => {
            this.isInterCampeao = false;
            this.urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBki1MnGNZCbGykg9wOUE0EXsG1EXX_W4dBQ&s";
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