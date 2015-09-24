function piramide(){
    //enviando os valores dos vertices
    var vertices = document.getElementById("vertices");
    vertices.value = 5;
    getNumeroVertice();
    enviaCoordenadasVerticesPiramide();

    //enviando os valores das faces
    var faces = document.getElementById("faces");
    faces.value = 5;
    getNumeroFace();
    enviaEspecificacaoFacesPiramide();

    //enviando os valores de ponto de vista e plano de projecao
    enviaPontoDeVistaPiramide();
    enviaPlanoDeProjecaoPiramide();

    //enviando os dados gerados para as demais funcoes de projecao
    var dados = document.getElementById("proj");
    getDados(dados);
}

function enviaCoordenadasVerticesPiramide(){
    document.getElementById("vertices0").value = 0;
    document.getElementById("vertices1").value = 0;
    document.getElementById("vertices2").value = 0;
    document.getElementById("vertices3").value = 6;
    document.getElementById("vertices4").value = 0;
    document.getElementById("vertices5").value = 0;
    document.getElementById("vertices6").value = 0;
    document.getElementById("vertices7").value = 0;
    document.getElementById("vertices8").value = -6;
    document.getElementById("vertices9").value = 6;
    document.getElementById("vertices10").value = 0;
    document.getElementById("vertices11").value = -6;
    document.getElementById("vertices12").value = 3;
    document.getElementById("vertices13").value = 6;
    document.getElementById("vertices14").value = -3;
}

function enviaEspecificacaoFacesPiramide(){
    document.getElementById("faces0").value = "1 3 4 2";
    document.getElementById("faces1").value = "1 2 5";
    document.getElementById("faces2").value = "2 4 5";
    document.getElementById("faces3").value = "4 3 5";
    document.getElementById("faces4").value = "1 5 3";
}

function enviaPontoDeVistaPiramide(){
    document.getElementById("pv-x").value = 3;
    document.getElementById("pv-y").value = 0;
    document.getElementById("pv-z").value = 10;
}

function enviaPlanoDeProjecaoPiramide(){
    document.getElementById("pp_x1").value = 0;
    document.getElementById("pp_y1").value = 0;
    document.getElementById("pp_z1").value = 0;
    document.getElementById("pp_x2").value = 1;
    document.getElementById("pp_y2").value = 0;
    document.getElementById("pp_z2").value = 0;
    document.getElementById("pp_x3").value = 0;
    document.getElementById("pp_y3").value = 1;
    document.getElementById("pp_z3").value = 0;
}
