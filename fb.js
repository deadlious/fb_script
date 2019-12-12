function switchToHrono() {
	window.setTimeout(
		function(){
			
		// Change links to point recent news feed.
			if (window.location.href == "https://www.facebook.com/" ||
				// window.location.href == "https://www.facebook.com/?sk=h_nor" ||
				window.location.href == "https://www.facebook.com/?ref=tn_tnmn" ||
				window.location.href == "https://www.facebook.com/?ref=logo") {
			   window.location.href = 'https://www.facebook.com/?sk=h_chr'; 
			}
			var count = 0;
			var links = document.querySelectorAll(
				'a[href^="https://www.facebook.com/?ref="], ' +
				'a[href="https://www.facebook.com/"], ' +
				'a[href^="/?sk="] ' 
				// + ', a[href^="https://www.facebook.com/?sk="] '
				);
			for (var a = 0; a<links.length; a++){
				
				if (links[a] && 
					links[a].getAttribute('href') !== 'https://www.facebook.com/?sk=h_chr' ) {
					links[a].setAttribute('href', 'https://www.facebook.com/?sk=h_chr');
					count +=1;
				} 
			}
			if(count > 0) console.log("EVB replaced noob links: " + count);
			
		// Change links to strip facebook tracking
			count = 0;
			var ahref = document.getElementsByTagName('a');
			// console.log('number of a links: ' + ahref.length);
			for(var i = 0; i < ahref.length; i++){
				var href = ahref[i].getAttribute('href');
				if (href !== null){
					//console.log('evb original fb url: ' + href);
					if (href.indexOf('https://l.facebook.com/l.php?u=') !== -1){
							href = href.replace('https://l.facebook.com/l.php?u=','');
							//console.log('evb sliced url: ' + href);
							href = decodeURIComponent( href );
					}
					var ind = href.indexOf('fbclid');
					if ( ind !== -1){
						ind = ind - 1;
						href = href.slice( 0, ind );
						//href = href.slice( 0, href.indexOf('&fbclid') );
						
						//console.log('evb decoded url: ' + href);
						ahref[i].setAttribute('href', href);
						// console.log('evb replaced with: ' + href);
						count +=1;
					}
					if( ahref[i].getAttribute('data-lynx-uri') ){
						ahref[i].setAttribute('data-lynx-uri', href);
					}
				}
			}
			if(count > 0) console.log('EVB Converted urls: ' + count);
			
			
		// Hide post adds
			var par = null;
			var feed = null;
			var adds = [];
			adds = document.querySelectorAll('span > a > i.q_1fo12d-q8g, div._44af > div._275- > a._42ft[role=button], div > iframe');
			// var adds_new = document.querySelectorAll('div._44af > div._275- > a._42ft[role=button]');
			//adds.push.apply(adds, adds_old);
			//adds.push.apply(adds, adds_new);
			count = 0;
			
			for(var j = 0; j < adds.length; j++){
				if(adds[j].id !== null && adds[j].id.slice(0,3) !== 'evb'){
					par = adds[j].parentElement;
					feed = true;
					do {
						if(par.id.indexOf('hyperfeed_story_id') !== -1){
							//par.style = "display: none;";
							par.innerHTML = "EVB_BEEP ADS";
							adds[j].id = 'evb_add' + j;
							count += 1;
							feed = false;
						} else{
							par = par.parentElement;
						}
					} while (feed && par !== null);
					
				}
			}
			if(count > 0) console.log('EVB Hidden Adds: ' + count);
			
			// Hide side adds
			adds = document.querySelectorAll('div > a[rel="nofollow"]');
			count = 0;
			par = null;
			feed = null;
			
			for( j = 0; j < adds.length; j++){
				if(adds[j].id !== null && adds[j].id.slice(0,3) !== 'evb'){
					par = adds[j].parentElement;
					feed = true;
					do {
						if(par.id.indexOf('pagelet_ego_pane') !== -1){
							par.style = "display: none;";
							adds[j].id = 'evb_add' + j;
							count += 1;
							feed = false;
						} else{
							par = par.parentElement;
						}
					} while (feed && par !== null);
					
				}
			}
			if(count > 0) console.log('EVB Hidden Adds: ' + count);
		
		// end function
		
			//switchToHrono();
		}, 500);
}

document.getElementById("globalContainer").addEventListener("wheel", switchToHrono);

window.setTimeout(switchToHrono(), 500);