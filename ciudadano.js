observador();
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


function CrearNode() {

  	var padre = document.getElementById('dropdown');
  	padre.innerHTML = `<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Mi Cuenta</a>
    				<div class="dropdown-menu" >
      				<a class="dropdown-item" href="mis casos.html">Mis casos</a>
      				<a class="dropdown-item" href="reportar caso.html">Reportar caso</a>
      				<a class="dropdown-item" href="cambiar contraseña.html">Cambiar contraseña</a>
      				<div class="dropdown-divider"></div>
      				<a class="dropdown-item" onclick="cerrarSesion();">Cerrar sesion</a>
    				</div>`

  	
  }

function registrar(){

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

firebase.auth().createUserWithEmailAndPassword(email, password)
.catch(function(error) {

  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
  console.log(errorCode);
});
}

function iniciarSesion(email, password) {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	firebase.auth().signInWithEmailAndPassword(email, password)

  createNode()
	.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode)
  console.log(errorMessage)
  });
}

function nPassword() {
	var newPassword = document.getElementById('newPassword').value;
	var user = firebase.auth().currentUser;
//var newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
}

function observador() {

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  	
  	if(window.location.href =="file:///C:/Users/user/Desktop/Ciudadano%20APP%20WEB/login.html"){
    	return(home());
    }
    CrearNode();
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    if(window.location.href !="file:///C:/Users/user/Desktop/Ciudadano%20APP%20WEB/login.html" && window.location.href !="file:///C:/Users/user/Desktop/Ciudadano%20APP%20WEB/registro.html"  ){
    	return(volverInicio());
    }

    
  }
});
}

function home() {
	window.location.assign("file:///C:/Users/user/Desktop/Ciudadano%20APP%20WEB/home.html")
}
function volverInicio(){

	window.location.assign("file:///C:/Users/user/Desktop/Ciudadano%20APP%20WEB/login.html")
}




  function cerrarSesion() {
	firebase.auth().signOut()
	.then(function() {

		window.location.reload();
		volverInicio();
			
	})  
	.catch(function() {
		console.log(error)
	})	

  }

 function createNode(element) {
 	return document.createElement(element);
 }

 function subirEvidencia() {
 	var problematicas = document.getElementById('problematicas').value;
 	var fecha = document.getElementById('fecha').value;
 	var latitud = document.getElementById('Latitud').value;
 	var longitud = document.getElementById('Longitud').value;
 	var comentario = document.getElementById('comentario').value;
 	var evidencia = document.getElementById('evidencia').files[0].name;
 	var alert = document.getElementById('alertReporte');
 		var user = firebase.auth().currentUser;
 		var db = firebase.firestore();
    var database = firebase.database();
 	var citiesRef = db.collection(user.email);

    database.ref('Casos/' + user.uid).push({
    Tipo: problematicas, Fecha: fecha, Latitud: latitud,
    Longitud: longitud, Comentario: comentario, urlPhoto: evidencia})
.then(function() {
    alert.setAttribute('Class', 'alert alert-success show')
    setTimeout(function() {
      alert.setAttribute('Class', 'alert alert-success noShow')
    },3000);
})
.catch(function(error) {
    console.error("Error writing document: ", error);
    alert.setAttribute('Class', 'noShow')
});
 

}

function AdminMsj() {
  var titulo = document.getElementById('titulo').value;
  var mensaje = document.getElementById('mensaje').value;
  var user = firebase.auth().currentUser;
  

    firebase.database().ref('mensaje/' + user.uid).push({
    Titulo: titulo,
    mensaje: mensaje,
    Remitente: user.email
     });
}
