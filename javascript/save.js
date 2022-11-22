let barraAtiva = false

window.onload = function(){
}

function getOne(cracha){
    $.get("http://localhost:8080/funcionario/get/"+cracha, function(resultado){
        console.log(resultado);
        $("#funcionario").val(resultado.nome);
        $("#setor").val(resultado.setor);
   })
}

function post(data) {
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/funcionario/txt",
        data,
       })
}

function criarObjeto() {
    var funcionario = {
        "cracha": $("#cracha")[0].value,
        "nome": $("#funcionario")[0].value,
        "setor": $("#setor")[0].value
    };

    post(funcionario)
}

function mudarBarra(){
    if(barraAtiva){
        $("#conteudo")[0].style.display = "none";
        $("#btn-cadastrar")[0].style.display = "block";
    }else if(!barraAtiva){
        $("#conteudo")[0].style.display = "flex";
        $("#btn-cadastrar")[0].style.display = "none";
    }
    barraAtiva = !barraAtiva
}

function procurarFuncionario(){
    campo = $("#cracha")[0]
    if(campo.value.length == 8){
        getOne(campo.value)
    }
}