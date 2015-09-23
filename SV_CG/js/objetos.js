document.onkeydown = function(e){
    if (e.keyCode == 87)
        projecao.pontoDeVista.y += 1;
    else if (e.keyCode == 83)
        projecao.pontoDeVista.y -= 1;
    else if (e.keyCode == 65)
        projecao.pontoDeVista.x -= 1;
    else if (e.keyCode == 68)
        projecao.pontoDeVista.x += 1;
    document.getElementById("pv-x").value = projecao.pontoDeVista.x;
    document.getElementById("pv-y").value = projecao.pontoDeVista.y;
    projecao.projeta();
}

function hideChecked(){
    projecao.facesOcultas = document.getElementById("hideCheck").checked;
}

function getRadio(value){
    projecao.tipoProjecao = value;
}

function getEvent(e, type){
    if (e.keyCode == 13){
        if (type == "nv")
            getNumeroVertice();
        else if (type == "numeroFaces")
            getNumeroFace();
    }
}

function getNumeroVertice(){
    var nv = document.getElementById("vertices");
    var n_vertices = parseInt(nv.value);

    projecao.numeroVertices = n_vertices;
    appendInput(n_vertices, 3, "desc-vertices", "vertices",
            "nvobject", "V", "campo-preenchimento", "number", "0","table-vertices");
    document.getElementById("desc-vertices").className -="hide";
}

function getNumeroFace(){
    var numeroFaces = document.getElementById("faces");
    var n_faces = parseInt(numeroFaces.value);

    projecao.numeroFaces = n_faces;
    appendInput(n_faces, 1, "desc-faces", "faces",
            "nsobject", "S", "boxSizeVL", "text", "","table-faces");
            document.getElementById("desc-faces").className -="hide"
}

function appendInput(n, n_input, id_parent, id_input, name_input,
        type, box_type, type_input, value,tabela){

          var table = document.getElementById(tabela);
          var numLinhas = table.rows.length;
          var linhas = numLinhas;

          //remover linhas antigas, caso existam
          if(box_type == "V"){
            for(var i = linhas-1; i >= 2; i--){
              table.deleteRow(i);
              numLinhas--;
            }
          }else{
            for(var i = linhas; i > 1; i--){
              table.deleteRow(i-1);
              numLinhas--;
            }
          }


            var elem = document.getElementById(id_parent);
            for (var i = 1; i <= n; i++){
                var novaLinha = table.insertRow(numLinhas++);
                var cel0 = novaLinha.insertCell(0);
                cel0.innerHTML = i;
                var text = type + (i) + ":";
                var id = type + (i-1);
                for (var j = 1; j <= n_input; j++){
                    var cel = novaLinha.insertCell(j);
                    var id = (i-1)*n_input + j-1;
                    var input = createInput(id_input + id, name_input + id,
                            box_type, type_input, value);
                    cel.appendChild(input);
                }
            }
        }

function createInput(id, name, className, type, value){
    var input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.value = value;
    input.className = className;
    input.name = name;
    return input;
}

function getFormSurfaceVertices(form){
    projecao.faces = [];
    var n_faces = projecao.numeroFaces;
    for (var i = 0; i < n_faces; i++){
        var s = form.elements["nsobject" + i].value.split("-");
        var surface = [];
        for (var j = 0; j < s.length; j++){
            var vt = parseInt(s[j]);
            surface.push({vt: [vt, projecao.verticesCoordenadas[vt - 1]]});
        }
        projecao.faces.push(surface);
    }
}

function getFormView(form){
    projecao.pontoDeVista.x = parseInt(form.pvx.value);
    projecao.pontoDeVista.y = parseInt(form.pvy.value);
    projecao.pontoDeVista.z = parseInt(form.pvz.value);
}

function getFormProjection(form){
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


function getFormVertices(form){
    projecao.verticesCoordenadas = [];
    var n_vertices = projecao.numeroVertices;
    var x,y,z,counter = 0;
    for (var i = 0; i < n_vertices*3; i++){
        if (i % 3 == 0){
            x = form.elements["nvobject" + i].value;
        } else if (i % 3 == 1){
            y = form.elements["nvobject" + i].value;
        } else if (i % 3 == 2){
            z = form.elements["nvobject" + i].value;
        }
        counter++;
        if (counter == 3){
            counter = 0;
            projecao.adicionaVertice(parseInt(x), parseInt(y), parseInt(z));
        }
    }
}

function getForm(form){
    hideChecked();
    getFormView(form);
    getFormProjection(form);
    getFormVertices(form);
    getFormSurfaceVertices(form);
   if(validar()){
    projecao.projeta();
  }else{
    alert('Preencha todos os campos!');
  }
}
