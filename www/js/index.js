localStorage.setItem("view", 'certificaciones');
localStorage.setItem("reload", 'certifica');
$('#Menu').on('click', function(e){
	e.preventDefault();
  //navigator.vibrate(500);
  if(m == 1){
      m = 0;
	  
      $('#M-left').animate({left:'0%'},'show');
  }
  else{
      m = 1;
      $('#M-left').animate({left:'-80%'},'show');
  }
});
$('#BuscarCert').on('click', function(e){
	e.preventDefault();
	$('#MenuBottom').fadeIn('show');
	$('#MenuBottom').fadeOut('show');
	$('#Form').empty();
	$('#Form').append(`<form autocomplete="off" method="get" id="Insearch">
					<input type="text" placeholder="Buscar" name="searchin" class="Search" id="Search" maxlength="20" autofocus />
					<button type="submit" class="btn-search">
						<i class="icon-search"></i>
					</button>
				</form>`);
});
$('#Back').on('click', function(e){
	e.preventDefault();
  navigator.vibrate(500);
  if(b == 1){
      b = 0;
      $('#M-left').animate({left:'-80%'},'show');
  }
  else{
      b = 1;
      $('#M-left').animate({left:'0%'},'show');
  }
});
$('#Reload').on('click', function(e){
  e.preventDefault();
  navigator.vibrate(500);
    var v = localStorage.getItem('reload');
    if (v == 'certifica') {
	  $('#Form').empty();
	  $('#Form').append(`<div class="txt-tit" id="Titulo">
                  Certificaciones
                </div>`);
      certifica();
    }else{
      inventario();
    }
});
$('#Certifica').on('click', function(){
 
  $('#Form').empty();
	  $('#Form').append(`<div class="txt-tit" id="Titulo">
                  Certificaciones
                </div>`);
  b = 0;
  $('#M-left').animate({left:'-80%'},'show');
  localStorage.setItem("reload", 'certifica');
  var v = localStorage.getItem('reload');
  if (v == 'certifica') {
    certifica();
  }else{
    inventario();
  }
});
$('#Inventario').on('click', function(){
 
  $('#Form').empty();
	  $('#Form').append(`<div class="txt-tit" id="Titulo">
                  Inventario
                </div>`);
  b = 0;
  $('#M-left').animate({left:'-80%'},'show');
  localStorage.setItem("reload", 'inventario');
  var v = localStorage.getItem('reload');
  if (v == 'certifica') {
    certifica();
  }else{
    inventario();
  }
});
var m = 1; var b = 1; var mb = 1;
var app = {
    // Application Constructor
	initialize: function() {
        this.bindEvents();
    },
    
    
	bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // Update DOM on a Received Event
    onDeviceReady: function() {
        
		document.addEventListener("menubutton", onMenuKeyDown, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
		certifica();
    }
};


function onBackKeyDown() {
  navigator.notification.confirm(
    'Desea salir de la aplicacion!', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Perforosven operaciones',           // title
    ['Aceptar','Cancelar']     // buttonLabels
);
}
function onConfirm(data) {

    if(data == 1){
       navigator.app.exitApp();
    }
    else{
        certifica();
    }
}


function android(){
	 var android = device.platform;
    if(android == 'Android'){
        cordova.plugins.notification.local.hasPermission(function (granted) {
            console.log('Permission has been granted: ' + granted);
        });
        cordova.plugins.notification.local.registerPermission(function (granted) {
            console.log('Register Permission has been granted: ' + granted);
        });
        cordova.plugins.notification.local.schedule(toast, callback, scope, { skipPermission: true });
    }
       
}

function onMenuKeyDown() {
	
  if(mb == 1){
      mb = 0;
      $('#MenuBottom').fadeIn('show');
  }
  else{
      mb = 1;
      $('#MenuBottom').fadeOut('show');
  }
}


function certifica(){
  re = localStorage.getItem('rcertifica');
  var xmlhttp = new XMLHttpRequest();
  if(re == null){
  $('#Status').empty();
  $('#Status').append(`
  <div class="cd-status bg-primary">
    <i class="icon icon-ind"></i>
    <div class="txt-msj">
      Cargando. espere...
    </div>
  </div>`);
  
	  console.log('cargando');
	  xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  var t2 = setTimeout(function(){
			$('#Status').empty();
		  },2000);
		  cr = JSON.parse(this.responseText);
		  localStorage.setItem("rcertifica", this.responseText);
		  //console.log(cr);
		  let cer = $("#Content");
		  $("#Content").empty();
		  if(cr == 0){
				  cer.html();
				  cer.append(`<div class="lista-inf">No hay resultados</div>`)
		  }else{
				  cer.html();
				  cr.forEach(cert => {
					  cer.append(`
										<tr class="list-b">
											<td>
												<div>${cert.descripcion}</div>
												<div class="c-fech">${cert.taladro} - ${cert.desde} - ${cert.hasta}</div>
												<td>
										</tr>

									`);
				  });

				}
		}
	  };
	  xmlhttp.open("GET", "https://didigitales.tigersoftware.net.ve/certifica-lista", true);
	  xmlhttp.send();
  }
  else{
    console.log('cargando el guardado'); 
    
	cr = JSON.parse(re);
    let cer = $("#Content");
    $("#Content").empty();
    if(cr == 0){
		cer.html();
		cer.append(`<div class="lista-inf">No hay resultados</div>`)
	}
	else{
		cer.html();
		cr.forEach(cert => {
					  cer.append(`
										<tr class="list-b">
											<td>
												<div>${cert.descripcion}</div>
												<div class="c-fech">${cert.taladro} - ${cert.desde} - ${cert.hasta}</div>
												<td>
										</tr>

									`);
				  });
	}

    }
}


function inventario(){
	
  
  if (navigator.onLine) {
  
  $('#Status').empty();
  $('#Status').append(`
  <div class="cd-status bg-primary">
    <i class="icon icon-ind"></i>
    <div class="txt-msj">
      Cargando. espere...
    </div>
  </div>`);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var t2 = setTimeout(function(){
        $('#Status').empty();
      },3000);
      ins = JSON.parse(this.responseText);
  	  //console.log(ins);
  	  let inv = $("#Content");
      $("#Content").empty();
      if(ins == 0){
              inv.html();
              inv.append(`<div class="lista-inf">No hay resultados</div>`)
      }else{
              inv.html();
              ins.forEach(invent => {
                  inv.append(`

                          <tr class="list-b">
            							<td>
            							<div class="txt-mat">${invent.descripcion}</div>
            							<div class="st-m">${invent.stock}</div>
            							<div class="ce-fech">${invent.codigo}</div>
            							<td>
            						  	</tr>
                				`);
              });

            }
    }
  };
  xmlhttp.open("GET", "https://didigitales.tigersoftware.net.ve/inventario-lista", true);
  xmlhttp.send();

  }
else{
    
    cr = localStorage.getItem('rcertifica');
    $('#Status').empty();
    $('#Status').append(`
    <div class="cd-status bg-primary">
      <i class="icon icon-ind"></i>
      <div class="txt-msj">
        Verifica tu conexión
      </div>
    </div>`);
    let cer = $("#Content");
    $("#Content").empty();
    if(cr == 0){
            cer.html();
            cer.append(`<div class="lista-inf">No hay resultados</div>`)
    }else{
            cer.html();
            cr.forEach(cert => {
                cer.append(`
                        <tr class="list-b">
            							<td>
            							<div class="txt-mat">${cert.descripcion}</div>
            							<div class="st-m">${cert.stock}</div>
            							<div class="ce-fech">${cert.codigo}</div>
            							<td>
            						  	</tr>

                      `);
            });

          }
  }
}


$("#Form").on('submit','#Insearch', function(e){
	e.preventDefault();
});