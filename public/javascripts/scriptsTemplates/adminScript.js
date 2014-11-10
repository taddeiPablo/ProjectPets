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
	});
	
});