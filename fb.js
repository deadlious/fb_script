function sort_groups(){
	// Switch to chronological order the posts in groups.
	let count = 0;
	let gr_links = document.querySelectorAll('a[href^="https://www.facebook.com/groups"],' + 'a[href^="/groups/"]');
	for(var i=0; i<gr_links.length; i++){
		
		cls = gr_links[i].getAttribute("class");
		if(cls.indexOf("scd") < 0){
			gr_links[i].setAttribute("class", cls + " scd");
			remove_listeners(gr_links[i]);
		}
		
		let gr_href = gr_links[i].getAttribute('href');
		if (gr_href.indexOf('permalink') < 0 && gr_href.indexOf('CHRONOLOGICAL') < 0){
			let q = gr_href.indexOf('?');
			q = q==-1?q:q-1;
			gr_href = gr_href.slice(0, q) + '?sorting_setting=CHRONOLOGICAL';
			gr_links[i].setAttribute('href', gr_href);
			count += 1;
		}
	}
	if(count > 0) console.log("scd replaced group links: " + count);
}

function remove_listeners(elem){
	elem.addEventListener("mousedown", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("mouseup", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("click", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("mouseover", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("mouseenter", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("mouseleave", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("mousemove", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("mouseout", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("focus", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("focusin", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("focusout", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("visibilitychange", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("pointerdown", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("pointerup", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("gotpointercapture", function (event) {event.stopPropagation();}, true);
	elem.addEventListener("pointerover", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("load", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("auxclick", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("pointermove", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("pointerout", function (event) { event.stopPropagation();}, true);
	elem.addEventListener("DOMContentLoaded", function (event) { event.stopPropagation();}, true);
}

function redirect_plus(){
// Redirect to "Recent Posts" view of news feed
	let wl_href = window.location.href;
	let count = 0;
	
	if (wl_href == "https://www.facebook.com/" ||
		// window.location.href == "https://www.facebook.com/?sk=h_nor" ||
		wl_href == "https://www.facebook.com/?ref=tn_tnmn" ||
		wl_href == "https://www.facebook.com/?ref=logo") {
	   window.location.href = 'https://www.facebook.com/?sk=h_chr'; 
	}

	sort_groups();
	
// Change links to point recent news feed.
	count = 0;
	var links = document.querySelectorAll(
		'a[href^="https://www.facebook.com/?ref="], ' +
		'a[href="https://www.facebook.com/"], ' +
		'a[href^="/?sk="], ' + 'a[href="/"] ' 
		// + ', a[href^="https://www.facebook.com/?sk="] '
		);
	for (var a = 0; a<links.length; a++){
		
		cls = links[a].getAttribute("class");
		if(cls.indexOf("scd") < 0){
			links[a].setAttribute("class", cls + " scd");
			remove_listeners(links[a]);
		}
		
		if (links[a] && 
			links[a].getAttribute('href') !== 'https://www.facebook.com/?sk=h_chr' ) {
			links[a].setAttribute('href', 'https://www.facebook.com/?sk=h_chr');
			count +=1;
		} 
	}
	if(count > 0) console.log("scd replaced noob links: " + count);
	
	switchToHrono();
}



function switchToHrono() {
// Change links to strip facebook tracking
	
	let count = 0;
	var ahref = document.querySelectorAll('a[href*="fbclid"]');
	// console.log('number of a links: ' + ahref.length);  
	for(var i = 0; i < ahref.length; i++){
		cls = ahref[i].getAttribute("class");
		if(cls.indexOf("scd") < 0){
			ahref[i].setAttribute("class", cls + " scd");
			remove_listeners(ahref[i]);
		}
		
		var href = ahref[i].getAttribute('href');
		href = href.replace('https://l.facebook.com/l.php?u=','');
		//console.log('scd sliced url: ' + href);
		href = decodeURIComponent( href );
		var ind = href.indexOf('fbclid');
		if ( ind !== -1){
			ind = ind - 1;
			href = href.slice( 0, ind );
			//href = href.slice( 0, href.indexOf('&fbclid') );
			
			//console.log('scd decoded url: ' + href);
			ahref[i].setAttribute('href', href);
			// console.log('scd replaced with: ' + href);
			count +=1;
		}
		if( ahref[i].getAttribute('data-lynx-uri') ){
			ahref[i].setAttribute('data-lynx-uri', href);
		}
	}
	if(count > 0) console.log('scd Converted urls: ' + count);
	
	sort_groups();
	
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
	selector += ', div.qzhwtbm6 > span.oi732d6d > span.jsc_c_3e > div.oajrlxb2[role="button"]';
	adds = document.querySelectorAll(selector);
	count = 0;
	
	for(var j = 0; j < adds.length; j++){
		if(adds[j].id !== null && adds[j].id.slice(0,3) !== 'scd'){
			par = adds[j].parentElement;
			feed = true;
			do {
				if(par.id.indexOf('hyperfeed_story_id') !== -1){
					// par.style = "display: none;";
					var add_title = par.querySelector('h5 > span > span > a');
					if(add_title!==null){
						par.innerHTML = 'scd: HIDDEN_ADD ( from: ' + add_title.outerHTML + ')' ;
						adds[j].id = 'scd_add' + j;
						count += 1;
					}
					feed = false;
					
				} else{
					par = par.parentElement;
				}
			} while (feed && par !== null);
			
		}
	}
	if(count > 0) console.log('scd Hidden Post Adds: ' + count);
	
	// Hide side adds
	adds = document.querySelectorAll('div > a[rel="nofollow"]');
	count = 0;
	par = null;
	feed = null;
	
	for( j = 0; j < adds.length; j++){
		if(adds[j].id !== null && adds[j].id.slice(0,3) !== 'scd'){
			par = adds[j].parentElement;
			feed = true;
			do {
				if(par.id.indexOf('pagelet_ego_pane') !== -1){
					par.style = "display: none;";
					adds[j].id = 'scd_add' + j;
					count += 1;
					feed = false;
				} else{
					par = par.parentElement;
				}
			} while (feed && par !== null);
			
		}
	}
	if(count > 0) console.log('scd Hidden Adds: ' + count);

// Pause all videos when scrolling
	count = 0;
	var videos = document.querySelectorAll('video._ox1');
	for( j = 0; j < videos.length; j++ ){
		if (!videos[j].paused){ 
	    	videos[j].pause(); 
	    	count += 1;
		}
	}
	if(count > 0) console.log('scd paused watch parties: ' + count);
}


// Set scrolling event to the global Container
document.getElementById("mount_0_0").addEventListener("wheel", redirect_plus);

// Run once, once loaded
window.setTimeout(redirect_plus, 500);
