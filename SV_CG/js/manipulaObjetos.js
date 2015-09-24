function getDados(form){
    faceOculta();
    getPontosPlano(form);
    getPontoDeVista(form);
    getVertices(form);
    getFaces(form);
   if(validar()){
    projecao.projeta();
  }else{
    alert('Preencha todos os campos!');
  }
}

//verifica Face Oculta
function faceOculta(){
    projecao.facesOcultas = document.getElementById("fo").checked;
}

//pega pontos do plano
function getPontosPlano(form){
    projecao.planoProjecao.p1.x = parseInt(form.pp_p1_x.value);
    projecao.planoProjecao.p1.y = parseInt(form.pp_p1_y.value);
    projecao.planoProjecao.p1.z = parseInt(form.pp_p1_z.value);

    projecao.planoProjecao.p2.x = parseInt(form.pp_p2_x.value);
    projecao.planoProjecao.p2.y = parseInt(form.pp_p2_y.value);
    projecao.planoProjecao.p2.z = parseInt(form.pp_p2_z.value);

    projecao.planoProjecao.p3.x = parseInt(form.pp_p3_x.value);
    projecao.planoProjecao.p3.y = parseInt(form.pp_p3_y.value);
    projecao.planoProjecao.p3.z = parseInt(form.pp_p3_z.value);
}

//pega pontos de vista
function getPontoDeVista(form){
    projecao.pontoDeVista.x = parseInt(form.pvx.value);
    projecao.pontoDeVista.y = parseInt(form.pvy.value);
    projecao.pontoDeVista.z = parseInt(form.pvz.value);
}

//pega Vertices
function getVertices(form){
    var x,y,z,contador = 0;
    var v = projecao.numeroVertices;
    projecao.verticesCoordenadas = [];
    for (var i = 0; i < v*3; i++){
        if (i % 3 == 0){
            x = form.elements["nv" + i].value;
        } else if (i % 3 == 1){
            y = form.elements["nv" + i].value;
        } else if (i % 3 == 2){
            z = form.elements["nv" + i].value;
        }
        contador++;
        if (contador == 3){
            contador = 0;
            projecao.adicionaVertice(parseInt(x), parseInt(y), parseInt(z));
        }
    }
}

//pega Faces
function getFaces(form){
    var n_faces = projecao.numeroFaces;
    projecao.faces = [];
    for (var i = 0; i < n_faces; i++){
        var s = form.elements["ns" + i].value.split(" ");
        var f = [];
        for (var j = 0; j < s.length; j++){
            var vt = parseInt(s[j]);
            f.push({vt: [vt, projecao.verticesCoordenadas[vt - 1]]});
        }
        projecao.faces.push(f);
    }
}

// Pega Tipo de Projecao
function getDefinicao(valor){
    projecao.tipoProjecao = valor;
}

//Pega Vertices
function getNumeroVertice(){
    var v = parseInt(document.getElementById("vertices").value);
    projecao.numeroVertices = v;
    incluiInput(v, 3, "vertices", "nv", "V", "campo-preenchimento", "number", "0","table-vertices");
    document.getElementById("desc-vertices").className -="hide";
}

//Pega Faces
function getNumeroFace(){
    var f = parseInt(document.getElementById("faces").value);
    projecao.numeroFaces = f;
    incluiInput(f, 1, "faces", "ns", "F", "", "text", "","table-faces");
    document.getElementById("desc-faces").className -="hide"
}

//Adiciona na tabela os vertices e faces
function incluiInput(qtd_linhas, qtd_colunas, id_objeto, nome_objeto,
        tipo, classe, tipo_objeto, valor,tabela){

          var t = document.getElementById(tabela);
          var numLinhas = t.rows.length;
          var linhas = numLinhas;

          //remover linhas antigas, caso existam
          if(classe == "V"){
            for(var i = linhas-1; i >= 2; i--){
              t.deleteRow(i);
              numLinhas--;
            }
          }else{
            for(var i = linhas; i > 1; i--){
              t.deleteRow(i-1);
              numLinhas--;
            }
          }
            for (var i = 1; i <= qtd_linhas; i++){
                var novaLinha = t.insertRow(numLinhas++);
                var cel0 = novaLinha.insertCell(0);
                cel0.innerHTML = i;
                var id = tipo + (i-1);
                for (var j = 1; j <= qtd_colunas; j++){
                    var cel = novaLinha.insertCell(j);
                    var id = (i-1)*qtd_colunas + j-1;
                    var input = geraInput(id_objeto + id, nome_objeto + id,
                            classe, tipo_objeto, valor);
                    cel.appendChild(input);
                }
            }
        }

//cria input para linha da tabela
function geraInput(id, nome, classe, tipo, valor){
    var input = document.createElement("input");
    input.type = tipo;
    input.id = id;
    input.value = valor;
    input.className = classe;
    input.name = nome;
    return input;
}

//Atualiza numero de Vertices e Faces com o Enter
function geraVerticesFaces(e, tipo){
    if (e.keyCode == 13){
        if (tipo == "numeroVertices")
            getNumeroVertice();
        else if (tipo == "numeroFaces")
            getNumeroFace();
    }
}

//Ativa mudança nos pontos de vista x, y e z
document.onkeydown = function(tecla){
    if (tecla.keyCode == 87){ // tecla w
      projecao.pontoDeVista.y += 1;
    } else if (tecla.keyCode == 83){ // tecla s
      projecao.pontoDeVista.y -= 1;
    } else if (tecla.keyCode == 65){ // tecla a
      projecao.pontoDeVista.x -= 1;
    } else if (tecla.keyCode == 68){ // tecla d
      projecao.pontoDeVista.x += 1;
    } else if(tecla.keyCode == 82){ //tecla r
      projecao.pontoDeVista.z += 1;
    } else if(tecla.keyCode == 70){ //tecla f
      projecao.pontoDeVista.z -= 1;
    }
    document.getElementById("pv-x").value = projecao.pontoDeVista.x;
    document.getElementById("pv-y").value = projecao.pontoDeVista.y;
    document.getElementById("pv-z").value = projecao.pontoDeVista.z;
    projecao.projeta();
}
