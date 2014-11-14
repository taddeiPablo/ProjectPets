/*SCRIPT PARA EL LAYOUT INDEX*/
$(function(){
	/**/
	$('#btnR').click(function(){
		var usrName = $('#usrName').val();
		var password = $('#password').val();
		var email = $('#email').val();
		process_registration(usrName, password, email);
	});
});

/**/
function process_registration(usrName, password, email){
	var datos = {
		"usrname" : usrName,
		"password" : password,
		"email" : email
	}

	$.ajax({
		cache : false,
		data : datos,
		url : "/users/registration",
		type: "post",
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success: function(data){
			alert(data);
		},
		error : function(err){
			alert(err);
		}
	});
}