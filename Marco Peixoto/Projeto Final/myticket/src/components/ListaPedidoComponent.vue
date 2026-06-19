<template>
  <div>
    <AlertaComponent
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      :isVisible="alertaVisivel"
    />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Evento</div>
          <div>Setor</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.evento.nome }}</div>
      <div>{{ pedido.setor.descricao }}</div>
      <div>
        <ul>
          <li v-for="(pacote, index) in pedido.pacote" :key="index">
            {{ pacote.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(extra, index) in pedido.extras" :key="index">
            {{ extra.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          @change="atualizarStatusPedido($event, pedido.id)"
          name="status"
          class="status"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
          @click="deletarPedido($event, pedido.id)"
          style="cursor: pointer;"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",

  components: {
    AlertaComponent,
  },

  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
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

    async consultarPedidos() {
      const response = await fetch("http://localhost:3000/pedidos");
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch("http://localhost:3000/status_pedido");
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      await fetch(`http://localhost:3000/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });
      //fazer algo após alterar
    },
    async deletarPedido(event, idPedido) {
      await fetch(`http://localhost:3000/pedidos/${idPedido}`, {
        method: "DELETE",
      });
      await this.consultarPedidos();
      this.exibirAlerta("Pedido removido com sucesso!", "sucesso");
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>
<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #222;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #222;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}
</style>