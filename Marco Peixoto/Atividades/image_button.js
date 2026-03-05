<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Mostrar e Esconder Imagem</title>

<style>
body{
    font-family: Arial;
    text-align: center;
    margin-top: 50px;
}

img{
    width: 300px;
    margin-bottom: 20px;
}

button{
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>

</head>

<body>

<h2>Exemplo simples</h2>

<img id="minhaImagem" src="https://picsum.photos/300" alt="Imagem exemplo">

<br>

<button onclick="mostrarEsconder()">Mostrar / Esconder Imagem</button>

<script>

let visivel = true;

function mostrarEsconder(){
    let img = document.getElementById("minhaImagem");

    if(visivel){
        img.style.display = "none";
        visivel = false;
    }else{
        img.style.display = "block";
        visivel = true;
    }
}

</script>

</body>
</html>
