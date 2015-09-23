function calcular(){
	//if(validar()){
		projeta();
	/*}else{
		alert('Preencha todos os campos!');
	}*/
}

function validar(){
//valida primeiro ponto
	if (!validaPonto(1)){
		return false;
	}
//valida segundo ponto
	if (!validaPonto(2)){
		return false;
	}
//valida terceiro ponto
	if (!validaPonto(3)){
		return false;
	}
//valida ponto de vista
	if(document.getElementById('pv-x').value == ''){
		return false;
	}
	if(document.getElementById('pv-y').value == ''){
		return false;
	}
	if(document.getElementById('pv-z').value == ''){
		return false;
	}
//valida definições da projeção
	var proj = document.getElementsByName("opt-proj");
	if(proj[0].checked == false && proj[1].checked == false){
		return false;
	}
//valida novo objeto
//valida vertices e faces
	if(document.getElementById('vertices').value == ''){
		return false;
	}
	if(document.getElementById('faces').value == ''){
		return false;
	}
	var v = parseInt(document.getElementById("vertices").value);
	if(v < 3){
		alert('Número de vertices deve ser maior que 3');
		return false;
	}
	var f = parseInt(document.getElementById("faces").value);
  for(var i = 1; i <= v; i++){
			if(document.getElementById("v"+i+"-x").value == ''){
				return false;
			}
			if(document.getElementById("v"+i+"-y").value == ''){
				return false;
			}
			if(document.getElementById("v"+i+"-z").value == ''){
				return false;
			}
	}

  for(var i = 1; i <= f; i++){
		var fc = document.getElementsByName("f"+i);
		var cont = 0;
		for(var j = 0; j < v; j++){
			if(fc[j].checked == true){
				cont++;
			}
		}
		if(cont < 3){
			alert('Necessário marcar pelo menos 3 vértices');
			return false;
		}
	}

	return true;
}
function validaPonto(id){
	if(document.getElementById('pp-p'+id+'-x').value == ''){
		return false;
	}
	if(document.getElementById('pp-p'+id+'-y').value == ''){
		return false;
	}
	if(document.getElementById('pp-p'+id+'-z').value == ''){
		return false;
	}
	return true;
}

function projeta(){
  //variaveis do plano de projecao
  var plano = new Array(3);
  var planoPonto = new Array(3);
  planoPonto[0] = parseFloat(document.getElementById("pp-p1-x").value);
  planoPonto[1] = parseFloat(document.getElementById("pp-p1-y").value);
  planoPonto[2] = parseFloat(document.getElementById("pp-p1-z").value);
  plano[0] = planoPonto;
  planoPonto = new Array(3);
  planoPonto[0] = parseFloat(document.getElementById("pp-p2-x").value);
  planoPonto[1] = parseFloat(document.getElementById("pp-p2-y").value);
  planoPonto[2] = parseFloat(document.getElementById("pp-p2-z").value);
  plano[1] = planoPonto;
  planoPonto = new Array(3);
  planoPonto[0] = parseFloat(document.getElementById("pp-p3-x").value);
  planoPonto[1] = parseFloat(document.getElementById("pp-p3-y").value);
  planoPonto[2] = parseFloat(document.getElementById("pp-p3-z").value);
  plano[2] = planoPonto;

  //variaveis do ponto de vista
  var pontoVista = new Array(3);
  pontoVista[0] = parseFloat(document.getElementById("pv-x").value);
  pontoVista[1] = parseFloat(document.getElementById("pv-y").value);
  pontoVista[2] = parseFloat(document.getElementById("pv-z").value);

  //variaveis de definicao da projecao
  var radios = document.getElementsByName("opt-proj");
  var tipo_proj;
  for(var i=0; i < radios.length; i++){
      if(radios[i].checked){
        tipo_proj = radios[i].value;
      }
  }

  //variavel face oculta
  var face_oculta = document.getElementById("faces-ocultas").checked;

  //variaveis de vertices e faces
  var nVertices = parseInt(document.getElementById("vertices").value);
  var nFaces = parseInt(document.getElementById("faces").value);
  var vertice = new Array(nVertices);
  for(var i=1; i<=nVertices; i++){
    var pontos = new Array(4);
    pontos[0] = parseFloat(document.getElementById("v"+i+"-x").value);
    pontos[1] = parseFloat(document.getElementById("v"+i+"-y").value);
    pontos[2] = parseFloat(document.getElementById("v"+i+"-z").value);
    pontos[3] = 1;
    vertice[i-1] = pontos;
  }
  var faces = new Array(nFaces);
  for(var i=1; i<=nFaces;i++){
    var pontos = new Array(nVertices);
    var fc = document.getElementsByName("f"+i);
    for(var j=0; j<nVertices;j++){
      if(fc[j].checked){
        pontos[j] = true;
      }else{
        pontos[j] = false;
      }
    }
    faces[i-1] = pontos;
  }

  //calculando o vetor normal ao plano
  var vetorNormalPlano = calculaVetorNormalPlano(plano);
  var matriz;
  if(tipo_proj == 1){ //projecao Conica
    matriz = calculaMatrizConica(plano[0],vetorNormalPlano,pontoVista);
  } else{ //projecao Paralela
  }
  var coordenadasPontosNaProjecao = calculaCoordenadasNaProjecao(matriz,vertice);


}

function calculaVetorNormalPlano(plano){
  var vetorNormal = new Array(3);
  var p1p2 = new Array(3);
  var p2p3 = new Array(3);
  //calculando o vetor P2-P1
  p1p2[0] = plano[1][0] - plano[0][0]; //x
  p1p2[1] = plano[1][1] - plano[0][1]; //y
  p1p2[2] = plano[1][2] - plano[0][2]; //z
  //calculando o vetor P3-P2
  p2p3[0] = plano[2][0] - plano[1][0]; //x
  p2p3[1] = plano[2][1] - plano[1][1]; //y
  p2p3[2] = plano[2][2] - plano[1][2]; //z

  //calculando o vetor normal
  vetorNormal[0] = p1p2[1]*p2p3[2] - p2p3[1] * p1p2[2];
  vetorNormal[1] = - (p1p2[0] * p2p3[2] - p2p3[0] * p1p2[2]);
  vetorNormal[2] = p1p2[0] * p2p3[1] - p2p3[0] * p1p2[1];

  return vetorNormal;
}

function calculaMatrizConica(pontoPlano, normal ,pontoVista){
  var d0 = pontoPlano[0] * normal[0] + pontoPlano[1] * normal[1] + pontoPlano[2] * normal[2];
  var d1 = pontoVista[0] * normal[0] + pontoVista[1] * normal[1] + pontoVista[2] * normal[2];
  var d = d0 - d1;

  var matriz = new Array(4);
  var linha = new Array(4);
  linha[0] = d + pontoVista[0]*normal[0];
  linha[1] = pontoVista[0] * normal[1];
  linha[2] = pontoVista[0] * normal[2];
  linha[3] = -(pontoVista[0] * d0);
  matriz[0] = linha;
  linha = new Array(4) ;
  linha[0] = pontoVista[1] * normal[0];
  linha[1] = d + pontoVista[1]*normal[1];
  linha[2] = pontoVista[1]*normal[2];
  linha[3] = - pontoVista[1] * d0;
  matriz[1] = linha;
  linha = new Array(4) ;
  linha[0] = pontoVista[2]*normal[0];
  linha[1] = pontoVista[2]*normal[1];
  linha[2] = d + pontoVista[2]*normal[2];
  linha[3] = - pontoVista[2] * d0;
  matriz[2] = linha;
  linha = new Array(4) ;
  linha[0] = normal[0];
  linha[1] = normal[1];
  linha[2] = normal[2];
  linha[3] = 1;
  matriz[3] = linha;
  return matriz;
}

function calculaCoordenadasNaProjecao(matriz,vertice){
  /*Inicializando matriz de coordenadas homogeneas*/
  var coordenadasHomogeneas = new Array(4);
  for(var i=0; i< 4; i++){
    coordenadasHomogeneas[i] = new Array(vertice.length);
  }

  //Calcula coordenadas homogeneas, multiplicacao de Mper * P
  for(var i=0; i< 4; i++){
    for(var j=0; j< vertice.length; j++){
      var soma = 0;
      for(var k=0; k < 4; k++){
        soma += matriz[i][k] * vertice[j][k];
      }
      coordenadasHomogeneas[i][j] = soma;
    }
  }

  //Transforma coordenadas homogeneas para coordenadas do plano
  var coordenadasPlano = new Array(2);
  for(var i=0; i<2; i++){
    coordenadasPlano[i] = new Array(vertice.length);
    for(var j=0; j< vertice.length; j++){
      coordenadasPlano[i][j] = coordenadasHomogeneas[i][j]/coordenadasHomogeneas[3][j];
    }
  }
  return coordenadasPlano;
}

function setObjeto(){
	var obj = document.getElementById("objetos").value;

	if(obj == 1){
		cubo();
	}
}
