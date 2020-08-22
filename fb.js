function redirect_plus(){
// Redirect to "Recent Posts" view of news feed
	let wl_href = window.location.href;
	
	if (wl_href == "https://www.facebook.com/" ||
		// window.location.href == "https://www.facebook.com/?sk=h_nor" ||
		wl_href == "https://www.facebook.com/?ref=tn_tnmn" ||
		wl_href == "https://www.facebook.com/?ref=logo") {
	   window.location.href = 'https://www.facebook.com/?sk=h_chr'; 
	}

// Switch to chronological order the posts in groups.
	if (wl_href.indexOf('groups') > 0 && 
		wl_href.indexOf('notif_id') < 0 &&
		wl_href.indexOf('CHRONOLOGICAL') < 0){
			wl_href = wl_href.slice(0, wl_href.indexOf('?')) + 
						'?sorting_setting=CHRONOLOGICAL';
			window.location.href = wl_href;
		}
	
// Change links to point recent news feed.
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
	
	switchToHrono()
}

function switchToHrono() {
// Change links to strip facebook tracking
	let count = 0;
	var ahref = document.querySelectorAll('a[href*="fbclid"]');
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
	var selector = 'span > a > i.q_1fo12d-q8g';
	//selector += ', div._44af > div._275- > a._42ft[role=button]';
	selector += ', div > iframe';
	//selector += ', span.fsm > span > a[role=button] > b.q_1fo12d-q8g > b.q_1fo12d-q8g > b.q_1fo12d-q8g';
	selector += ', div.x_1fo12d-fii > div.i_1fo12d-nuz > div._6a > a.x_1fo12d-mtm';
	//selector += ', div.clearfix > div._-ix._ohf > div._6a > a._42ft[role=button]';
	// selector += ', a._42ft._4jy0._517h._51sy:not(._55pi):not(._522u)[role=button]';
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

// Pause all videos when scrolling
	count = 0;
	var videos = document.querySelectorAll('video._ox1');
	for( j = 0; j < videos.length; j++ ){
		if (!videos[j].paused){ 
	    	videos[j].pause(); 
	    	count += 1;
		}
	}
	if(count > 0) console.log('EVB paused watch parties: ' + count);
}

// Set scrolling event to the global Container
document.getElementById("globalContainer").addEventListener("wheel", switchToHrono);

// Run once, once loaded
window.setTimeout(redirect_plus, 500);
