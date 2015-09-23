function calculaOffset(){
  var arg = document.getElementById('viewport');
  var top = 0;
  var left = 0;
  if(arg.offsetParent) {
    do {
      left += arg.offsetLeft;
      top += arg.offsetTop;
    }while(arg = arg.offsetParent)
  }
  var retorno = new Array(2);
  retorno[0] = left;
  retorno[1] = top;
  return retorno;
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
	//calculando as coordenadas cartesianas dos pontos no plano de projecao
  var coordenadasProjecao = calculaCoordenadasNaProjecao(matriz,vertice);
	//realizando a transformacao janela x viewport
  var coordenadasViewPort = calculaViewPort(coordenadasProjecao, nVertices);

	//plota os vertices
	plotaVertices(coordenadasViewPort, faces);

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

function calculaViewPort(coordenadasProjecao, nVertices){
  //transformando as coordenadas da Projecao para coordenadas homogeneas novamente
  var coordProjHomogenea = new Array(3);
  coordProjHomogenea[0] = coordenadasProjecao[0];
  coordProjHomogenea[1] = aplicaReflexao(coordenadasProjecao[1]); //as coordenadas homogeneas já recebem os valores em Y refletidas, pois o dispositivo de visualização começa com a origem (0,0) no topo
  coordProjHomogenea[2] = new Array(nVertices);
  for(var i=0; i< nVertices; i++){
    coordProjHomogenea[2][i] = 1;
  }


  //definindo xMin, xMax, yMin, yMax da janela
  var xMin = encontraMin(coordProjHomogenea[0]);
  var xMax = encontraMax(coordProjHomogenea[0]);
  var yMin = encontraMin(coordProjHomogenea[1]);
  var yMax = encontraMax(coordProjHomogenea[1]);

  /*descobrindo onde se inicia a viewport na tela do dispositivo.
    offsets[0] = coordenada em X;
    offsets[1] = coordenada em Y;*/
  var offsets = calculaOffset();

  //definindo uMax, uMin, vMax, vMin
  var uMin = offsets[0];
  var vMin = offsets[1];
  var uMax = uMin + document.getElementById("viewport").offsetWidth;
  var vMax = vMin + document.getElementById("viewport").offsetHeight;

  /*
  //verificando o aspectRatio
  var rW = (xMax - xMin)/(yMax - yMin);
  var rV = (uMax - uMin)/(vMax - vMin);
  if(rW > rV){
    vMaxNovo = ((uMax - uMin) / rW) + vMin;
  } else {
    uMaxNovo = rW * (vMax - vMin) + uMin;
  }

  //Definindo a matriz de multiplicação da viewport
  var sX = (uMax - uMin) / (xMax - xMin);
  var sY = (vMax - vMin) / (yMax - yMin);
  var matrizViewPort = new Array(3);
  matrizViewPort[0] = new Array(3);
  matrizViewPort[1] = new Array(3);
  matrizViewPort[2] = new Array(3);

  //calculando primeiro os campos que podem variar
  if(rW > rV){
    matrizViewPort[0][2] = -(sX * xMin);
    matrizViewPort[1][2] = -(sY * yMin) - ((vMax - vMaxNovo)/2);
  } else {
    matrizViewPort[0][2] = -(sX * xMin) - ((uMax - uMaxNovo)/2);
    matrizViewPort[1][2] = -(sY * yMin);
  }

  //definindo os demais campos estáticos
  matrizViewPort[0][0] = sX;
  matrizViewPort[0][1] = 0;
  matrizViewPort[1][0] = 0;
  matrizViewPort[1][1] = sY;
  matrizViewPort[2][0] = 0;
  matrizViewPort[2][1] = 0;
  matrizViewPort[2][2] = 1;
  */

  var matrizViewPort = new Array(3);
  matrizViewPort[0] = new Array(3);
  matrizViewPort[1] = new Array(3);
  matrizViewPort[2] = new Array(3);

  matrizViewPort[0][0]= (uMax - uMin) / (xMax - xMin);
  matrizViewPort[0][1]= 0;
  matrizViewPort[0][2]= (-xMin * (uMax - uMin) / (xMax - xMin)) + uMin;
  matrizViewPort[1][0]= 0;
  matrizViewPort[1][1]= (vMax - vMin) / (yMax - yMin);
  matrizViewPort[1][2]= (-yMin * (vMax - vMin) / (yMax - yMin)) + vMin;
  matrizViewPort[2][0]= 0;
  matrizViewPort[2][1]= 0;
  matrizViewPort[2][2]= 1;

  //realizando a multiplicacao da matriz pelos vértices
  var coordVerticesViewPort = new Array(3);
  for(var i=0; i< 3; i++){
    coordVerticesViewPort[i] = new Array(coordProjHomogenea[0].length);
    for(var j=0; j< coordProjHomogenea[0].length; j++){
      var soma = 0;
      for(var k=0; k < 3; k++){
        soma += matrizViewPort[i][k] * coordProjHomogenea[k][j];
      }
      coordVerticesViewPort[i][j] = parseInt(soma);
    }
  }

  var matrizRetorno = new Array(2); //retorno é cartesiano, não homogeneo
  matrizRetorno[0] = coordVerticesViewPort[0];
  matrizRetorno[1] = coordVerticesViewPort[1];
  return matrizRetorno;

}

function aplicaReflexao(vetor){
  var vetorRetorno = new Array(vetor.length);
  for(var i=0; i < vetor.length; i++){
    vetorRetorno[i] = -vetor[i];
  }
  return vetorRetorno;
}

function encontraMin(vetor){
  var min = Number.POSITIVE_INFINITY;
  for(var i=0; i < vetor.length; i++){
    if (vetor[i] < min) {
      min = vetor[i];
    }
  }
  return min;
}

function encontraMax(vetor){
  var max = Number.NEGATIVE_INFINITY;
  for(var i=0; i < vetor.length; i++){
    if (vetor[i] > max) {
      max = vetor[i];
    }
  }
  return max;
}

function setObjeto(){
	var obj = document.getElementById("objetos").value;

	if(obj == 1){
		cubo();
	}
}

function plotaVertices(verticesVP, faces){
	var painel = new jsgl.Panel(document.getElementById("viewport"));
	for(var i=0; i< faces.length; i++){
		var vertices = faces[i];
		var primeiroVertice = -1;
		var verticeAnterior = -1;
		for(var j=0; j<vertices.length; j++){
			if(faces[i][j] == true){
				if (verticeAnterior == -1){ //significa que ainda nao houve vertices marcados
					primeiroVertice = j;
					verticeAnterior = j;
				} else {
					var linha = painel.createLine();
						painel.addElement(linha);
						alert(linha);
					linha.setStartPointXY(verticesVP[0][verticeAnterior],verticesVP[1][verticeAnterior]);
					linha.setEndPointXY(verticesVP[0][j],verticesVP[1][j]);
					//linha.setStartPointXY(400,300)
					//linha.setEndPointXY(900,300);
					//alert('q');
					//alert(verticesVP[0][verticeAnterior]);
					//alert(verticesVP[1][verticeAnterior]);
					//alert(verticesVP[0][j]);
					//alert(verticesVP[1][j]);
					with(linha.getStroke()){
            setColor('rgb(255,255,255)');
            setWeight(3);
        	}

					verticeAnterior = j;
				}
			}
		}
		//"fechar a face"
		var linha = painel.createLine();
		linha.setStartPointXY(vertices[0][verticeAnterior],vertices[1][verticeAnterior]);
		linha.setEndPointXY(vertices[0][primeiroVertice],vertices[1][primeiroVertice]);
		with(linha.getStroke()){
			setColor('rgb(255,255,255)');
			setWeight(3);
		}
		painel.addElement(linha);
	}
}
