<template>
  <div>
    <form id="pedido-form" @submit.prevent="criarPedido">

      <div>
        <p id="nome-hamburguer-content">
          {{ evento && evento.nome ? evento.nome : "--" }}
        </p>

        <img
          id="foto-content"
          :src="evento && evento.foto ? evento.foto : ''"
        />
      </div>

      <AlertaComponent
        :mensagem="alertaMensagem"
        :tipo="alertaTipo"
        :isVisible="alertaVisivel"
      />

      <div class="inputs" id="form-pedido">
        <label>Nome</label>
        <input v-model="nomeClientes"
        type="text"
        placeholder="Digite seu Nome"
        id="nome-cliente"
        />
      </div>

      <div class="inputs">
        <label>Setor do ingresso</label>

        <select v-model="setorSelecionado" name="setor" id="setor">
          <option value="" selected>Selecione o setor</option>
          <option v-for="setor in listaTiposSetor"
          :key="setor.id"
          :value="setor">{{ setor.descricao }}</option>
        </select>
      </div>

      <div>
        <label id="opcionais-titulo">Selecionar os opcionais</label>
        <label id="opcionais-subtitulo">Selecionar pacotes</label>

        <div v-for="pacote in listaPacotes"
        :key="pacote.id"
        class="checkbox-container">
          <input type="checkbox" :name="pacote.nome" :value="pacote" v-model="listaPacotesSelecionados"/>
          <span>{{ pacote.nome }}</span>
        </div>

        <label>Adicione um extra</label>

        <div v-for="extra in listaExtras"
        :key="extra.id"
        class="checkbox-container">
          <input type="checkbox" :name="extra.nome" :value="extra" v-model="listaExtrasSelecionados"/>
          <span>{{ extra.nome }}</span>
        </div>
      </div>

      <div class="inputs">
        <input
          type="submit"
          class="submit-btn"
          value="Confirmar pedido"
        />
      </div>

    </form>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "PedidoComponent",

  components: {
    AlertaComponent,
  },

  props: {
    evento: null,
  },

  data() {
    return {
      listaTiposSetor: [],
      listaPacotes: [],
      listaExtras: [],
      nomeClientes: "",
      setorSelecionado: "",
      listaPacotesSelecionados: [],
      listaExtrasSelecionados: [],
      alertaMensagem: "",
      alertaTipo: "info",
      alertaVisivel: false,
    };
  },

  methods: {
    exibirAlerta(mensagem, tipo) {
      this.alertaMensagem = mensagem;
      this.alertaTipo = tipo;
      this.alertaVisivel = true;

      setTimeout(() => {
        this.alertaVisivel = false;
      }, 3000);
    },

    async getTiposSetor() {
      const response = await fetch("http://localhost:3000/tipos_setor");
      const dados = await response.json();
      this.listaTiposSetor = dados;
    },
    async getOpcionais() {
      const response = await fetch("http://localhost:3000/opcionais");
      const dados = await response.json();
      this.listaPacotes = dados.pacote;
      this.listaExtras = dados.extras;
    },
    async criarPedido() {

      if (!this.nomeClientes) {
        this.exibirAlerta("Por favor, informe o seu nome antes de continuar.", "erro");
        return;
      }

      if (!this.setorSelecionado) {
        this.exibirAlerta("Selecione o setor do ingresso antes de confirmar.", "erro");
        return;
      }

      if (!this.evento) {
        this.exibirAlerta("Nenhum evento selecionado. Volte ao menu e escolha um evento.", "alerta");
        return;
      }

      const dadosPedido = {
        nome: this.nomeClientes,
        setor: this.setorSelecionado,
        extras: Array.from(this.listaExtrasSelecionados),
        pacote: Array.from(this.listaPacotesSelecionados),
        evento: this.evento,
        statusId: 5,
      };

      console.log(dadosPedido);

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: dadosJson,
      });

      if (req.ok) {
        this.exibirAlerta("Pedido realizado com sucesso!", "sucesso");
        setTimeout(() => {
          this.$router.push("/pedidos");
        }, 2000);
      } else {
        this.exibirAlerta("Erro ao realizar o pedido. Tente novamente.", "erro");
      }
    },
  },
  mounted() {
    this.getTiposSetor();
    this.getOpcionais();
  },
};
</script>

<style scoped>
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-hamburguer-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid darkgoldenrod;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #222;
  color: darkgoldenrod;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: darkgoldenrod;
  color: #222;
}
</style>