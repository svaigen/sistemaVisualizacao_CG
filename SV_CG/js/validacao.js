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
	v = v*3;
  for(var i = 0; i < v; i++){
			if(document.getElementById("vertices"+i).value == ''){
				return false;
			}
	}
  f = f;
  for(var i = 0; i < f; i++){
		if(document.getElementById("faces"+i).value == ''){
			return false;
		}
	}

	return true;
}
function validaPonto(id){
	if(document.getElementById('pp_x'+id).value == ''){
		return false;
	}
	if(document.getElementById('pp_y'+id).value == ''){
		return false;
	}
	if(document.getElementById('pp_z'+id).value == ''){
		return false;
	}
	return true;
}
