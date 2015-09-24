plot = new Plot();
projecao = new Projecao();

function objeto(){
  var obj = document.getElementById("objetos").value;

  if(obj == 1){
    piramide();
  }
  if(obj == 2){
    cubo();
  }
  if(obj == 3){
    casa();
  }
}

function Projecao(){
    //inicializacao das variaveis de janela e viewport
    this.umin = 50;
    this.vmin= 50;
    this.umax= document.getElementById("viewport").offsetWidth - 50;
    this.vmax= document.getElementById("viewport").offsetHeight - 50;

    //inicializacao das variaveis utilizadas para a projecao
    this.tipoProjecao = "conica";
    this.facesOcultas = false;
    this.pontoDeVista = {x: 0, y: 0, z: 0};
    this.planoProjecao = {
      p1: {x: 0, y: 0, z:0},
      p2: {x: 0, y: 0, z:0},
      p3: {x: 0, y: 0, z:0}
    }
    this.numeroVertices = 0;
    this.numeroFaces = 0;
    this.faces = [];
    this.verticesCoordenadas = [];

    this.projeta = function(){
        var pontoConhecido = this.planoProjecao.p1;

        // criacao do vetor normal ao plano
        var normal = this.getNormal(this.planoProjecao.p1, this.planoProjecao.p2, this.planoProjecao.p3);

        var a = this.pontoDeVista.x;
        var b = this.pontoDeVista.y;
        var c = this.pontoDeVista.z;

        //calcula d0
        var d0 = pontoConhecido.x * normal[0] + pontoConhecido.y * normal[1] + pontoConhecido.z * normal[2];

        //calcula d1
        var d1 = a * normal[0] + b * normal[1] + c * normal[2];

        //calcula d
        var d = d0 - d1;

        //Matriz Conica
        var matrizConica = [
          [ (d + a * normal[0]), (a * normal[1]), (a * normal[2]), (-a * d0)],
          [ (b * normal[0]), (d + b * normal[1]), (b * normal[2]), (-b * d0)],
          [ (c * normal[0]), (c * normal[1]), (d + c * normal[2]), (-c * d0)],
          [ (normal[0]), (normal[1]), (normal[2]), (-d1)]
        ];

        //Matriz Cilidrica
        var matrizCilindrica = [
          [ (d1 + a * normal[0]), (-a * normal[1]), (-a * normal[2]), (a * d0)],
          [ (-b * normal[0]), (d1 - b * normal[1]), (-b * normal[2]), (b * d0)],
          [ (-c * normal[0]), (-c * normal[1]), (d1 - c * normal[2]), (c * d0)],
          [ (0), (0), (0), (d1)]
        ];

        //Cria Matriz Homogenea
        var verticesHomogeneos = this.geraMatrizVerticesHomogenea();

        //projecao dos vertices no plano
        var matrizResultante;
        if (this.tipoProjecao === "conica"){
          matrizResultante = this.multiplicacaoMatriz(matrizConica, verticesHomogeneos);
        }
        else{
          matrizResultante = this.multiplicacaoMatriz(matrizCilindrica, verticesHomogeneos);
        }

        // Converte Para Coordenadas Cartesianas
        matrizResultante = this.conversaoCoordenadasCartesianas(matrizResultante);

        //Reflexao necessária pois as coordenadas do dispositivo iniciam no topo
        this.reflexao(matrizResultante);

        //calculos do min e max da janela
        var min = this.minimos(matrizResultante);
        var max = this.maximos(matrizResultante);

        //Converte para coordenadas do dispositivo
        matrizResultante = this.transformacaoCoordenadasDispositivo(matrizResultante, max, min);

        //Desenha pontos na tela
        this.plotaPontos(matrizResultante);
    }
    //cria vetor normal ao plano
    this.getNormal = function(p1, p2, p3){
        //subtracao p2 - p1
        var p2p1 = [
          p2.x - p1.x,
          p2.y - p1.y,
          p2.z - p1.z];
        //subtracao p3 - p2
        var p3p2 = [
          p3.x - p1.x,
          p3.y - p1.y,
          p3.z - p1.z];

        //calcula o determinante
        var nx = p2p1[1]*p3p2[2] - p2p1[2]*p3p2[1];
        var nj = p2p1[2]*p3p2[0] - p2p1[0]*p3p2[2];
        var nk = p2p1[0]*p3p2[1] - p2p1[1]*p3p2[0];

        return [nx, nj, nk];
    }

    //Cria matriz homogenea
    this.geraMatrizVerticesHomogenea = function(){
        var matrizVertices = [[], [], [], []];
        for (var i = 0; i < this.numeroVertices; i++){
            var x = this.verticesCoordenadas[i].x;
            var y = this.verticesCoordenadas[i].y;
            var z = this.verticesCoordenadas[i].z;
            matrizVertices[0].push(x);
            matrizVertices[1].push(y);
            matrizVertices[2].push(z);
            matrizVertices[3].push(1);
        }
        return matrizVertices;
    }

    //Funcao Multiplica matrizes
    this.multiplicacaoMatriz = function(m1, m2){
        var matriz = [];
        for (var i = 0; i < m1.length; i++){
            matriz.push([]);
            for (var j = 0; j < this.numeroVertices; j++){
                var soma = 0;
                for (var k = 0; k < m1.length; k++){
                    soma += m1[i][k]*m2[k][j];
                }
                matriz[i].push(soma);
            }
        }
        return matriz;
    }

    //Conversao de Homogeneo para Cartesiano
    this.conversaoCoordenadasCartesianas = function(m){
        var matriz = [[], [], []];
        for (var i = 0; i < this.numeroVertices; i++){
            var x = m[0][i] / m[3][i];
            var y = m[1][i] / m[3][i];
            var z = m[2][i] / m[3][i];
            matriz[0].push(x);
            matriz[1].push(y);
            matriz[2].push(1);
        }
        return matriz;
    }

    //realiza a reflexao
    this.reflexao = function(m){
        for (var i = 0; i < this.numeroVertices; i++){
            m[1][i] = -m[1][i];
        }
    }

    //calcula tamanho minimo da janela
    this.minimos = function(m){
        var min = {x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY};
        for (var i = 0; i < this.numeroVertices; i++){
            if (m[0][i] < min.x){
                min.x = m[0][i];
            }
            if (m[1][i] < min.y){
                min.y = m[1][i];
            }
        }
        return min;
    }

    //calcula tamanho maximo da janela
    this.maximos = function(m){
        var max = {x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY};
        for (var i = 0; i < this.numeroVertices; i++){
            if (m[0][i] > max.x){
              max.x = m[0][i];
            }
            if (m[1][i] > max.y){
                max.y = m[1][i];
            }
        }
        return max;
    }

    //Transforma de cartesiano para coordenadas dos dispositivo
    this.transformacaoCoordenadasDispositivo = function(m, max, min){
        var mvp = [[(this.umax - this.umin) / (max.x - min.x), 0, (-min.x * (this.umax - this.umin) / (max.x - min.x)) + this.umin],
                   [0, (this.vmax - this.vmin) / (max.y - min.y), (-min.y * (this.vmax - this.vmin) / (max.y - min.y)) + this.vmin],
                   [0,  0,  1]];

        return this.multiplicacaoMatriz(mvp, m);
    }

    // preenche os vertices digitados
    this.adicionaVertice = function(x, y, z){
      this.verticesCoordenadas.push({"x": x, "y": y, "z": z})
    }

    //Desenha pontos
    this.plotaPontos = function(m){
        plot.clear();
        for (var i = 0; i < this.numeroFaces; i++){
            var visivel = true;
            if (this.facesOcultas == true)
                visivel = this.visivel(this.faces[i]);
            if (visivel)
                for (var j = 0; j < this.faces[i].length - 1; j++){
                    var v1 = parseInt(this.faces[i][j].vt);
                    var v2 = parseInt(this.faces[i][j+1].vt);
                    var p1 = {x: m[0][v1-1], y: m[1][v1-1]};
                    var p2 = {x: m[0][v2-1], y: m[1][v2-1]};
                    if (j == 0){
                        var vFinal = parseInt(this.faces[i][this.faces[i].length -1].vt);
                        pFinal = {x: m[0][vFinal-1], y: m[1][vFinal-1]};
                        plot.draw_line(p1, pFinal);
                    }
                    plot.draw_line(p1, p2);
                }
        }
    }

    //verifica se face está visivel
    this.visivel = function(face){
        var n = this.getNormal(face[1].vt[1], face[0].vt[1], face[2].vt[1]);
        var vx = this.pontoDeVista.x;
        var vy = this.pontoDeVista.y;
        var vz = this.pontoDeVista.z;
        var point = face[1].vt[1];
        var d = [point.x - vx, point.y - vy, point.z - vz];
        var escalar = n[0]*d[0] + n[1]*d[1] + n[2]*d[2];
        if (escalar < 0)
            return false;
        return true;
    }
}
