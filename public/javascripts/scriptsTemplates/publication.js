/*SCRIPT PARA EL TEMPLATE DE PUBLICACION*/

$(function(){
	var idusr = sessionStorage.getItem('id');
	var usrName = sessionStorage.getItem('usrname');

	$('#form1').validate({
		rules:{
			asunto: {
				required : true
			},
			petName: {
				required : true
			},
			edad: {
				required: true
			},
			dueno: {
				required: true
			},
			descripcion: {
				required: true
			}
		},
		message:{
			asunto:{
				required: 'No se permiten campos vacios'
			},
			petName:{
				required:'No se permiten campos vacios'
			},
			edad:{
				required:'No se permiten campos vacios'
			},
			dueno:{
				required:'No se permiten campos vacios'
			},
			descripcion:{
				required:'No se permiten campos vacios'
			}
		},
		submitHandler: function(form){
			var postData = $(form).serializeArray();
			var formUrl = $(form).attr('action');
			console.log(formUrl);
			var formMethod = $(form).attr('method');
			var content = $(form).attr('enctype');
			var iduser = {name:'idUsr', value: idusr};
			var username = {name:'userName', value: usrName};
			var imgPublic = {name:'imgP', value: $('#img1').attr('src')};
			console.log($('#img1').attr('src'));
			postData.push(iduser);
			postData.push(username);
			postData.push(imgPublic);
			savePublication(postData,formUrl,formMethod,content);
			return false;
		}
	});

	$('#filep').change(function(){
		loadImgs(this);
	});
});


//En esta funcion cargamos la imagen
//del input file
function loadImgs(input){
	$('#img1').attr('src','');
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function(e){
			$('#img1').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

//
function savePublication(data, urlP, typeP, content){
	try{
		$.ajax({
			cache : false,
			data : data,
			url : urlP,
			type: typeP,
			dataType : "json",
			contentType : content,
		}).done(function(response){
			alert(response);
		});
	}catch(err){

	}
}