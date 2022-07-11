function post(data) {
    console.log(data);
    fetch("http://localhost:8080/funcionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(data),
    }).then((promisseResponse) =>  {
        console.log(promisseResponse);
        if(promisseResponse.status == 200 || promisseResponse.status == 201) {
            promisseResponse.json().then((response) => {
                // console.log(response.body)
                console.log(response.uri)
            });
        } else {
            alert('Erro')
        }
        
    })
    .catch((error) => {
        console.error("Error:", error);
    });
        
}

function teste(response) {

}

teste(response => {

})

function criarObjeto() {    
    var obj = {
        "id": null,
        "cracha": "",
        "nome": "",
        "setor": ""
    };

    obj.cracha = $("#cracha")[0].value
    obj.nome = $("#nome")[0].value
    obj.setor = $("#setor")[0].value

    post(obj);
}