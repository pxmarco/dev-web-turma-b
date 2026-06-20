<template>
  <div id="pedido-wrapper">
    <div id="pedido-header">
      <img id="foto-content" :src="evento && evento.foto ? evento.foto : ''" />
      <div id="header-overlay">
        <p id="nome-hamburguer-content">{{ evento && evento.nome ? evento.nome : "--" }}</p>
        <p id="preco-hamburguer-content" v-if="evento">R$ {{ evento.valor }},00</p>
      </div>
    </div>

    <div id="pedido-form-box">
      <AlertaComponent
        :mensagem="alertaMensagem"
        :tipo="alertaTipo"
        :isVisible="alertaVisivel"
      />

      <form id="pedido-form" @submit.prevent="criarPedido">

        <div class="inputs">
          <label>Nome do comprador</label>
          <input v-model="nomeClientes" type="text" placeholder="Digite seu nome" id="nome-cliente" />
        </div>

        <div class="inputs">
          <label>Setor do ingresso</label>
          <select v-model="setorSelecionado" name="setor" id="setor">
            <option value="">Selecione o setor</option>
            <option v-for="setor in listaTiposSetor" :key="setor.id" :value="setor">
              {{ setor.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label>Pacotes</label>
          <div v-for="pacote in listaPacotes" :key="pacote.id" class="checkbox-container">
            <input type="checkbox" :value="pacote" v-model="listaPacotesSelecionados" />
            <span>{{ pacote.nome }}</span>
          </div>
        </div>

        <div class="inputs">
          <label>Extras</label>
          <div v-for="extra in listaExtras" :key="extra.id" class="checkbox-container">
            <input type="checkbox" :value="extra" v-model="listaExtrasSelecionados" />
            <span>{{ extra.nome }}</span>
          </div>
        </div>

        <input type="submit" class="submit-btn" value="Confirmar pedido" />

      </form>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "PedidoComponent",
  components: { AlertaComponent },
  props: { evento: null },
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
      setTimeout(() => { this.alertaVisivel = false; }, 3000);
    },
    async getTiposSetor() {
      const response = await fetch("https://api-myticket.onrender.com/tipos_setor");
      this.listaTiposSetor = await response.json();
    },
    async getOpcionais() {
      const response = await fetch("https://api-myticket.onrender.com/opcionais");
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
      const req = await fetch("https://api-myticket.onrender.com/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosPedido),
      });
      if (req.ok) {
        this.exibirAlerta("Pedido realizado com sucesso!", "sucesso");
        setTimeout(() => { this.$router.push("/pedidos"); }, 2000);
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

#pedido-wrapper {
  font-family: 'Poppins', sans-serif;
  background-color: #0f0f0f;
  min-height: 100vh;
  color: #e2e8f0;
}

#pedido-header {
  position: relative;
  height: 220px;
  overflow: hidden;
}

#foto-content {
  width: 100%;
  height: 220px;
  object-fit: cover;
  filter: brightness(0.4);
}

#header-overlay {
  position: absolute;
  bottom: 20px;
  left: 40px;
}

#nome-hamburguer-content {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

#preco-hamburguer-content {
  font-size: 22px;
  color: #a78bfa;
  margin: 4px 0 0 0;
}

#pedido-form-box {
  max-width: 600px;
  margin: 30px auto;
  padding: 0 20px;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
}

label {
  font-weight: 600;
  color: #a78bfa;
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-left: 3px solid #7c3aed;
  padding-left: 10px;
}

input[type="text"],
select {
  padding: 12px 14px;
  width: 100%;
  border: 1px solid #2d2d4e;
  border-radius: 8px;
  background-color: #1a1a2e;
  color: #e2e8f0;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  height: auto;
}

select {
  cursor: pointer;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #1a1a2e;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #2d2d4e;
  cursor: pointer;
}

.checkbox-container span {
  font-size: 14px;
  color: #e2e8f0;
}

.checkbox-container input {
  width: 16px;
  height: 16px;
  accent-color: #7c3aed;
}

.submit-btn {
  background-color: #7c3aed;
  color: #fff;
  font-weight: 700;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #5b21b6;
}
</style>