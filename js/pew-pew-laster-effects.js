$(function() {	
    if ($(".head")[0]){
		
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
});