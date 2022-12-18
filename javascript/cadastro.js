function getOneFuncionario(cracha) {
    $.get("http://localhost:8080/funcionario/get/" + cracha, function (resultado) {
        $("#funcionario").val(resultado.nome);
        $("#setor").val(resultado.setor);
    })
}

function toDate(milissegundos) {
    dateFormat = new Date(milissegundos)
    return zeroLeft(2,dateFormat.getDate()) +
        "/" + zeroLeft(2,(dateFormat.getMonth() + 1)) +
        "/" + dateFormat.getFullYear()
}

function toHour(milissegundos) {
    dateFormat = new Date(milissegundos)
    return zeroLeft(2, dateFormat.getHours()) +
        ":" + zeroLeft(2, dateFormat.getMinutes())
}

function zeroLeft(tamanho, numero) {
    var a = ""
    if ((numero+"").length < tamanho) {
        while (a.length + 1 < tamanho) {
            a += "0"
        }
        return a += numero
    } else {
        return numero
    }
}

function getAllEntradas(cracha) {
    $.get("http://localhost:8080/entrada/get/all", function (resultado) {
        resultado.forEach(function (entrada) {
            let row = $("<tr>")
            let col
            let dateFormat

            col += ("<td>" + entrada.id + "</td>")
            col += ("<td>" + toDate(entrada.data) + "</td>")
            col += ("<td>" + zeroLeft(8, entrada.funcionario.cracha) + "</td>")
            col += ("<td>" + entrada.funcionario.nome + "</td>")
            col += ("<td>" + entrada.funcionario.setor + "</td>")
            col += ("<td>" + entrada.modalidade + "</td>")
            col += ("<td>" + toHour(entrada.entradaPrevista) + "</td>")
            col += ("<td>" + toHour(entrada.saidaPrevista) + "</td>")
            col += ("<td>" + toHour(entrada.entradaValidada) + "</td>")
            col += ("<td>" + toHour(entrada.saidaValidada) + "</td>")
            col += ("<td>" + toHour(entrada.horas) + "</td>")
            col += ("<td>" + entrada.observacao + "</td>")

            col += ("<td>" + "<i class='fa fa-trash'></i>" + "</td>")
            col += ("<td>" + "<i class='fa fa-pencil'></i>" + "</td>")

            row.append(col)
            $("#tab").append(row)
        })
    })
}

function procurarFuncionario() {
    campo = $("#cracha")[0]
    if (campo.value.length == 8) {
        getOneFuncionario(campo.value)
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
        "data": $("#data")[0].value,
        "funcionario": funcionario,
        "modalidade": $("#modalidade")[0].value,
        "entradaPrevista": $("#horaEntrada")[0].value,
        "saidaPrevista": $("#horaSaida")[0].value,
        "observacao": $("#observacao")[0].value
    }
    postEntrada(entrada)
}

window.onload = function () {
    getAllEntradas()
}