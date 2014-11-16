/*SCRIPT PARA EL LAYOUT INDEX*/
$(function(){
	/*Aqui se ejecuta el evento submit en el momento que se preciona el boton
	de registrar*/
	$('#form1').submit(function(e){
		//aqui se obtienen el array de datos, y la url
		var postData = $(this).serializeArray();
		var formUrl = $(this).attr('action');
		//aqui en la funcion se van a mandar los datos utilizando ajax
		process_registration(postData,formUrl);
		//aqui se detiene el envio del formulario
		e.preventDefault();
		e.unbind();
	});
});

/*Funcion por la cual se verifica la existencia del usuario en el sistema*/
function process_registration(postData, formUrl){
	$.ajax({
		cache : false,
		data : postData,
		url : formUrl,
		type: "post",
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success: function(data){
			if(data != false){
				$(location).attr('href','admin');
			}else{
				//aqui popUp con explicacion sobre el error
			}
		},
		error : function(err){
			alert(err);
		}
	});
}