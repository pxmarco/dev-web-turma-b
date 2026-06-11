<template>
  <div class="pagina">

    <header class="cabecalho">
      <h1>Álbum de Figurinhas</h1>
      <p>Selecione uma seleção para ver o elenco</p>
    </header>

    <div class="selecao">
      <label for="pais">Escolha uma seleção:</label>
      <select id="pais" v-model="paisSelecionado" @change="carregarFigurinhas">
        <option value="">-- Selecione --</option>
        <option v-for="pais in paises" :key="pais.code" :value="pais.name">
          {{ pais.name }}
        </option>
      </select>
    </div>

    <p v-if="erro" class="erro">{{ erro }}</p>
    <p v-if="carregando" class="status">Carregando figurinhas...</p>

    <div v-if="jogadores.length > 0" class="grid">
      <div v-for="jogador in jogadores" :key="jogador.id" class="card">
        <img :src="jogador.photo" :alt="jogador.name" @error="imgFallback" />
        <div class="info">
          <strong>{{ jogador.name }}</strong>
          <span>{{ jogador.position }}</span>
          <span class="numero">#{{ jogador.number }}</span>
        </div>
      </div>
    </div>

    <p v-if="!paisSelecionado && !carregando" class="status">
      Nenhuma seleção escolhida ainda.
    </p>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_KEY = 'e14912b7be2fbbe498faa4b3b1ee5a17'
const USAR_MOCK = true

import mockPaises from './mock/paises.json'
import mockElenco from './mock/elenco.json'

const paises          = ref([])
const jogadores       = ref([])
const paisSelecionado = ref('')
const carregando      = ref(false)
const erro            = ref('')


onMounted(async () => {
  if (USAR_MOCK) {
    paises.value = mockPaises
    return
  }

  try {
    const response = await fetch('https://v3.football.api-sports.io/teams/countries', {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY
      }
    })
    const dados = await response.json()
    paises.value = dados.response
  } catch (e) {
    erro.value = 'Erro ao carregar países.'
    console.error(e)
  }
})

const carregarFigurinhas = async () => {
  erro.value = ''
  jogadores.value = []

  if (!paisSelecionado.value) return

  if (USAR_MOCK) {
    carregando.value = true
    await new Promise(resolve => setTimeout(resolve, 600))
    jogadores.value = mockElenco
    carregando.value = false
    return
  }

  carregando.value = true

  try {
    const responseTime = await fetch(
      `https://v3.football.api-sports.io/teams?name=${paisSelecionado.value}`,
      {
        method: 'GET',
        headers: {
          'x-apisports-key': API_KEY
        }
      }
    )
    const dadosTime = await responseTime.json()

    const teamId = dadosTime.response[0].team.id

    const responseElenco = await fetch(
      `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
      {
        method: 'GET',
        headers: {
          'x-apisports-key': API_KEY
        }
      }
    )
    const dadosElenco = await responseElenco.json()

    jogadores.value = dadosElenco.response[0].players

  } catch (e) {
    erro.value = 'Erro ao carregar elenco. Verifique sua chave de API.'
    console.error(e)
  } finally {
    carregando.value = false
  }
}

const imgFallback = (e) => {
  e.target.src = 'https://via.placeholder.com/80x80?text=?'
}
</script>

<style scoped>
.pagina {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: sans-serif;
}

.cabecalho {
  text-align: center;
  margin-bottom: 2rem;
}

.cabecalho h1 {
  font-size: 2rem;
  margin-bottom: 0.3rem;
}

.cabecalho p {
  color: #666;
}

.selecao {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.selecao select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.status {
  text-align: center;
  color: #888;
  margin-top: 2rem;
}

.erro {
  text-align: center;
  color: #c0392b;
  margin-top: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  background: #fafafa;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  background: #eee;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.85rem;
}

.info strong {
  font-size: 0.95rem;
}

.numero {
  color: #888;
  font-size: 0.8rem;
}
</style>
