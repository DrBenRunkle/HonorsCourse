var currentOrigin = window.location.origin;

//console.log(currentOrigin);
window.addEventListener('load', () => {
	var parentNav = currentOrigin + "/" + current_path.split('/')[1] + "/index.php";
	var childNav = currentOrigin + "/" + current_path.split('/')[1] + "/" +current_path.split('/')[2] + "/index.php";
	var currentFullPath = currentOrigin + current_path;
	
	var current_link  = $('#uark-sidebar ul li a[href="'+ currentFullPath +'"]');
	var current_parent_link = $('#uark-sidebar ul li a[href="'+ childNav +'"]');
	var current_grandparent_link = $('#uark-sidebar ul li a[href="'+ parentNav +'"]');
	
	//console.log(currentFullPath);
	//console.log(parentNav);
	//console.log(childNav);
	
	//current_grandparent_link.addClass('selected');
	//current_parent_link.addClass('selected');
	//current_link.addClass('selected');
	
	$('#uark-site-topnav ul li').each(function() {
		var navURL = $(this).find('a').attr("href");
				if(!navURL.includes(origin) && !navURL.includes("uark.edu")) {
					navURL = currentOrigin + navURL;
				}

		if(navURL == parentNav || navURL == currentFullPath || navURL == childNav || navURL == current_path) {
			
			$(this).addClass("selected");
		}
		
	});
	
	$('#uark-mobile-topnav li a').each(function() {
		var navURL = $(this).attr("href");
		
				if(!navURL.includes(origin) && !navURL.includes("uark.edu")) {
					navURL = currentOrigin + navURL;
				}
		
		if(navURL == parentNav || navURL == currentFullPath || navURL == childNav) {
			$(this).addClass("selected").addClass("current");
		}
		
		if(!($(this).parent().hasClass("nav-item"))) {
		   $(this).parent().addClass("nav-item");
		}
		
	});

	
	
// Get current page name.
// Normalize to directory/filename, no extensions, no index
	
	
	$('#uark-site-topnav ul li.nav-item, #uark-mobile-topnav li.nav-item').each(function() {
		var topLink = $(this).find('a').attr('href');
		
		var topDom = $(this);
		
		
		$(this).find('ul.dropdown-menu li a').each(function() {
			if ($(this).attr('href') === topLink) {
				//topLink is in the dropdown. Don't add a link
				return false;
			} else {
				topDom.find('ul.dropdown-menu').prepend('<li><a class="dropdown-item" href="'+topLink+'">Overview</a></li>');
				return false;
			}
		});
	});
	
	if(window.matchMedia("(max-width: 767px)").matches)
	{
		
		if($("#uark-mobile-topnav li").length == 0) {
			var navFilePath = currentOrigin + "/";
			$.get(navFilePath + '_nav.inc',function(response){ 
				if(response.includes("li")) { 
					$("#uark-mobile-topnav").append(response);
					$("#uark-mobile-topnav").find('li').each(function() {
						$thischild = $(this);
						
						var subNavLocation = $thischild.find('a').attr('href');
						var aTagText = $thischild.find('a').text();

						//console.log(aTagText);
						
						if(subNavLocation == parentNav || subNavLocation == currentFullPath || subNavLocation == childNav) {
							$thischild.find('a').addClass("selected").addClass("current");
						}


						var subNavPath = subNavLocation.replace("index.php","");
						$thischild.find('a').attr("href", subNavLocation).removeClass('uark-nav-link').addClass('nav-link');
						$(this).attr('data-nav-path', subNavPath.replace(".php","/")).addClass("nav-item").addClass("accordion");
						
						if(subNavPath.includes(".php") == false && aTagText != "Overview" && aTagText != "Home") {
						
							if(subNavPath.includes('https://')) 
							{
								if(subNavPath.includes(origin)) {
									nestedNavList(subNavPath, $thischild, uniqId(), uniqId());
								}
							} else {
								nestedNavList(subNavPath, $thischild, uniqId(), uniqId());

							}
						}
					});
				}
			});
		}
		
		$('#uark-mobile-topnav li a').each(function() {
			var topelement = $(this);
			var toppath = $(this).attr("href");
			$('#uark-sidebar li a').each(function() {
				//console.log(toppath + "-" + parentNav);
				if($(this).attr("href") == toppath) {
					//topelement.parent().remove();
				}
				if(parentNav == toppath) {
					//$(this).parent().remove();
				}
			});
		});
		
		$('#uark-sidebar li').each(function() { 
			if($(this).children("ul").length >= 1) {
				//console.log($(this).find("a").attr("href"));
				//$(this).children("ul").remove();
			}
		});
		
		
		$('#uark-sidebar li').each(function() {
				//$("#uark-mobile-topnav").append($(this));
		});
		
		$('#uark-mobile-topnav li a').each(function() { 
			$(this).closest("li").addClass("accordion");
			var href = ($(this).attr("href")).replace("index.php", "");
			//console.log($(this).attr("href"));
			$(this).attr("href", href).removeClass('uark-nav-link').addClass('nav-link');
			$(this).parent().attr('data-nav-path', $(this).attr("href"));
			
			
		});
		
		var currentPath = current_path.replace('index.php', '');
		var links_list = $("#uark-mobile-topnav ul.nav-stacked li a");
		var currentSelectedPath = currentFullPath.replace(".php","/");
		
		 $('#uark-mobile-topnav').children().each(function() {
			var nestedloop = uniqId() ;
			var topnavCounter = uniqId();
			var $this = $(this);
			var isDropdownClass = $this.hasClass('dropdown');
			topnavCounter++;
			var origin = currentOrigin + "/";
			
			
			if(!isDropdownClass) {
				var navPath = $this.attr("data-nav-path");
				var overviewLocation = $this.find('a').attr('href');
				if(navPath != null && navPath != '/' && !navPath.includes("#") && navPath.includes(currentOrigin) && navPath != origin) {
					if(navPath.includes(".php") == false) { 
						if(navPath.includes('https://')) 
						{
							if(navPath.includes(origin)) {
								
								nestedNavList(navPath, $this, uniqId(), uniqId());
							}
						} else {
							
							//nestedNavList(navPath, $this, uniqId(), uniqId());
						}
					}	
				} 
			} else {
				$this.removeClass('dropdown');
				$this.find("li").each(function() {
					var subnavPath = $(this).attr("data-nav-path");
					
					var isOverview = ($(this).find('a').text() != "Overview") ? false : true;
					
					if(subnavPath != null && subnavPath != '/' && !isOverview && !subnavPath.includes("#") && subnavPath.includes(currentOrigin) && navPath != origin) {
						if(subnavPath.includes(".php") == false) { 
							//console.log(subnavPath);	
							if(subnavPath.includes('https://')) 
							{
								if(subnavPath.includes(origin)) {
									
									nestedNavList(subnavPath, $(this), uniqId(), uniqId());
								}
							} else {

								//nestedNavList(subnavPath, $(this), uniqId(), uniqId());
							}
						}	
					}
				});
				
			}
			
				$this.children('a.dropdown-toggle').removeClass('dropdown-toggle').addClass('accordion-button collapsed').attr('aria-expanded','false').attr('data-bs-toggle', 'collapse').attr('data-bs-target', '#mobileMenu'+topnavCounter);
				$this.children('ul.dropdown-menu').removeClass('dropdown-menu').addClass('collapse').attr('id', 'mobileMenu'+topnavCounter); 
		});
		
	}
	
	$("#uark-mobile-topnav li a").click(function(e) {
		var href=$(this).prop('href');
		if (href.indexOf('#') > -1) {
			$("#uark-mobile-menu-button").addClass('position-fixed').attr("style", "margin-top: -15px !important; right: 0; margin-right: 15px;");
		}
	});
	
	
	
	var isHomeExists = false;
	$('#uark-mobile-topnav li a').each(function() {
		var href = $(this).attr("href");
		if($(this).text().trim() == "Home") {
				isHomeExists = true;
		}
	});
	
	if(!isHomeExists) {
		//console.log($("#uark-mobile-topnav li").length);
		
		var html = "<li><a class='nav-link' href='"+currentOrigin+"'>Home</a></li>";
        $("#uark-mobile-topnav").prepend(html);
	}
	
	
	
	
	var scrollTimer;

	$(window).on("scroll",function(){
		clearTimeout(scrollTimer);
		//Do  what you want whilst scrolling
		scrollTimer=setTimeout(function(){
			$("#uark-mobile-menu").offcanvas('hide');
		},100);
	})
	
});


function nestedNavList(navPath, ele, navId, nestedId) {
	var parentNav = currentOrigin + "/" + current_path.split('/')[1] + "/index.php";
	var childNav = currentOrigin + "/" + current_path.split('/')[1] + "/" +current_path.split('/')[2] + "/index.php";
	var currentFullPath = currentOrigin + current_path;
	
	
	
	var fileExists = UrlExists(navPath + '_nav.inc');
  
	if(fileExists && parentNav != ele.find('a').attr('href')) {
			//console.log(fileExists);

		$.get(navPath + '_nav.inc',function(response){ 
			var overviewTag = "";
			 //console.log("Response: ", response);
			if(response.includes("li")) {
				
				if(!(response.includes('>Overview<'))) {
									
					overviewTag = '<li><a class="dropdown-item" href="'+ ele.children(":first").attr("href") +'">Overview</a></li>';
				} 
				
				
				
				ele.append('<ul data-nav-path="'+ navPath +'" class="collapse" id="mobileMenu'+ nestedId +'" aria-labelledby="navbarDarkDropdownMenuLink'+nestedId+'">' + overviewTag + response + '</ul>');

				var subNestedId = uniqId();
				var subNavId = uniqId();
				
				if(!(ele.find('ul').find('li').find('a').text()).includes("Overview")){
					//ele.find("ul[data-nav-path='" + navPath + "']").prepend('<li><a class="dropdown-item" href="'+parentNav+'">Overview</a></li>');
				}

				
				ele.find('li').each(function() {
					$thischild = $(this);
					var subNavLocation = $thischild.find('a').attr('href');
					var aTagText = $thischild.find('a').text();

					if(subNavLocation == parentNav || subNavLocation == currentFullPath || subNavLocation == childNav) {
						$thischild.find('a').addClass("selected").addClass("current");
					}

					if(subNavLocation) {
						var subNavPath = subNavLocation.replace("index.php","");
						$thischild.find('a').attr("href", subNavLocation).removeClass('uark-nav-link').addClass('nav-link');
						$(this).attr('data-nav-path', subNavPath.replace(".php","/"));


						if(subNavPath.includes(".php") == false && aTagText != "Overview" && !subNavPath.includes("#")) {
							//console.log(subNavLocation + " = " + parentNav);
							if(subNavPath.includes('https://')) 
							{
								if(subNavPath.includes(origin)) {
									//nestedNavList(subNavPath, $thischild, uniqId(), uniqId());
								}
							} else {
								//nestedNavList(subNavPath, $thischild, uniqId(), uniqId());

							}
						}
					}

					
					
				});
				
				ele.children('a').addClass('accordion-button collapsed').attr('aria-expanded','false').attr('data-bs-toggle', 'collapse').attr('data-bs-target', '#mobileMenu'+nestedId);
			};
   		});
	}
	
	
	
}

function uniqId() {
  return Math.round(new Date().getTime() + (Math.random() * 100));
}


async function UrlExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;  // Returns true if the response status is 200-299
    } catch (error) {
        console.error('Error checking URL:', error);
        return false;  // Return false if there’s a network error
    }
}

/*function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}*/
