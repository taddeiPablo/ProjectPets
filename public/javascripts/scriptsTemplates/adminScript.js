/*SCRIPT PARA EL TEMPLATE ADMIN
DESDE AQUI VAMOS A REALIZAR EL CONTROL DE LA UI*/

/*funcion que se ejecuta cuando el documento ya este cargado*/
$(function(){
	//desde aqui le damos funcionalidad al carousel de imagenes
	$('#myCarousel').carousel();

	//desde aqui seleccionamos la opcion de ver el perfil
	$('#profile').click(function(){
		$('.h1Extra').text('Profile');
		$('#listContent').empty();
		$('#listContent').load('/Profile');
		var usrName = sessionStorage.getItem('usrname');
		getProfile(usrName);
	});

	//evento del link edit para editar los campos del profile
	$('#listContent').on('click',"a[id='edit']", function(){
		$("input[type='text']").removeAttr('disabled');
	});
	
	//evento del link para guardar los datos modificados del profile
	$('#listContent').on('click', "a[id='btnG']", function(){
		var data = {
			idUsr: sessionStorage.getItem('id'),
			name:$('#name').val(), 
			lastName:$('#lastName').val(), 
			address:$('#address').val(), 
			location:$('#location').val(),
			phone:$('#phone').val(),
			mobile:$('#mobile').val(),
			image : $('#imgProfile').attr('src')
		};
		completeProfile(data);
	});

	//evento change que se ejecuta una vez seleccionada la imagen
	//del explorer
	$('#listContent').on('change',"input[type='file']", function(){
		loadUrl(this);
	});
});

//desde esta funcion se obtiene los datos de perfil del usuario
function getProfile(userName){
	try{
		$.ajax({
			cache: false,
			data : {usrName : userName},
			url : '/users/getProfile',
			type: 'post',
			contentType : 'application/x-www-form-urlencoded'
		}).done(function(response){
			getfiles(response);
		});
	}catch(err){
		
	}
}

//desde esta funcion se realiza la cagar o modificacion de los datos de
//perfil del usuario
function completeProfile(data){
	try{
		$.ajax({
			cache : false,
			data : data,
			url : '/users/CompleteProfile',
			type: 'post',
			dataType : "json",
			contentType : 'application/x-www-form-urlencoded',
		}).done(function(response){
			if(response){
				alert('bien');
			}
		});
	}catch(err){

	}
}

//desde aqui se cargan los datos obtenidos del perfil
//en los campos
function getfiles(response){
	$('#name').val(response.name);
	$('#lastName').val(response.lastName);
	$('#address').val(response.address);
	$('#location').val(response.location);
	$('#phone').val(response.phone);
	$('#mobile').val(response.mobile);
	$('#imgProfile').attr('src', response.image);
}

//funcion por la cual se carga la imagen recien seleccionada
//del input file
function loadUrl(input){
	$('#imgProfile').attr('src','');
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function(e){
			$('#imgProfile').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}