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
    alert("post")
    console.log("post")
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/funcionario",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
       })
}

function criarObjeto() {
    alert("criar")
    console.log("criar")
    var funcionario = {
        "cracha": $("#cracha")[0].value,
        "nome": $("#funcionario")[0].value,
        "setor": $("#setor")[0].value
    };
    console.log(funcionario)
    post(funcionario)
}

function procurarFuncionario(){
    campo = $("#cracha")[0]
    if(campo.value.length == 8){
        getOne(campo.value)
    }
}