<template>
  <div id="pedidos-view">
    <h1>Meus Ingressos</h1>
    <ListaPedidoComponent />
  </div>
</template>
<script>
import ListaPedidoComponent from '@/components/ListaPedidoComponent.vue';
export default {
  name: "PedidosView",
  components: { ListaPedidoComponent },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

#pedidos-view {
  font-family: 'Poppins', sans-serif;
  background-color: #0f0f0f;
  min-height: 100vh;
  padding: 30px 40px;
  color: #e2e8f0;
}

h1 {
  font-size: 28px;
  color: #e2e8f0;
  margin-bottom: 24px;
  border-left: 4px solid #7c3aed;
  padding-left: 12px;
}
</style>