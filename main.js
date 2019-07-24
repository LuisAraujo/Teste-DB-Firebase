//obtendo o database
var db = firebase.database();

//inserindo um usuarios
function insertUsuario(nome, datanasc) {
console.log(datanasc);
	//obtendo um id
	var id = db.ref().child('usuarios').push().key;
	
	db.ref('usuarios/'+id ).set(
		{
			nome: nome,
			datanascimento: datanasc
		},
		//adicionando uma função após a inserção
		function(error) {
			if (error) {
				alert("Erro ao inserir dados!");
			} else {
				alert("Dados inseridos como sucesso");
			} 
		}
	);
  
  return id;
}



//obter um usuário pelo nome
function getUsuario(nome, callback) {
   db.ref("usuarios").orderByChild("nome")
  .equalTo(nome).limitToFirst(1).on("child_added",
	function (snapshot) {
		console.log(snapshot);
      var value = snapshot.val();
	  callback(value);
	}
  );
  
}

function getUsuarioLike(nome, callback) {
   db.ref("usuarios").orderByChild("nome")
  .startAt(nome).once("value").then(
	function (snapshot) {
		snapshot.forEach(function(childSnapshot) {
			console.log(childSnapshot)
			var value = childSnapshot.val();
			callback(value);
		 });
	});
}


function getUsuarios(nome, callback) {
   db.ref("usuarios").orderByChild("nome")
  .equalTo(nome).once("value").then(
	function (snapshot) {	
		snapshot.forEach(function(childSnapshot) {
			console.log(childSnapshot)
			var value = childSnapshot.val();
			callback(value);
		 });
	})
  ;
}
/*obter todos os usuários
function getUsuarios(callback) {
  
  let event = firebase.database().ref("usuarios")
  let query = event.orderByChild("nome").on("child_added",
	function (snapshot) {
      var value = snapshot.val();
	  callback(value.nome);
	}
  );
  
}*/

btsend = document.getElementById("bt-send");
btfind = document.getElementById("bt-find");
btfindall = document.getElementById("bt-find-all");
btfindstart = document.getElementById("bt-find-start");

btsend.addEventListener("click", function(){
	nome = document.getElementById("inp-nome").value;
	data = document.getElementById("inp-date").value;
	insertUsuario(nome, data);
});

btfind.addEventListener("click", function(){
	nome = document.getElementById("inp-nome2").value;
	getUsuario(nome, function(value){
		result = document.getElementById("all-result");
		result.innerHTML = "";
		spam = document.createElement("span");
		spam.innerHTML = value.nome+ " - " +value.datanascimento;
		spam.classList.add("result");
		result.appendChild(spam);
	});
});

btfindstart.addEventListener("click", function(){
	nome = document.getElementById("inp-nome2").value;
	result = document.getElementById("all-result");
	result.innerHTML = "";
	getUsuarioLike(nome, function(value){
		spam = document.createElement("span");
		spam.innerHTML = value.nome+ " - " +value.datanascimento;
		spam.classList.add("result");
		result.appendChild(spam);
	});
});

btfindall.addEventListener("click", function(){
	nome = document.getElementById("inp-nome2").value;
	result = document.getElementById("all-result");
	result.innerHTML = "";
	getUsuarios(nome, function(value){
		
		spam = document.createElement("span");
		spam.innerHTML = value.nome+ " - " +value.datanascimento;
		spam.classList.add("result");
		result.appendChild(spam);
	});
});


