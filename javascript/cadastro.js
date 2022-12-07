window.onload = function () {
}

function getOne(cracha) {
    $.get("http://localhost:8080/funcionario/get/" + cracha, function (resultado) {
        console.log(resultado);
        $("#funcionario").val(resultado.nome);
        $("#setor").val(resultado.setor);
    })
}

function procurarFuncionario() {
    campo = $("#cracha")[0]
    if (campo.value.length == 8) {
        getOne(campo.value)
    }
}

function postFuncionario(data) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/funcionario",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
    })
}

function postEntrada(data) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/entrada",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
    })
}

function criarObjeto() {
    var funcionario = {
        "cracha": $("#cracha")[0].value,
        "nome": $("#funcionario")[0].value,
        "setor": $("#setor")[0].value
    };
    postFuncionario(funcionario)
    var entrada = {
        "funcionario": funcionario,
        "modalidade": $("#modalidade")[0].value,
        "data": $("#data")[0].value,
        "entradaPrevista": $("#horaEntrada")[0].value,
        "saidaPrevista": $("#horaSaida")[0].value,
        "observacao": $("#observacao")[0].value
    }
    postEntrada(entrada)
    console.log(entrada)
}