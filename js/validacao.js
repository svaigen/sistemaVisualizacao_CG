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
