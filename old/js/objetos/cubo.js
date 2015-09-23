function cubo(){
  setPlanoDeProjecao();
  setPontoDeVista();
  setDefinicoes();
  setDadosObjeto();

}

function setPlanoDeProjecao(){
  document.getElementById('pp-p1-x').value = 40;
  document.getElementById('pp-p1-y').value = 0;
  document.getElementById('pp-p1-z').value = 0;

  document.getElementById('pp-p2-x').value = 0;
  document.getElementById('pp-p2-y').value = 0;
  document.getElementById('pp-p2-z').value = 0;

  document.getElementById('pp-p3-x').value = 0;
  document.getElementById('pp-p3-y').value = 40;
  document.getElementById('pp-p3-z').value = 0;
}

function setPontoDeVista(){
  document.getElementById('pv-x').value = 0;
  document.getElementById('pv-y').value = 0;
  document.getElementById('pv-z').value = -40;
}

function setDefinicoes(){
  var obj = document.getElementsByName('opt-proj');
  obj[0].checked = true;
}

function setDadosObjeto(){
  var vertices = 8;
  var faces = 6;
  document.getElementById('vertices').value = vertices;
  document.getElementById('faces').value = faces;
  geraVerticesEFaces();

  document.getElementById("v1-x").value = 0;
  document.getElementById("v1-y").value = 0;
  document.getElementById("v1-z").value = 0;

  document.getElementById("v2-x").value = 40;
  document.getElementById("v2-y").value = 0;
  document.getElementById("v2-z").value = 0;

  document.getElementById("v3-x").value = 40;
  document.getElementById("v3-y").value = 40;
  document.getElementById("v3-z").value = 0;

  document.getElementById("v4-x").value = 0;
  document.getElementById("v4-y").value = 40;
  document.getElementById("v4-z").value = 0;

  document.getElementById("v5-x").value = 0;
  document.getElementById("v5-y").value = 40;
  document.getElementById("v5-z").value = 40;

  document.getElementById("v6-x").value = 0;
  document.getElementById("v6-y").value = 0;
  document.getElementById("v6-z").value = 40;

  document.getElementById("v7-x").value = 40;
  document.getElementById("v7-y").value = 0;
  document.getElementById("v7-z").value = 40;

  document.getElementById("v8-x").value = 40;
  document.getElementById("v8-y").value = 40;
  document.getElementById("v8-z").value = 40;

  for(var i=1;i<=faces;i++){
    var face = document.getElementsByName("f"+i);
    for(var j=0; j<vertices;j++){
      face[j].checked = false;
    }
  }
  var face = document.getElementsByName("f1");
  face[5].checked = true;
  face[6].checked = true;
  face[7].checked = true;
  face[4].checked = true;

  var face = document.getElementsByName("f2");
  face[6].checked = true;
  face[1].checked = true;
  face[2].checked = true;
  face[7].checked = true;

  var face = document.getElementsByName("f3");
  face[1].checked = true;
  face[0].checked = true;
  face[3].checked = true;
  face[2].checked = true;

  var face = document.getElementsByName("f4");
  face[5].checked = true;
  face[4].checked = true;
  face[3].checked = true;
  face[0].checked = true;

  var face = document.getElementsByName("f5");
  face[1].checked = true;
  face[6].checked = true;
  face[5].checked = true;
  face[0].checked = true;

  var face = document.getElementsByName("f6");
  face[7].checked = true;
  face[2].checked = true;
  face[3].checked = true;
  face[4].checked = true;

}
