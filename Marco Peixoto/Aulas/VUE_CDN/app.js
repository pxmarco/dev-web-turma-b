const meuAppVue = {
    data() {
        return {
            nome: "Marco Antonio",
            idade: 25,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");
