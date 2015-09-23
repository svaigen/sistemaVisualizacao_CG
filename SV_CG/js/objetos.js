document.onkeydown = function(e){
    if (e.keyCode == 87)
        projection.view_point.y += 1;
    else if (e.keyCode == 83)
        projection.view_point.y -= 1;
    else if (e.keyCode == 65)
        projection.view_point.x -= 1;
    else if (e.keyCode == 68)
        projection.view_point.x += 1;
    document.getElementById("pv-x").value = projection.view_point.x;
    document.getElementById("pv-y").value = projection.view_point.y;
    projection.projeta();
}

function hideChecked(){
    projection.hide = document.getElementById("hideCheck").checked;
}

function getRadio(value){
    projection.type = value;
}

function getEvent(e, type){
    if (e.keyCode == 13){
        if (type == "nv")
            getNumeroVertice();
        else if (type == "ns")
            getNumeroFace();
    }
}

function getNumeroVertice(){
    var nv = document.getElementById("vertices");
    var n_vertices = parseInt(nv.value);

    projection.setNumeroVertice(n_vertices);
    appendInput(n_vertices, 3, "desc-vertices", "vertices",
            "nvobject", "V", "campo-preenchimento", "number", "0","table-vertices");
            document.getElementById("desc-vertices").className -="hide"
}

function getNumeroFace(){
    var ns = document.getElementById("faces");
    var n_surfaces = parseInt(ns.value);

    projection.setNumeroFace(n_surfaces);
    appendInput(n_surfaces, 1, "desc-faces", "faces",
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
                cel0.innerHTML = "V"+i;
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
    projection.surfaces = [];
    var n_surfaces = projection.getNumeroFace();
    for (var i = 0; i < n_surfaces; i++){
        var s = form.elements["nsobject" + i].value.split("-");
        var surface = [];
        for (var j = 0; j < s.length; j++){
            var vt = parseInt(s[j]);
            surface.push({vt: [vt, projection.vertices_coord[vt - 1]]});
        }
        projection.surfaces.push(surface);
    }
}

function getFormView(form){
    projection.view_point.x = parseInt(form.pvx.value);
    projection.view_point.y = parseInt(form.pvy.value);
    projection.view_point.z = parseInt(form.pvz.value);
}

function getFormProjection(form){
    projection.plane.p1.x = parseInt(form.pp_p1_x.value);
    projection.plane.p1.y = parseInt(form.pp_p1_y.value);
    projection.plane.p1.z = parseInt(form.pp_p1_z.value);

    projection.plane.p2.x = parseInt(form.pp_p2_x.value);
    projection.plane.p2.y = parseInt(form.pp_p2_y.value);
    projection.plane.p2.z = parseInt(form.pp_p2_z.value);

    projection.plane.p3.x = parseInt(form.pp_p3_x.value);
    projection.plane.p3.y = parseInt(form.pp_p3_y.value);
    projection.plane.p3.z = parseInt(form.pp_p3_z.value);
}


function getFormVertices(form){
    projection.vertices_coord = [];
    var n_vertices = projection.getNumeroVertice();
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
            projection.setNovoVertice(parseInt(x), parseInt(y), parseInt(z));
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
    projection.projeta();
  }else{
    alert('Preencha todos os campos!');
  }
}
