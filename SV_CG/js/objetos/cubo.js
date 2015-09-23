function genCube(){
    setViewPointCube();

    setProjectionPlaneCoordCube();

    var vertices = document.getElementById("vertices");
    vertices.value = 8;
    getNumeroVertice();
    setVerticesCoordCube();

    var faces = document.getElementById("faces");
    faces.value = 6;
    getNumeroFace();
    setSurfaceVerticesCube();

    var form = document.getElementById("formInput");
    getForm(form);
}

function setViewPointCube(){
    document.getElementById("pv-x").value = 0;
    document.getElementById("pv-y").value = 0;
    if (projection.type == "par")
        document.getElementById("pv-z").value = 40;
    else
        document.getElementById("pv-z").value = -40;
}

function setSurfaceVerticesCube(){
    document.getElementById("faces0").value = "6-7-8-5";
    document.getElementById("faces1").value = "7-2-3-8";
    document.getElementById("faces2").value = "2-1-4-3";
    document.getElementById("faces3").value = "6-5-4-1";
    document.getElementById("faces4").value = "2-7-6-1";
    document.getElementById("faces5").value = "8-3-4-5";
}

function setProjectionPlaneCoordCube(){
    document.getElementById("pp_x1").value = 40;
    document.getElementById("pp_y1").value = 0;
    document.getElementById("pp_z1").value = 0;

    document.getElementById("pp_x2").value = 0;
    document.getElementById("pp_y2").value = 0;
    document.getElementById("pp_z2").value = 0;

    document.getElementById("pp_x3").value = 0;
    document.getElementById("pp_y3").value = 40;
    document.getElementById("pp_z3").value = 0;
}

function setVerticesCoordCube(){
    document.getElementById("vertices0").value = 0;
    document.getElementById("vertices1").value = 0;
    document.getElementById("vertices2").value = 0;

    document.getElementById("vertices3").value = 40;
    document.getElementById("vertices4").value = 0;
    document.getElementById("vertices5").value = 0;

    document.getElementById("vertices6").value = 40;
    document.getElementById("vertices7").value = 40;
    document.getElementById("vertices8").value = 0;

    document.getElementById("vertices9").value = 0;
    document.getElementById("vertices10").value = 40;
    document.getElementById("vertices11").value = 0;

    document.getElementById("vertices12").value = 0;
    document.getElementById("vertices13").value = 40;
    document.getElementById("vertices14").value = 40;

    document.getElementById("vertices15").value = 0;
    document.getElementById("vertices16").value = 0;
    document.getElementById("vertices17").value = 40;

    document.getElementById("vertices18").value = 40;
    document.getElementById("vertices19").value = 0;
    document.getElementById("vertices20").value = 40;

    document.getElementById("vertices21").value = 40;
    document.getElementById("vertices22").value = 40;
    document.getElementById("vertices23").value = 40;
}
