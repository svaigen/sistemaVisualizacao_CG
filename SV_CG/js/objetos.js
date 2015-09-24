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

function cubo(){
    //enviando os valores dos vertices
    var vertices = document.getElementById("vertices");
    vertices.value = 8;
    getNumeroVertice();
    enviaCoordenadasVerticesCubo();

    //enviando os valores das faces
    var faces = document.getElementById("faces");
    faces.value = 6;
    getNumeroFace();
    enviaEspecificacaoFacesCubo();

    //enviando os valores de ponto de vista e plano de projecao
    enviaPontoDeVistaCubo();
    enviaPlanoDeProjecaoCubo();

    //enviando os dados gerados para as demais funcoes de projecao
    var dados = document.getElementById("proj");
    getDados(dados);
}

function enviaCoordenadasVerticesCubo(){
    document.getElementById("vertices0").value = 0;
    document.getElementById("vertices1").value = 0;
    document.getElementById("vertices2").value = 0;
    document.getElementById("vertices3").value = 5;
    document.getElementById("vertices4").value = 0;
    document.getElementById("vertices5").value = 0;
    document.getElementById("vertices6").value = 5;
    document.getElementById("vertices7").value = 5;
    document.getElementById("vertices8").value = 0;
    document.getElementById("vertices9").value = 0;
    document.getElementById("vertices10").value = 5;
    document.getElementById("vertices11").value = 0;
    document.getElementById("vertices12").value = 0;
    document.getElementById("vertices13").value = 5;
    document.getElementById("vertices14").value = -5;
    document.getElementById("vertices15").value = 0;
    document.getElementById("vertices16").value = 0;
    document.getElementById("vertices17").value = -5;
    document.getElementById("vertices18").value = 5;
    document.getElementById("vertices19").value = 0;
    document.getElementById("vertices20").value = -5;
    document.getElementById("vertices21").value = 5;
    document.getElementById("vertices22").value = 5;
    document.getElementById("vertices23").value = -5;
}

function enviaEspecificacaoFacesCubo(){
    document.getElementById("faces0").value = "6 7 8 5";
    document.getElementById("faces1").value = "7 2 3 8";
    document.getElementById("faces2").value = "2 1 4 3";
    document.getElementById("faces3").value = "6 5 4 1";
    document.getElementById("faces4").value = "2 7 6 1";
    document.getElementById("faces5").value = "8 3 4 5";
}

function enviaPontoDeVistaCubo(){
    document.getElementById("pv-x").value = 0;
    document.getElementById("pv-y").value = 0;
    document.getElementById("pv-z").value = 10;
}

function enviaPlanoDeProjecaoCubo(){
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

function casa(){
    //enviando os valores dos vertices
    var vertices = document.getElementById("vertices");
    vertices.value = 14;
    getNumeroVertice();
    enviaCoordenadasVerticesCasa();

    //enviando os valores das faces
    var faces = document.getElementById("faces");
    faces.value = 9;
    getNumeroFace();
    enviaEspecificacaoFacesCasa();

    //enviando os valores de ponto de vista e plano de projecao
    enviaPontoDeVistaCasa();
    enviaPlanoDeProjecaoCasa();

    //enviando os dados gerados para as demais funcoes de projecao
    var dados = document.getElementById("proj");
    getDados(dados);
}
function enviaCoordenadasVerticesCasa(){
    document.getElementById("vertices0").value = 0;
    document.getElementById("vertices1").value = 0;
    document.getElementById("vertices2").value = 0;

    document.getElementById("vertices3").value = 10;
    document.getElementById("vertices4").value = 0;
    document.getElementById("vertices5").value = 0;

    document.getElementById("vertices6").value = 10;
    document.getElementById("vertices7").value = 10;
    document.getElementById("vertices8").value = 0;

    document.getElementById("vertices9").value = 0;
    document.getElementById("vertices10").value = 10;
    document.getElementById("vertices11").value = 0;

    document.getElementById("vertices12").value = 4;
    document.getElementById("vertices13").value = 0;
    document.getElementById("vertices14").value = 0;

    document.getElementById("vertices15").value = 6;
    document.getElementById("vertices16").value = 0;
    document.getElementById("vertices17").value = 0;

    document.getElementById("vertices18").value = 6;
    document.getElementById("vertices19").value = 4;
    document.getElementById("vertices20").value = 0;

    document.getElementById("vertices21").value = 4;
    document.getElementById("vertices22").value = 4;
    document.getElementById("vertices23").value = 0;

    document.getElementById("vertices24").value = 10;
    document.getElementById("vertices25").value = 0;
    document.getElementById("vertices26").value = -20;

    document.getElementById("vertices27").value = 10;
    document.getElementById("vertices28").value = 10;
    document.getElementById("vertices29").value = -20;

    document.getElementById("vertices30").value = 0;
    document.getElementById("vertices31").value = 10;
    document.getElementById("vertices32").value = -20;

    document.getElementById("vertices33").value = 0;
    document.getElementById("vertices34").value = 0;
    document.getElementById("vertices35").value = -20;

    document.getElementById("vertices36").value = 5;
    document.getElementById("vertices37").value = 15;
    document.getElementById("vertices38").value = -5;

    document.getElementById("vertices39").value = 5;
    document.getElementById("vertices40").value = 15;
    document.getElementById("vertices41").value = -15;
}

function enviaEspecificacaoFacesCasa(){
    document.getElementById("faces0").value = "1 2 3 4";
    document.getElementById("faces1").value = "5 6 7 8";
    document.getElementById("faces2").value = "2 9 10 3";
    document.getElementById("faces3").value = "9 12 11 10";
    document.getElementById("faces4").value = "1 4 11 12";
    document.getElementById("faces5").value = "4 3 13";
    document.getElementById("faces6").value = "3 10 14 13";
    document.getElementById("faces7").value = "11 14 10";
    document.getElementById("faces8").value = "4 13 14 11";
}

function enviaPontoDeVistaCasa(){
    document.getElementById("pv-x").value = 5;
    document.getElementById("pv-y").value = 0;
    document.getElementById("pv-z").value = 100;
}

function enviaPlanoDeProjecaoCasa(){
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
