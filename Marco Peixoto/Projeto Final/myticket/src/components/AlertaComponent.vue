<template>
  <div v-if="isVisible" :class="['alerta', `alerta-${tipo}`]">
    <span class="alerta-icone">{{ icone }}</span>
    <span class="alerta-mensagem">{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",

  props: {
    mensagem: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      default: "info",
      // valores aceitos: "erro", "alerta", "info", "sucesso"
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    icone() {
      const icones = {
        erro: "✖",
        alerta: "⚠",
        info: "ℹ",
        sucesso: "✔",
      };
      return icones[this.tipo] || "ℹ";
    },
  },
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  margin: 16px 0;
  border-left: 6px solid;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.alerta-icone {
  font-size: 20px;
}

/* Erro — vermelho */
.alerta-erro {
  background-color: #fde8e8;
  color: #b91c1c;
  border-color: #b91c1c;
}

/* Alerta — laranja */
.alerta-alerta {
  background-color: #fff3e0;
  color: #c2650a;
  border-color: #f97316;
}

/* Info — azul */
.alerta-info {
  background-color: #e0f0ff;
  color: #1d4ed8;
  border-color: #3b82f6;
}

/* Sucesso — verde */
.alerta-sucesso {
  background-color: #dcfce7;
  color: #15803d;
  border-color: #22c55e;
}
</style>