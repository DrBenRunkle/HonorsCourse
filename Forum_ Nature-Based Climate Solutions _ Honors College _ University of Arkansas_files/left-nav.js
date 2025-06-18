$(document).ready(function() {
// Get current page name.
// Normalize to directory/filename, no extensions, no index
	var origin = window.location.origin;
	var links_list = $("#uark-sidebar ul.nav-stacked li a");
    var current_link  = $('#uark-sidebar ul li a[href="'+ origin + current_path +'"]');
	
	//console.log(current_link);
	
	$('#uark-sidebar ul').each(function(){ 
		var data_nav_path = $(this).attr('data-nav-path');
		//console.log(data_nav_path);
		if(data_nav_path) {
			$(this).attr('data-nav-path', origin + data_nav_path);
		}	
	});
	
	//console.log(links_list);
	
 	$(links_list).each(function () {

		var link = $(this).attr('href');
		console.log(link);
		//if(!link.includes(origin) && !link.includes("uark.edu")) {
		if(!link.includes("https://") && !link.includes("http://")) {	
			link = origin + link;
			$(this).attr("href", link);
			
			if(link == origin + current_path) {
				//$(this).attr("href", origin + link);
				$(this).addClass('selected');
			}
			//$(this).attr("href", link);
		}
		//console.log($(this).closest("li"));
		//$(this).closest("li").attr("data-link-path", link);
		//assigns a data atttribute to all lists so we can .append the active UL into a LI and replace the .php to '/'
		$(this).closest("li").attr("data-link-path", link.replace("index.php","").replace(".php", "/"));
	
	}); 

	current_link.addClass('selected');
	
	var current_data_path = current_path.replace("index.php","").replace(".php", "/");
	var path_array = current_data_path.split('/').filter(function(v){return v!==''});
	var path_length = path_array.length;
	var current_data_object = null, current_data_nav= null, current_data_nav_parent = null, current_data_nav_child = null, current_data_nav_grandchild = null, current_data_object_grandchild = null, current_data_object_child=null, current_data_object_parent=null, current_data_nav_greatgrandchild = null, current_data_object_greatgrandchild = null;
	
	console.log(path_length);
	
	if(path_length == 1) {
		current_data_object = $("#uark-sidebar").find("ul[data-nav-path='" + origin + current_data_path + "']");
		current_data_nav = origin + current_data_path;
	} else if(path_length == 2) {
		current_data_object = $("#uark-sidebar").find("ul[data-nav-path='" + origin + current_data_path + "']");
		current_data_object_parent = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/']");
		current_data_nav = origin + current_data_path;
		current_data_nav_parent = origin + "/" + path_array[0] + "/";

	} else if(path_length == 3) {
		
		current_data_object = $("#uark-sidebar").find("ul[data-nav-path='" + origin + current_data_path + "']");
		current_data_object_child = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/" + path_array[1] + "/']");
		current_data_object_parent = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/']");
		current_data_nav = origin + current_data_path;
		current_data_nav_parent = origin + "/" + path_array[0] + "/";
		current_data_nav_child = origin + "/" + path_array[0] + "/" + path_array[1] + "/";
	} else if(path_length == 4) {
		current_data_object = $("#uark-sidebar").find("ul[data-nav-path='" + origin + current_data_path + "']");
		current_data_object_child = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/" + path_array[1] + "/']");
		current_data_object_grandchild = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/" + path_array[1] + "/" + path_array[2] + "/']");
		current_data_object_parent = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/']");
		current_data_nav = origin + current_data_path;
		current_data_nav_parent = origin + "/" + path_array[0] + "/";
		current_data_nav_child = origin + "/" + path_array[0] + "/" + path_array[1] + "/";
		current_data_nav_grandchild = origin + "/" + path_array[0] + "/" + path_array[1] + "/" + path_array[2] + "/";
		
		//console.log("Current Nav path - " + current_data_nav);
		//console.log("Current Nav path Parent - " + current_data_nav_parent);
		//console.log("Current Nav path Child - " + current_data_nav_child);
		//console.log("Current Nav path Grand Child - " + current_data_nav_grandchild);
	} else if(path_length == 5) {
		
		
		current_data_object = $("#uark-sidebar").find("ul[data-nav-path='" + origin + current_data_path + "']");
		current_data_object_child = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/" + path_array[1] + "/']");
		current_data_object_grandchild = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/" + path_array[1] + "/" + path_array[2] + "/']");
		current_data_object_parent = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/']");
					current_data_object_greatgrandchild = $("#uark-sidebar").find("ul[data-nav-path='" + origin + "/" + path_array[0] + "/" + path_array[1] + "/" + path_array[2] + "/" + path_array[3] + "/']");

		current_data_nav = origin + current_data_path;
		current_data_nav_parent = origin + "/" + path_array[0] + "/";
		current_data_nav_child = origin + "/" + path_array[0] + "/" + path_array[1] + "/";
		current_data_nav_grandchild = origin + "/" + path_array[0] + "/" + path_array[1] + "/" + path_array[2] + "/";
		current_data_nav_greatgrandchild = origin + "/" + path_array[0] + "/" + path_array[1] + "/" + path_array[2] + "/"+ path_array[3] + "/";

		console.log("Current Nav path - " + current_data_nav);
		console.log("Current Nav path Parent - " + current_data_nav_parent);
		console.log("Current Nav path Child - " + current_data_nav_child);
		console.log("Current Nav path Grand Child - " + current_data_nav_grandchild);
			console.log("Current Nav path Great Grand Child - " + current_data_nav_greatgrandchild);
	
	}

	
	$('#uark-sidebar ul').each(function(){
		var parentUL = $(this);
		
		if($(this).children("li").length >= 1) { 
			$(this).find('li').each(function() {
				var LI = $(this);
				var navPathLI = $(this).attr('data-link-path');
				
				//console.log("Current Nav path LI - " + navPathLI);
				
				if(navPathLI == current_data_nav) {
					//console.log(current_data_object);
					if(current_data_object) {
						if(current_data_object.length >= 1) {
							//console.log(parentUL.attr('data-nav-path') + "-" + current_data_object.attr('data-nav-path'));
							if(parentUL.attr('data-nav-path') != current_data_object.attr('data-nav-path')) {
								LI.append(current_data_object);
							}
							
						}
					}
				} 
				if (navPathLI == current_data_nav_parent) {
					if(current_data_object_parent) {
						if(current_data_object_parent.length >= 1) {
							//console.log(navPathLI + "-" + current_data_nav_parent);
							if(parentUL.attr('data-nav-path') != current_data_object_parent.attr('data-nav-path')) {
								LI.append(current_data_object_parent);
							}
							
						}
					}
				} 
				if(navPathLI == current_data_nav_child) {
					if(current_data_object_child) {
						if(current_data_object_child.length >= 1) {
							//console.log(navPathLI + "-" + current_data_nav_child);
							//
							if(parentUL.attr('data-nav-path') != current_data_object_child.attr('data-nav-path')) {
								LI.append(current_data_object_child);
							}
						}
					}
				}
				if(navPathLI == current_data_nav_grandchild) {
					console.log(navPathLI + "-" + current_data_object_grandchild.length);
					if(current_data_object_grandchild) {
						if(current_data_object_grandchild.length >= 1) {
							//console.log(navPathLI + "-" + current_data_object_grandchild);
							if(parentUL.attr('data-nav-path') != current_data_object_grandchild.attr('data-nav-path')) {
								LI.append(current_data_object_grandchild);
							}
						}
					}
				}
				if(navPathLI == current_data_nav_greatgrandchild) {
					console.log(navPathLI + "-" + current_data_object_greatgrandchild.length);
					if(current_data_object_greatgrandchild) {
						if(current_data_object_greatgrandchild.length >= 1) {
							//console.log(navPathLI + "-" + current_data_object_grandchild);
							if(parentUL.attr('data-nav-path') != current_data_object_greatgrandchild.attr('data-nav-path')) {
								LI.append(current_data_object_greatgrandchild);
							}
						}
					}
				}
			}); 
		}	
	});
	
	
	
	
});
