function Admin(options){

	var self = this;

	this.defaults = {
		updater:'admin/admin.updater.php',
		uploader:'admin/admin.uploader.php',
		mode:'visit'
	}

	this.attributes = {
		linkable:'admin-linkable',
		editable_text:'admin-editable-path',
		editable_html:'admin-editable-html-path',
		editable_image:'admin-editable-image-path',
		insertable:'admin-insertable-path',
		insertable_name:'admin-insertable-name',
		removable:'admin-removable-path'
	}

	Admin.prototype.Set = function() {
		this.setMenu();
		this.setMode(this.options.mode);
		this.setHandles();
	};

	Admin.prototype.setHandles = function() {
		this.handles.windowDrag();
		this.handles.editableClick();
	};

	Admin.prototype.setMenu = function() {
		this.menu = {};
		this.menu.buttons = document.getElementById('admin').getElementsByTagName('button');
		for(var i = 0; i < this.menu.buttons.length; i++){
			this.menu.buttons[i].onclick = function(){
				self.Refresh();
				self.setMode(this.id);
			}
		}
	};

	Admin.prototype.setMode = function(name) {
		console.log('* setMode:', name, '*');
		this.utils.disableLinks();
		this.modes[name]();
		this.updateMenu(name);
		this.options.mode = name;
	};

	Admin.prototype.modes = {
		visit:function(){
			bridge.setLinks();
		},
		edit:function(){
			self.setMode('edit_text');
			self.setMode('edit_html');
			self.setMode('edit_image');
		},
		insert:function(){
			self.setElements(self.attributes.insertable, function(element){
				self.setSelectable(element, true);
				element.onclick = function(e){
					e.preventDefault();
					e.stopPropagation();
					var componentName = this.getAttribute(self.attributes.insertable_name);
					var path = this.getAttribute(self.attributes.insertable);
					componentName = componentName.split(',');
					if(componentName.length > 1){
						self.utils.chooser(componentName, function(selected){
							self.setData({
								action: 'insert',
								path: path,
								value: self.options.components[selected]
							});
						})
					}else{
						componentName = componentName[0];
						self.setData({
							action: 'insert',
							path: path,
							value: self.options.components[componentName]
						});
					};
				}
			});
		},
		move:function(){
			self.setElements(self.attributes.insertable, function(element){
				var sortable = Sortable.create(element, {
					onEnd: function (evt) {
						console.log('move');
						self.setData({
							action: 'move',
							path: element.getAttribute(self.attributes.insertable),
							old_index: evt.oldIndex,
							new_index:  evt.newIndex
						});
					}
				});
			});
		},
		remove:function(){
			self.setElements(self.attributes.removable, function(element){
				element.onclick = function(e){
					e.preventDefault();
					e.stopPropagation();
					self.setData({
						action: 'remove',
						path: this.getAttribute(self.attributes.removable)
					});
				}
			});
		},
		edit_html: function(){
			self.setElements(self.attributes.editable_html, function(element){
				var content = element.innerHTML;
				element.innerHTML = "";
				var editor = CodeMirror(element, {
					value: content,
				 	mode:  "htmlmixed"
				});
				editor.on('blur', function(){
					content = editor.getValue();
					self.setData({
						action: 'edit',
						path: element.getAttribute(self.attributes.editable_html),
						value: content
					});
				})
			});
		},
		edit_text:function(){
			self.setElements(self.attributes.editable_text, function(element){
				var initialValue;
				element.contentEditable = 'true';
				element.onpaste =function(e){
					e.preventDefault();
					var value = e.clipboardData.getData("text/plain");
					element.innerHTML = value;
				}
				element.onfocus = function(){
					initialValue = this.innerText;
				}
				element.onblur = function(){
					var currentValue = this.innerText;
					if(currentValue == initialValue) return;
					self.setData({
						action: 'edit',
						path: this.getAttribute(self.attributes.editable_text),
						value: currentValue
					});
				}
			});
		},
		edit_image:function(){
			self.setElements(self.attributes.editable_image, function(element, i){
				var droploader = new Droploader(element, 'admin/admin.uploader.php', {
					path:element.getAttribute(self.attributes.editable_image)
				});
				droploader.on('success', function(a){
					console.log('File sended. Answer: ');
					console.log(a);
					self.Refresh();
				});
			});
		}
	}

	Admin.prototype.handles = {
		windowDrag:function(){
			var documentDragged = false;
			document.ondragenter = function(e){
				if(documentDragged){
					self.setMode('edit');
				}
				documentDragged = true;
			}
			document.ondragleave = function(e){
				if(!documentDragged){
					self.setMode(self.options.mode);
				}
				documentDragged = false;
			}
		},
		editableClick:function(){
			self.setElements(self.attributes.editable_text, function(element){
				element.ondblclick = function(e){
					self.setMode('edit');
					this.focus();
				}
			});
		}
	};

	Admin.prototype.setSelectable = function(element, state) {
		console.log('setSelectable', element);
		element.setAttribute('selectable', state);
	};

	Admin.prototype.updateMenu = function(active) {
		for(var i = 0; i < this.menu.buttons.length; i++){
			if(this.menu.buttons[i].id == active){
				this.menu.buttons[i].className = 'active';
			}else{
				this.menu.buttons[i].className = 'inactive';
			}
		}
	};

	Admin.prototype.setElements = function(attribute, func) {
		var elements = document.getElementsByTagName('*');
		for (var i = 0; i < elements.length; i++){
			if (elements[i].getAttribute(attribute) !== null){
				func(elements[i], i);
	    	}
		}
	};

	Admin.prototype.setData = function(a) {
		this.Request(a, this.options.updater, this.getData);
	};

	Admin.prototype.getData = function(a) {
		console.log(a);
		self.Refresh();
	};

	Admin.prototype.Refresh = function() {
		bridge.Set();
	};

	Admin.prototype.Request = function(a, url, callback = false) {
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

	Admin.prototype.getOptions = function(first, second) {
		for(var x in second){
			first[x] = second[x];
		}
		return first;
	};

	Admin.prototype.utils = {
		clearSelection: function(){
		    if(document.selection && document.selection.empty) {
		        document.selection.empty();
		    } else if(window.getSelection) {
		        var sel = window.getSelection();
		        sel.removeAllRanges();
		    }
		},
		disableLinks: function(){
			var links = document.getElementsByTagName('a');
			for (var i = 0; i < links.length; i++) {
				links[i].onclick = function(e){
					e.preventDefault();
				}
			}
		},
		chooser: function(options, callback){
			var parent = document.body;
			var select = document.createElement('select');
			var label = document.createElement('option');
			label.setAttribute('disabled', 'disabled');
			label.setAttribute('selected', 'selected');
			label.innerText = 'Choose';
			select.appendChild(label);
			select.className = 'admin-chooser';
			parent.appendChild(select);
			select.onchange = function(){
				callback(this.value);
				parent.removeChild(select);
			}
			for(var i = 0; i < options.length; i++){
				var option = document.createElement('option');
				option.innerText = options[i];
				select.appendChild(option);
			}
		}
	};

	this.options = this.getOptions(this.defaults, options);
	this.Request({}, 'admin/admin.components.json', function(a){
		self.options.components = a;
		self.Set();
	});
}