function getOneFuncionario(cracha) {
    $.get("http://localhost:8080/funcionario/get/" + cracha, function (resultado) {
        $("#funcionario").val(resultado.nome);
        $("#setor").val(resultado.setor);
    })
}

function toDate(milissegundos) {
    dateFormat = new Date(milissegundos)
    return zeroLeft(2, dateFormat.getDate()) +
        "/" + zeroLeft(2, (dateFormat.getMonth() + 1)) +
        "/" + dateFormat.getFullYear()
}

function toHour(milissegundos) {
    dateFormat = new Date(milissegundos)
    return zeroLeft(2, dateFormat.getHours()) +
        ":" + zeroLeft(2, dateFormat.getMinutes())
}

function zeroLeft(tamanho, numero) {
    var a = ""
    if ((numero + "").length < tamanho) {
        while (a.length < tamanho-(numero + "").length) {
            a += "0"
        }
        return a += numero
    } else {
        return numero
    }
}

function getAllEntradas() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/entrada/get/all"
    }
    )
        .done(function (resultado) {
            resultado.forEach(function (entrada) {
                var row = $("<tr class='table-row'>")
                var col
                var dateFormat

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

                col += ("<td onmouseup='deleteEntrada("+entrada.id+")'>" + "<i class='fa fa-trash'></i>" + "</td>")
                col += ("<td onmouseup='updateEntrada("+entrada.id+")'>" + "<i class='fa fa-pencil'></i>" + "</td>")

                row.append(col)
                $("#tab").append(row)
            })
        })
        .fail(function (erro) {
            alert("Erro no servidor ao tentar pegar informações das entradas...")
            console.log(erro.responseJSON)
        })
}

function getAllFuncionarios() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/funcionario/get/all"
    }
    )
        .done(function (resultado) {
            resultado.forEach(function (funcionario) {
                var row = $("<tr class='table-row'>")
                var col
                var dateFormat

                col += ("<td>" + zeroLeft(8, funcionario.cracha) + "</td>")
                col += ("<td>" + funcionario.nome + "</td>")
                col += ("<td>" + funcionario.setor + "</td>")

                col += ("<td onmouseup='deleteFuncionario("+funcionario.cracha+")'>" + "<i class='fa fa-trash'></i>" + "</td>")
                col += ("<td onmouseup='updateFuncionario("+funcionario.cracha+")'>" + "<i class='fa fa-pencil'></i>" + "</td>")

                row.append(col)
                $("#tab-funcionarios").append(row)
            })
        })
        .fail(function (erro) {
            alert("Erro no servidor ao tentar pegar informações dos funcionarios...")
            console.log(erro.responseJSON)
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
        method: "POST",
        url: "http://localhost:8080/funcionario",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
    })
        .done(function (success) {
            alert("Funcionário salvo com sucesso!");
        })
        .fail(function (erro) {
            alert("Erro no servidor ao tentar pegar informações dos funcionarios...")
        })
        .always(function (complete) {
            console.log(complete.responseJSON)
        })
}

function postEntrada(data) {
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/entrada",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
    })
        .done(function (success) {
            alert("Entrada salva com sucesso!");
        })
        .fail(function (erro) {
            alert("Erro ao tentar salvar a Entrada.\nErro: " + erro.responseJSON.error)
        })
        .always(function (complete) {
            console.log(complete)
        })
}

function deleteFuncionario(cracha){
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/funcionario/delete/"+cracha,
    })
}

function deleteEntrada(id){
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/entrada/delete/"+id,
    })
}

function criarObjeto() {
    var funcionario = {
        "cracha": $("#cracha")[0].value,
        "nome": $("#funcionario")[0].value,
        "setor": $("#setor")[0].value
    };
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
    getAllFuncionarios()
}