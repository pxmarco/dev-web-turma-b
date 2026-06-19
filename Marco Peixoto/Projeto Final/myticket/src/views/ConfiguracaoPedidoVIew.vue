<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <PedidoComponent :evento="eventoSelecionado"/>
  </div>
</template>
<script>
import PedidoComponent from '@/components/PedidoComponent.vue';

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponent,
  },
  data() {
    return {
      eventoSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if(query.evento) {
      const decodeEvento = JSON.parse(decodeURIComponent(query.evento));
      this.eventoSelecionado = decodeEvento;
    }
  }
};
</script>
<style scoped></style>