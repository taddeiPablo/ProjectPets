/*
*SCRIPT PARA EL PROFILE
*/
/*
*==========================================
* INICIO DEL SCRIPT
*==========================================
*/
$(function(){
	$('#main').attr('disabled',true);
	var idusr = sessionStorage.getItem('id');
	var usrName = sessionStorage.getItem('usrname');
	var imgUrl;
	//se carga el perfil
	LoadProfile(idusr);
	
	//aqui se valida el formulario del profile
	$('#form1').validate({
		rules:{
			name: {
				required : true
			},
			lastName: {
				required : true
			},
			address: {
				required: true
			},
			location: {
				required: true
			},
			phone: {
				required: true,
				number: true
			},
			mobile: {
				required: true,
				number: true
			}
		},
		message:{
			name:{
				required: 'No se permiten campos vacios'
			},
			lastName:{
				required:'No se permiten campos vacios'
			},
			address:{
				required:'No se permiten campos vacios'
			},
			location:{
				required:'No se permiten campos vacios'
			},
			phone:{
				required:'No se permiten campos vacios',
				number:'ingrese solo numeros en este campo'
			},
			mobile:{
				required:'No se permiten campos vacios',
				number:'ingrese solo numeros en este campo'
			}
		},
		submitHandler: function(form){
			var postData = $(form).serializeArray();
			var formUrl = $(form).attr('action');
			var formMethod = $(form).attr('method');
			var content = $(form).attr('enctype');
			var imgUrl = {name:'imgUrl', value:$('#imgP').attr('src')}; //$('#filep').val().replace("C:\\fakepath\\", "")}; //$('#imgP').attr('src').replace("C:\\fakepath\\", "")$('#imgP').attr('src') };
			var idusr = {name:'idUsr', value: sessionStorage.getItem('id')};
			var usrname = {name:'userName', value:sessionStorage.getItem('usrname')};
			postData.push(imgUrl);
			postData.push(idusr);
			postData.push(usrname);
			completeProfile(postData,formUrl,formMethod,content);

			return false;
		}
	});

	//aqui se carga la imagen selecciona
	$('#filep').change(function(){
		loadImgs(this);
	});
});

//En esta funcion recuperamos los datos de perfil
function LoadProfile(idUser){
	try{
		$.ajax({
			cache: false,
			data : {user : idUser},
			url : '/users/getProfile',
			type: 'post',
			contentType : 'application/x-www-form-urlencoded'
		}).done(function(response){
			if(response != false){
				loadData(response);
				//LoadImages(userName);
			}else{
				alert('aun no a cargado su profile');
			}
		});
		console.log(result);
		return result;
	}catch(err){

	}
}

//En esta funcion cargamos en la plantilla los datos de perfil
function loadData(profile){
	$('#name').val(profile.name);
	$('#lastName').val(profile.lastName);
	$('#address').val(profile.address);
	$('#location').val(profile.location);
	$('#phone').val(profile.phone);
	$('#mobile').val(profile.mobile);
}

//En esta funcion cargamos la imagen del profile
function LoadImages(usrName){
	try{
		$.ajax({
			cache : false,
			data : {usrName : usrName},
			url : '/users/getImageProfile',
			type: 'post',
			dataType : "json",
			contentType : 'application/x-www-form-urlencoded',
		}).done(function(response){
			console.log(response)
			if(response){
				$('#imgP').attr('src', response.img);
			}
		});
	}catch(err){

	}
}

//En esta funcion cargamos la imagen
//del input file
function loadImgs(input){
	$('#imgP').attr('src','');
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function(e){
			$('#imgP').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

//En esta funcion se carga el perfil del usuario
function completeProfile(data, urlP, typeP, content){
	try{
		$.ajax({
			cache : false,
			data : data,
			url : urlP,
			type: typeP,
			dataType : "json",
			contentType : content,
		}).done(function(response){
			if(response){
				alert('bien');
			}
		});
	}catch(err){

	}
}