/*SCRIPT PARA EL TEMPLATE DE LOGUEO*/

$(function(){
	//Aqui se procede a validar los campos del formulario de logueo
	//Una vez validado los campos del formulario se procede a realizar 
	//submit de los datos
	$('#form1').validate({
		rules :{
			usrname : 'required',
			password :{
				required : true,
				minlength : 8
			}
		},
		message : {
			usrname : 'Por favor complete este campo',
			password : {
				required : 'Por favor complete este campo',
				minlength : 'minimo 8 caracteres'
			}
		},
		submitHandler: function(form){
			//aqui obtenemos los atributos del formulario		
			var postData = $(form).serializeArray();
			var formUrl = $(form).attr('action');
			var formMethod = $(form).attr('method');
			var content = $(form).attr('enctype');
			//aqui en la funcion se van a mandar los datos utilizando ajax
			verification_login(postData, formUrl, formMethod, content);

			return false;
		}
	});
});

/*Funcion por la cual se verifica la existencia del usuario en el sistema*/
function verification_login(postData, formUrl, formethod, contentT){
	$.ajax({
		cache : false,
		data : postData,
		url : formUrl,
		type: formethod,
		dataType : "json",
		contentType : contentT,
	}).done(function(response){
		if(response != false){
			$(location).attr('href','admin');
		}else{

		}
	});
}

