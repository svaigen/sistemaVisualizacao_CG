function prisma(){
    setViewPointPrism();

    setProjectionPlaneCoordPrism();

    var vertices = document.getElementById("vertices");
    vertices.value = 6;
    getNumeroVertice();
    setVerticesCoordPrism();

    var faces = document.getElementById("faces");
    faces.value = 5;
    getNumeroFace();
    setSurfaceVerticesPrism();

    var form = document.getElementById("formInput");
    getForm(form);
}

function setViewPointPrism(){
    if (projecao.tipoProjecao === "cilindrica"){
        document.getElementById("pv-x").value = 0;
        document.getElementById("pv-y").value = 0;
        document.getElementById("pv-z").value = 1;
    } else {
        document.getElementById("pv-x").value = 1;
        document.getElementById("pv-y").value = 5;
        document.getElementById("pv-z").value = 3;
    }
}

function setSurfaceVerticesPrism(){
    document.getElementById("faces0").value = "1 2 6";
    document.getElementById("faces1").value = "2 3 5 6";
    document.getElementById("faces2").value = "3 4 5";
    document.getElementById("faces3").value = "1 6 5 4";
    document.getElementById("faces4").value = "1 4 3 2";
}

function setProjectionPlaneCoordPrism(){
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

function setVerticesCoordPrism(){
    document.getElementById("vertices0").value = 0;
    document.getElementById("vertices1").value = 0;
    document.getElementById("vertices2").value = 0;

    document.getElementById("vertices3").value = 2;
    document.getElementById("vertices4").value = 0;
    document.getElementById("vertices5").value = 0;

    document.getElementById("vertices6").value = 2;
    document.getElementById("vertices7").value = 3;
    document.getElementById("vertices8").value = 0;

    document.getElementById("vertices9").value = 0;
    document.getElementById("vertices10").value = 3;
    document.getElementById("vertices11").value = 0;

    document.getElementById("vertices12").value = 1;
    document.getElementById("vertices13").value = 2;
    document.getElementById("vertices14").value = 1;

    document.getElementById("vertices15").value = 1;
    document.getElementById("vertices16").value = 1;
    document.getElementById("vertices17").value = 1;
}
