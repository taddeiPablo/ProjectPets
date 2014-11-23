/*SCRIPT PARA EL LAYOUT INDEX*/
$(function(){
	//Aqui se procede a validar los campos del formulario de registro
	//Una vez validado los campos del formulario se procede a realizar el
	//submit de los datos
	$('#form1').validate({
		rules :{
			usrname : 'required',
			email : 'required',
			password : {
				required : true,
				minlength : 8
			},
			email : {
				required : true,
				email : true
			}
		},
		messages :{
			usrname : 'Por favor ingrese un nombre de usuario',
			password :{
				required : 'Por favor ingrese un password',
				minlength : 'minimo 8 cataracteres'
			},
			email : 'por favor ingrese su email'
		},
		submitHandler: function(form){
			//aqui obtenemos los atributos del formulario 
			var postData = $(form).serializeArray();
			var formUrl = $(form).attr('action');
			var formMethod = $(form).attr('method');
			var content = $(form).attr('enctype');
			//aqui en la funcion se van a mandar los datos utilizando ajax
			process_registration(postData,formUrl,formMethod, content);

			return false;
		}
	});
});



/*Funcion por la cual se verifica la existencia del usuario en el sistema*/
function process_registration(postData, formUrl, formethod, contentT){
	$.ajax({
		cache : false,
		data : postData,
		url : formUrl,
		type: formethod,
		dataType : "json",
		contentType : contentT,
	}).done(function(response){
		if(response != false){
			alert('exito loguese ahora');
		}else{
			alert('error');
		}
	});
}