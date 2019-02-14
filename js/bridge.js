function Bridge(options){

	var self = this;

	this.defaults = {
		parent: document.getElementById('wrap'),
		getter: 'php/get.php',
		callback: false
	}

	window.onpopstate = function(){
		self.getContent(window.location.href);
	}

	Bridge.prototype.on = function(event, func) {
		this.events[event] = func;
	};

	Bridge.prototype.events = {
		load:function(){}
	}

	Bridge.prototype.Set = function() {
		this.getContent(window.location.href);
	};

	Bridge.prototype.getContent = function(url) {
		url = url.replace(/^.*\?/, '');
		var params = this.getURLParams(url);
		url = (params) ? '?' + url:'';
		history.pushState({}, document.title, url);
		this.Request(params, self.options.getter, self.setContent);
	};

	Bridge.prototype.setContent = function(content) {
		var initialScroll = self.utils.getScrollPosition().top;
		self.options.parent.innerHTML = content;
		self.setLinks();
		self.events.load();
		window.scrollTo(0, initialScroll);
	};

	Bridge.prototype.setLinks = function() {
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			links[i].onclick = function(e){
				
				console.log(this.href);
				console.log(self.utils.isExternalUrl(this.href));
				if(!self.utils.isExternalUrl(this.href)){
					e.preventDefault();
					self.getContent(this.href);
				}
			}
		}
	};

	Bridge.prototype.getURLParams = function(query) {
	    if(query.indexOf('=') === -1){
	        return false;
	    }
		var vars = query.split("&");
		var query_string = {};
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
		  		// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
		  		var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
		  		query_string[pair[0]] = arr;
		  		// If third or later entry with this name
			} else {
		  		query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
	  	}
	  	return query_string;
	};

	Bridge.prototype.Request = function(a, url, callback = false) {
		console.log("Requesting: ", a);
		a = encodeURIComponent(JSON.stringify(a));
		var r = new XMLHttpRequest();
		r.open("POST", url, true);
		r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		r.onload = function() {
			try { var result = JSON.parse(r.responseText); }
			catch(e) { var result = r.responseText; }
			if(r.readyState == 4 && r.status == 200 && callback) callback(result);
		}
		r.send("data=" + a);
	};

	Bridge.prototype.getOptions = function(first, second) {
		for(var x in second){
			first[x] = second[x];
		}
		return first;
	};

	Bridge.prototype.utils = {
		getScrollPosition:function(){
			var doc = document.documentElement;
			var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			return {
				left:left,
				top:top
			}
		},
		isExternalUrl:function(url){
		    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
		    if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
		    if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
		    return false;
		}
	};

	this.options = this.getOptions(this.defaults, options);
	this.Set();
}	