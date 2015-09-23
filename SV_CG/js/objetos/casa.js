function casa(){
    setViewPointHouse();

    setProjectionPlaneCoordHouse();

    var vertices = document.getElementById("vertices");
    vertices.value = 10;
    getNumeroVertice();
    setVerticesCoordHouse();

    var faces = document.getElementById("faces");
    faces.value = 7;
    getNumeroFace();
    setSurfaceVerticesHouse();

    var form = document.getElementById("formInput");
    getForm(form);
}

function setViewPointHouse(){
    document.getElementById("pv-x").value = 0;
    document.getElementById("pv-y").value = 0;
    document.getElementById("pv-z").value = -10;
}

function setSurfaceVerticesHouse(){
    document.getElementById("faces0").value = "4 3 5 9 6";
    document.getElementById("faces1").value = "3 2 7 5";
    document.getElementById("faces2").value = "8 10 7 2 1";
    document.getElementById("faces3").value = "6 8 1 4 6";
    document.getElementById("faces4").value = "4 1 2 3";
    document.getElementById("faces5").value = "9 10 8 6";
    document.getElementById("faces6").value = "5 7 10 9 5";
}

function setProjectionPlaneCoordHouse(){
    document.getElementById("pp_x1").value = 1;
    document.getElementById("pp_y1").value = 0;
    document.getElementById("pp_z1").value = 0;

    document.getElementById("pp_x2").value = 0;
    document.getElementById("pp_y2").value = 0;
    document.getElementById("pp_z2").value = 0;

    document.getElementById("pp_x3").value = 0;
    document.getElementById("pp_y3").value = 1;
    document.getElementById("pp_z3").value = 0;
}

function setVerticesCoordHouse(){
    document.getElementById("vertices0").value = 0;
    document.getElementById("vertices1").value = 0;
    document.getElementById("vertices2").value = 0;

    document.getElementById("vertices3").value = 10;
    document.getElementById("vertices4").value = 0;
    document.getElementById("vertices5").value = 0;

    document.getElementById("vertices6").value = 10;
    document.getElementById("vertices7").value = 0;
    document.getElementById("vertices8").value = 15;

    document.getElementById("vertices9").value = 0;
    document.getElementById("vertices10").value = 0;
    document.getElementById("vertices11").value = 15;

    document.getElementById("vertices12").value = 10;
    document.getElementById("vertices13").value = 8;
    document.getElementById("vertices14").value = 15;

    document.getElementById("vertices15").value = 0;
    document.getElementById("vertices16").value = 8;
    document.getElementById("vertices17").value = 15;

    document.getElementById("vertices18").value = 10;
    document.getElementById("vertices19").value = 8;
    document.getElementById("vertices20").value = 0;

    document.getElementById("vertices21").value = 0;
    document.getElementById("vertices22").value = 8;
    document.getElementById("vertices23").value = 0;

    document.getElementById("vertices24").value = 5;
    document.getElementById("vertices25").value = 13;
    document.getElementById("vertices26").value = 15;

    document.getElementById("vertices27").value = 5;
    document.getElementById("vertices28").value = 13;
    document.getElementById("vertices29").value = 0;
}
