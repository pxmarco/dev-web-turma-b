# MyTicket

Sistema de compra de ingressos para eventos, adaptado a partir do projeto T-Burguer desenvolvido em sala de aula.

## O que mudou

O sistema deixou de ser uma hamburgueria e passou a ser uma plataforma de ingressos para shows e festivais. As principais mudanças foram:

O nome e a identidade visual foram trocados. A cor principal agora é roxa com fundo escuro e a fonte utilizada é Poppins.

O campo "Ponto da Carne" foi substituído pelo campo "Setor do Ingresso", onde o usuário escolhe entre Pista, Camarote, VIP ou Backstage.

Os complementos e bebidas viraram pacotes e extras, como Combo VIP, Kit Foto Oficial, Camiseta do Evento e Meet and Greet.

No banco de dados, as chaves foram renomeadas:

```json
"tipos_setor": [
  { "id": 1, "descricao": "Pista" },
  { "id": 2, "descricao": "Camarote" },
  { "id": 3, "descricao": "VIP" },
  { "id": 4, "descricao": "Backstage" }
]
```

## Como os alertas funcionam

Foi criado um componente chamado AlertaComponent.vue que recebe três props: mensagem, tipo e isVisible. O componente fica oculto até que isVisible seja true.

```vue
<AlertaComponent
  :mensagem="alertaMensagem"
  :tipo="alertaTipo"
  :isVisible="alertaVisivel"
/>
```

O tipo define a cor do alerta: erro usa vermelho, alerta usa laranja, info usa azul e sucesso usa verde.

O método abaixo é chamado sempre que uma ação acontece. Ele ativa o alerta e depois de 3 segundos some automaticamente:

```javascript
exibirAlerta(mensagem, tipo) {
  this.alertaMensagem = mensagem;
  this.alertaTipo = tipo;
  this.alertaVisivel = true;

  setTimeout(() => {
    this.alertaVisivel = false;
  }, 3000);
},
```

Antes de confirmar o pedido, o sistema valida se o nome e o setor foram preenchidos:

```javascript
if (!this.nomeClientes) {
  this.exibirAlerta("Por favor, informe o seu nome antes de continuar.", "erro");
  return;
}
if (!this.setorSelecionado) {
  this.exibirAlerta("Selecione o setor do ingresso antes de confirmar.", "erro");
  return;
}
```

Após o pedido ser criado com sucesso, o sistema redireciona automaticamente para a tela de ingressos:

```javascript
if (req.ok) {
  this.exibirAlerta("Pedido realizado com sucesso!", "sucesso");
  setTimeout(() => { this.$router.push("/pedidos"); }, 2000);
}
```

## Links

API: https://api-myticket.onrender.com

Projeto publicado: https://myticket-kappa.vercel.app

Repositório: https://github.com/pxmarco/myticket

Repositório da API: https://github.com/pxmarco/api-myticket
