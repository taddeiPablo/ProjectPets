/*SCRIPT PARA EL TEMPLATE DE LOGUEO*/

$(function(){
	/*aqui tenemos el evento del boton y esto seria provisorio hasta probar e investigar un
	poco mas*/
	$('#btnL').click(function(){
		var usrName = $('#usrname').val();
		var password = $('#password').val();
		verification_login(usrName,password);
	});
});

/**/
function verification_login(UsrName,pass){
	var datos = {
		"UsrName" : UsrName,
		"password" : pass
	};

	$.ajax({
		cache : false,
		data : datos,
		url : "/users/login",
		type: "post",
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success: function(data){
			if(data != false){
				$(location).attr('href','admin');
			}else{
				alert('el usuario no existe');//remplazar por popUp
			}
		},
		error : function(err){
			alert(err.message);//remplazar por popUp
		}
	});
}

