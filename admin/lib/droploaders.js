function Droploader(element, uploader, params){

	var self = this;
	this.element = element;
	this.uploader = uploader;
	this.params = params;

	Droploader.prototype.Set = function() {
		this.element.ondrop = function(e){
			e.preventDefault();
			e.stopPropagation();
			console.log(self.params);
			self.sendFiles(e.dataTransfer.files);
			self.events.drop();
		}
		this.element.ondragover = function(e){
			e.preventDefault();
			e.stopPropagation();
			self.events.dragover();
		}
	};

	Droploader.prototype.Unset = function() {
		this.element.ondrop = false;
		this.element.ondragover = false;
	};

	Droploader.prototype.sendFiles = function(files) {
		console.log(files);
		if(files.length > 0) {
		   	var form = new FormData();
			for(var i = 0; i < files.length; ++i) {
				var file = files[i];
				form.append(i, file, file.name);
				form.append(i, JSON.stringify(this.params));
				console.log(form);
		    }
			var request = new XMLHttpRequest();
		    request.open('POST', this.uploader, true);
		    request.onload = function(e) {
		    	var response = request.responseText;
				self.events.success(response);
		    }
		    request.send(form);
	  	}
	};

	Droploader.prototype.on = function(event, func) {
		this.events[event] = func;
	};

	Droploader.prototype.events = {
		success:function(){},
		drop:function(){},
		dragover:function(){}
	}

	this.Set();
}