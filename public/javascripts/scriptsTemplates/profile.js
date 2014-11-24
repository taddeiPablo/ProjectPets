/*
*SCRIPT PARA EL PROFILE
*/
//
$(function(){
	$('#main').attr('disabled',true);
	var usrName = sessionStorage.getItem('usrname');
	getProfile(usrName);
	//aqui formulario
});

//aqui en esta funcion recuperamos los datos de perfil
function getProfile(userName){
	try{
		$.ajax({
			cache: false,
			data : {usrName : userName},
			url : '/users/getProfile',
			type: 'post',
			contentType : 'application/x-www-form-urlencoded'
		}).done(function(response){
			loadData(response);
		});
	}catch(err){

	}
}

//aqui cargamos en la plantilla los datos de perfil
function loadData(profile){
	if(profile != false){
		$('#name').val(response.name);
		$('#lastName').val(response.lastName);
		$('#address').val(response.address);
		$('#location').val(response.location);
		$('#phone').val(response.phone);
		$('#mobile').val(response.mobile);
		//$('#imgProfile').attr('src', response.image);
	}else{
		alert('aun no a cargado su perfil');
	}
}