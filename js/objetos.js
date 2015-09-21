function geraVerticesEFaces(){
  var vertices = parseInt(document.getElementById("vertices").value);
  var faces = parseInt(document.getElementById("faces").value);
  geraCamposVertices("table-vertices",vertices);
  geraCamposFaces("table-faces",faces,vertices);
  document.getElementById("desc-vertices").className -="hide";
  document.getElementById("desc-faces").className -="hide";
}

function geraCamposVertices(tabela,n){
  var table = document.getElementById(tabela);
  var numLinhas = table.rows.length;

  //laço para remover linhas antigas, caso existam
  for(var i = numLinhas-1; i >= 2; i--){
    table.deleteRow(i);
  }

  //preenchendo a tabela com as faces
  for(var i = 1; i <= n; i++){
    var novaLinha = table.insertRow(i+1);
    var cel0 = novaLinha.insertCell(0);
    cel0.innerHTML = "V"+i;
    for(var j = 1; j<=3; j++){
      var cel = novaLinha.insertCell(j);
      if(j==1){
        cel.innerHTML = "<input type=\"number\" class=\"campo-preenchimento\" id=\"v"+i+"-x\" value=\"\"/>";
      } else if(j==2){
        cel.innerHTML = "<input type=\"number\" class=\"campo-preenchimento\" id=\"v"+i+"-y\" value=\"\"/>";
      } else {
        cel.innerHTML = "<input type=\"number\" class=\"campo-preenchimento\" id=\"v"+i+"-z\" value=\"\"/>";
      }
    }
  }
}

function geraCamposFaces(tabela,n_faces,n_vertices){
  var table = document.getElementById(tabela);
  var numLinhas = table.rows.length; 
  //laço para remover linhas antigas, caso existam
  for(var i = numLinhas; i > 1; i--){
    table.deleteRow(i-1);
  }
  //preenchendo a tabela com n faces
  for(var i = 1; i <= n_faces; i++){
    var novaLinha = table.insertRow(i);
    var cel = novaLinha.insertCell(0);
    cel.innerHTML = "F"+i;
    cel = novaLinha.insertCell(1);
    for(var j = 1; j <= n_vertices; j++){
      cel.innerHTML += "<input type=\"checkbox\" value=\"\" id=\"f"+i+"-v"+j+"\">V"+j+" ";
    }
  }
}
