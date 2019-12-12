function switchToHrono() {
//	window.setTimeout(
//		function(){
			
			//some time tracking
			var start_time = Date.now();
			
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
			var ahref = document.querySelectorAll('a[href*=fbclid]');
			// console.log('number of a links: ' + ahref.length);
			for(var i = 0; i < ahref.length; i++){
				var href = ahref[i].getAttribute('href');
				if (href.length > 32 ){
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
			var selector = 'span > a > i.q_1fo12d-q8g';
			//selector += ', div._44af > div._275- > a._42ft[role=button]';
			selector += ', div > iframe';
			//selector += ', span.fsm > span > a[role=button] > b.q_1fo12d-q8g > b.q_1fo12d-q8g > b.q_1fo12d-q8g';
			selector += ', div.x_1fo12d-fii > div.i_1fo12d-nuz > div._6a > a.x_1fo12d-mtm';
			//selector += ', div.clearfix > div._-ix._ohf > div._6a > a._42ft[role=button]';
			selector += ', a._42ft._4jy0._517h._51sy:not(._55pi):not(._522u)[role=button]';
			adds = document.querySelectorAll(selector);
			count = 0;
			
			for(var j = 0; j < adds.length; j++){
				if(adds[j].id !== null && adds[j].id.slice(0,3) !== 'evb'){
					par = adds[j].parentElement;
					feed = true;
					do {
						if(par.id.indexOf('hyperfeed_story_id') !== -1){
							// par.style = "display: none;";
							var add_title = par.querySelector('h5 > span > span > a');
							if(add_title!==null){
								par.innerHTML = 'EVB: HIDDEN_ADD ( from: ' + add_title.outerHTML + ')' ;
								adds[j].id = 'evb_add' + j;
								count += 1;
							}
							feed = false;
							
						} else{
							par = par.parentElement;
						}
					} while (feed && par !== null);
					
				}
			}
			if(count > 0) console.log('EVB Hidden Post Adds: ' + count);
			
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
							// par.style = "display: none;";
							par.innerHTML = 'EVB: HIDDEN_ADD';
							adds[j].id = 'evb_add' + j;
							count += 1;
							feed = false;
						} else{
							par = par.parentElement;
						}
					} while (feed && par !== null);
					
				}
			}
			if(count > 0) console.log('EVB Hidden Side Adds: ' + count);
			
			var end_time = ( Date.now() - start_time ) / 1000;
			if( end_time > 1 ) 
				console.log('EVB: Time elpased(seconds): ' + end_time );
		// end function
		
			//switchToHrono();
//		}, 500);
}

document.getElementById("globalContainer").addEventListener("wheel", switchToHrono);

window.setTimeout(switchToHrono, 500);