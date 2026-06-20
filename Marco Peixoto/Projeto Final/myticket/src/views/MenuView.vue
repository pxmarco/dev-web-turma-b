<template>
  <div id="menu-view">
    <h1>Eventos Disponíveis</h1>
    <div id="scroll-horizontal">
      <div id="card-content" v-for="evento in listaMenuEventos" :key="evento.id">
        <img :src="evento.foto" class="card-foto" />
        <div id="card-coluna">
          <p id="nome-content">{{ evento.nome }}</p>
          <p id="preco-content">R$ {{ evento.valor }},00</p>
          <p id="descricao-content">{{ evento.descricao }}</p>
          <button @click="selecionarEvento(evento)">Selecionar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuEventos: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch("https://api-myticket.onrender.com/menu");
      const dados = await response.json();
      this.listaMenuEventos = [...dados.destaque, ...dados.eventos];
    },
    selecionarEvento(eventoSelecionado) {
      const param = JSON.stringify(eventoSelecionado);
      const eventoJson = encodeURIComponent(param);
      this.$router.push({ path: "/config-pedido", query: { evento: eventoJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

#menu-view {
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  background-color: #0f0f0f;
  min-height: 100vh;
}

h1 {
  color: #e2e8f0;
  font-size: 28px;
  margin-bottom: 24px;
}

#scroll-horizontal {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 16px;
}

#scroll-horizontal::-webkit-scrollbar {
  height: 6px;
}
#scroll-horizontal::-webkit-scrollbar-thumb {
  background: #7c3aed;
  border-radius: 10px;
}

#card-content {
  min-width: 260px;
  max-width: 260px;
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #2d2d4e;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

#card-content:hover {
  transform: translateY(-4px);
  border-color: #7c3aed;
}

.card-foto {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

#card-coluna {
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#nome-content {
  font-size: 16px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 6px 0;
  white-space: normal;
}

#preco-content {
  font-size: 22px;
  font-weight: 700;
  color: #a78bfa;
  margin: 0 0 8px 0;
}

#descricao-content {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 14px 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

#card-coluna button {
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: #7c3aed;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s;
}

#card-coluna button:hover {
  background-color: #5b21b6;
}
</style>