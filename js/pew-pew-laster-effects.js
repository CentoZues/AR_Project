$(function() {	
    if ($(".face")[0]){
		
	var soldierFace = false
	function soldier() {
		if(soldierFace == false){
		soldierFace = true
		var item = Math.floor(Math.random() * 2);
			if(item == 1){
				
                $('.eyes .blink').show(0);
                $('.eyes .open').hide(0)
                $('.eyes .open').delay(100).show(0)
                $('.eyes .blink').delay(100).hide(0) 
                soldierFace = false
				
			}else{
				$('.eyes .blink').show(0);
                $('.eyes .open').hide(0)
                $('.eyes .open').delay(100).show(0)
                $('.eyes .blink').delay(100).hide(0) 
				$('.mouth .smile').show(0);
                $('.mouth .smirk').hide(0)
                $('.mouth .smirk').delay(750).show(0)
                $('.mouth .smile').delay(750).hide(0) 
				soldierFace = false
			}
		}
	}

	(function loop() {
		var rand = Math.round(Math.random() * (8000 - 500)) + 500;
		setTimeout(function() {
				soldier();
				loop();  
		}, rand);
	}());  
		
	}
	
	
	$( ".dialog" ).on( "click", function() {
	  	$('.notes').hide();
		$('.dial').show();
		$('.dialog').html('<i class="fa fa-file-text-o" aria-hidden="true"></i> Notes').addClass('note').removeClass('dialog');
	});
	$( ".note" ).on( "click", function() {
	  	$('.dial').hide();
		$('.notes').show();
		$('.dialog').html('<i class="fa fa-commenting-o" aria-hidden="true"></i> Dialog').addClass('dialog').removeClass('note');
	});


});