function calcula(){
	if(document.getElementById(‘pp-p1-x’).value == ”){
		alert(‘Preencha o nome’);
		document.getElementById(‘pp-p1-x’).focus();
	}
return;


//	if(validar(‘objetos’, true)){
		//gravar();
	//}
}

function validar(div, subdivs){
	div = document.getElementById(div).firstChild;
	for(div; div != null; div = div.nextSibling){
		if(document.getElementById(div.id)){
			var objeto = document.getElementById(div.id);
				if(objeto == “[object HTMLDivElement]“){
					if(subdivs){
						validar(objeto.id, subdivs);
					}
				}
				if(objeto.name != ”){
					if((objeto.type == ‘text’)|| (objeto.type == ‘password’)|| (objeto.type == ‘textarea’)){
						if(objeto.value == ”){
							alert(objeto.name);
							objeto.focus();
							return false;
						}
					} else if(objeto.type == ‘select-one’){
						if(objeto.selectedIndex == -1){
							alert(objeto.name);
							objeto.focus();
							return false;
						}
					}
			}
		}
	}
}
