<template>
  <div id="lista-wrapper">
    <AlertaComponent
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      :isVisible="alertaVisivel"
    />

    <div v-if="listaPedidosRealizados.length === 0" id="empty-state">
      <p>Nenhum ingresso encontrado.</p>
    </div>

    <div v-else>
      <div id="pedidos-tabela-cabecalho">
        <div class="col-id">#</div>
        <div class="col">Nome</div>
        <div class="col">Evento</div>
        <div class="col">Setor</div>
        <div class="col">Opcionais</div>
        <div class="col">Status</div>
        <div class="col-acao">Ações</div>
      </div>

      <div
        class="pedidos-tabela-linha"
        v-for="pedido in listaPedidosRealizados"
        :key="pedido.id"
      >
        <div class="col-id">{{ pedido.id }}</div>
        <div class="col">{{ pedido.nome }}</div>
        <div class="col">{{ pedido.evento.nome }}</div>
        <div class="col">{{ pedido.setor.descricao }}</div>
        <div class="col">
          <ul>
            <li v-for="(pacote, index) in pedido.pacote" :key="'p'+index">{{ pacote.nome }}</li>
          </ul>
          <ul>
            <li v-for="(extra, index) in pedido.extras" :key="'e'+index">{{ extra.nome }}</li>
          </ul>
        </div>
        <div class="col">
          <select @change="atualizarStatusPedido($event, pedido.id)" class="status-select">
            <option value="">Selecione</option>
            <option
              v-for="status in listaStatusPedido"
              :key="status.id"
              :value="status.id"
              :selected="status.id == pedido.statusId"
            >{{ status.descricao }}</option>
          </select>
        </div>
        <div class="col-acao">
          <button class="btn-deletar" @click="deletarPedido($event, pedido.id)">❌</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: { AlertaComponent },
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
      setTimeout(() => { this.alertaVisivel = false; }, 3000);
    },
    async consultarPedidos() {
      const response = await fetch("https://api-myticket.onrender.com/pedidos");
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch("https://api-myticket.onrender.com/status_pedido");
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      await fetch(`https://api-myticket.onrender.com/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ statusId: idPedidoAtualizado }),
      });
    },
    async deletarPedido(event, idPedido) {
      await fetch(`https://api-myticket.onrender.com/pedidos/${idPedido}`, {
        method: "DELETE",
      });
      await this.consultarPedidos();
      this.exibirAlerta("Ingresso removido com sucesso!", "sucesso");
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

#lista-wrapper {
  font-family: 'Poppins', sans-serif;
}

#empty-state p {
  color: #94a3b8;
  font-size: 16px;
  margin-top: 40px;
}

#pedidos-tabela-cabecalho,
.pedidos-tabela-linha {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
}

#pedidos-tabela-cabecalho {
  background-color: #1a1a2e;
  border-radius: 8px;
  font-weight: 700;
  color: #a78bfa;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.pedidos-tabela-linha {
  background-color: #12122a;
  border-radius: 8px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #e2e8f0;
  border: 1px solid #2d2d4e;
  transition: border-color 0.2s;
}

.pedidos-tabela-linha:hover {
  border-color: #7c3aed;
}

.col-id { width: 4%; text-align: center; }
.col { width: 17%; }
.col-acao { width: 5%; text-align: center; }

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

.status-select {
  background-color: #1a1a2e;
  color: #e2e8f0;
  border: 1px solid #2d2d4e;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  cursor: pointer;
}

.btn-deletar {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #f87171;
  font-weight: 700;
  transition: transform 0.2s, color 0.2s;
}

.btn-deletar:hover {
  transform: scale(1.2);
  color: #ef4444;
}
</style>