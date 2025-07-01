function sortGroups() {
	// By chat GPT
  let count = 0;
  const grLinks = document.querySelectorAll('a[href^="https://www.facebook.com/groups"], a[href^="/groups/"]');
  
  for (let i = 0; i < grLinks.length; i++) {
    const link = grLinks[i];
    const cls = link.getAttribute("class");

    if (cls && cls.indexOf("evb") === -1) {
      link.classList.add("evb");
      removeListeners(link);
    }

    const grHref = link.getAttribute('href');
    if (grHref && grHref.indexOf('permalink') === -1 && grHref.indexOf('CHRONOLOGICAL') === -1) {
      const qIndex = grHref.indexOf('?');
      const separator = qIndex === -1 ? '?' : '&';

      link.setAttribute('href', `${grHref}${separator}sorting_setting=CHRONOLOGICAL`);
      count++;
    }
  }

  if (count > 0) {
    console.log(`EVB replaced group links: ${count}`);
  }
}

function removeListeners(elem){
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

function redirectPlus() {
	// by chat GPT
  const wlHref = window.location.href;
  let count = 0;

  const topLevelURLs = [
    "https://www.facebook.com/",
    "https://www.facebook.com/?ref=tn_tnmn",
    "https://www.facebook.com/?ref=logo"
  ];

  if (topLevelURLs.includes(wlHref)) {
    window.location.href = 'https://www.facebook.com/?sk=h_chr';
  }

  const topPostsLink = document.querySelector('div.g5gj957u > a[aria-label="Back to Top Posts"]');
  if (topPostsLink) {
    topPostsLink.setAttribute("href", "https://www.facebook.com/?sk=h_nor");
    const cls = topPostsLink.getAttribute("class");
    if (!cls.includes("evb")) {
      topPostsLink.classList.add("evb");
      removeListeners(topPostsLink);
    }
  }

  sortGroups();

  count = 0;
  const links = document.querySelectorAll(
    'a[href^="https://www.facebook.com/?ref="], ' +
    'a[href="https://www.facebook.com/"], ' +
    'a[href^="/?sk="], ' +
    'a[href="/"]'
  );

  for (let a = 0; a < links.length; a++) {
    const link = links[a];
    const cls = link.getAttribute("class");
    if (!cls.includes("evb")) {
      link.classList.add("evb");
      removeListeners(link);
    }

    if (link.getAttribute('href') !== 'https://www.facebook.com/?sk=h_chr') {
      link.setAttribute('href', 'https://www.facebook.com/?sk=h_chr');
      count += 1;
    }
  }

  if (count > 0) {
    console.log("EVB replaced noob links: " + count);
  }

  switchToHrono();
}

function hidePostAds() {
	// by chat GPT
  const selectors = 'a[href^="/ads/about/?"]:not([id^="evb"])';
  const adds = Array.from(document.querySelectorAll(selectors));
  let count = 0;

  for (const add of adds) {
    let par = add.parentElement;
    let feed = true;

    do {
      if (par.tagName == "DIV" && par.classList.contains("x1lliihq")) {
      	par.style.display = 'none';
          add.id = 'evb_add' + count;
          count += 1;
        // }
        feed = false;
      } else {
        par = par.parentElement;
      }
    } while (feed && par !== null);
  }

  if (count > 0) {
    console.log('EVB Hidden Post Ads: ' + count);
  }
}

function trigger_mouseover(){
	selectors = [];
	selectors.push('a.oajrlxb2');
	selectors.push('a.tes86rjd');
	adds = document.querySelectorAll(selectors.join(','));
	adds.forEach((x)=>{
		let mouseoverEvent = new Event('mouseover');
		x.dispatchEvent(mouseoverEvent);
	});
}


function convertFacebookTrackingLinks() {
  let count = 0;
  const aLinks = document.querySelectorAll('a[href*="fbclid"]');
  
  for (const link of aLinks) {
    const cls = link.getAttribute("class");
    
    if (cls.indexOf("evb") < 0) {
      link.classList.add("evb");
      removeListeners(link);
    }
    
    let href = link.getAttribute('href');
    href = href.replace('https://l.facebook.com/l.php?u=', '');
    href = decodeURIComponent(href);
    
    const ind = href.indexOf('fbclid');
    if (ind !== -1) {
      href = href.slice(0, ind - 1);
      link.setAttribute('href', href);
      count += 1;
    }
    
    if (link.getAttribute('data-lynx-uri')) {
      link.setAttribute('data-lynx-uri', href);
    }
  }
  
  if (count > 0) {
    console.log('EVB Converted urls: ' + count);
  }
}

function hideSideAds() {
  let count = 0;
  const adds = document.querySelectorAll('div > a[rel="nofollow"]');
  let par = null;
  let feed = null;
  
  for (let j = 0; j < adds.length; j++) {
    if (adds[j].id !== null && adds[j].id.slice(0, 3) !== 'evb') {
      par = adds[j].parentElement;
      feed = true;
      
      do {
        if (par.id.indexOf('pagelet_ego_pane') !== -1) {
          par.style.display = "none";
          adds[j].id = 'evb_add' + j;
          count += 1;
          feed = false;
        } else {
          par = par.parentElement;
        }
      } while (feed && par !== null);
    }
  }
  
  if (count > 0) {
    console.log('EVB Hidden Adds: ' + count);
  }
}

function pauseVideos() {
  let count = 0;
  const videos = document.querySelectorAll('video');
  
  for (let j = 0; j < videos.length; j++) {
    if (!videos[j].paused) {
      videos[j].pause();
      count += 1;
    }
  }
  
  if (count > 0) {
    console.log('EVB paused watch parties: ' + count);
  }
}

function switchToHrono() {
  convertFacebookTrackingLinks();
  sortGroups();
  trigger_mouseover();
  hidePostAds();
  hideSideAds();
  pauseVideos();
  document.querySelectorAll('div.x9f619[role="navigation"]')[0].style.display = "none";
}


// Set scrolling event to the global Container
document.getElementsByTagName("body")[0].addEventListener("wheel", redirectPlus);
document.getElementsByTagName("body")[0].addEventListener("scroll", redirectPlus);
document.getElementsByTagName("body")[0].addEventListener("touchmove", redirectPlus);

// Run once, once loaded
window.setTimeout(redirectPlus, 500);

