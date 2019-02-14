function Roll(options){

	var self = this;

	this.defaults = {
		parent: false,
		navigation: false,
		navigationParent:false,
		callback: false,
		selfroll: true
	}

	Roll.prototype.Set = function() {
		var parent = this.options.parent;
		this.childnodes = parent.childNodes;
		this.count = this.childnodes.length;
		this.setNavigation();
		this.setRollItem(this.index);
		if(this.options.selfroll){
			parent.onclick = function(){
				var index = (self.index < self.childnodes.length-1) ? self.index+=1:0;
				self.setRollItem(index);
			}
		}
	};

	Roll.prototype.setNavigation = function() {
		var type = this.options.navigation;
		var parent = (this.options.navigationParent) ? this.options.navigationParent:this.options.parent.parentNode;
		var container = document.createElement('div');
		container.className = 'roll-nav';
		var navigation = this.navigations[type].init(container);
		parent.appendChild(navigation);
	};

	Roll.prototype.setRollItem = function(index) {
		this.index = index;
		this.utils.hide(this.childnodes);
		this.utils.show(this.childnodes[index]);
		this.setNavigationIndex(index);
	};

	Roll.prototype.setNavigationIndex = function(index) {
		this.navigations[this.options.navigation].Set(index);
	};

	Roll.prototype.navigations = {
		balls:{
			items:[],
			init:function(container){
				for(var i = 0; i < this.count; i++){
					var ball = document.createElement('div');
					ball.setAttribute('key', i);
					ball.setAttribute('style', 'height:5px;width:5px;float:left;margin-right:3px;');
					container.appendChild(ball);
					ball.onclick = function(){
						self.setRollItem(i);
					}
					self.navigations.balls.items.push(ball);
				}
				return container;
			},
			Set:function(index){
				self.utils.setInactive(self.navigations.balls.items);
				self.utils.setActive(self.navigations.balls.items[index]);
			}
		}
	}

	Roll.prototype.utils = {
		setActive: function(elements){
			self.utils.setElements(elements, function(element){
				element.setAttribute('active', 'true');
			});
		},
		setInactive: function(elements){
			self.utils.setElements(elements, function(element){
				element.setAttribute('active', 'false');
			});
		},
		hide: function(elements){
			console.log('hide');
			self.utils.setElements(elements, function(element){
				element.style.display = 'none';
			});
		},
		show: function(elements){
			console.log('show');
			self.utils.setElements(elements, function(element){
				element.style.display = 'block';
			});
		},
		setElements: function(elements, callback){
			console.log('elements');
			console.log(elements);
			var elements = (elements.constructor === NodeList) ? elements:[elements];
			for(var i = 0; i < elements.length; i++){
				callback(elements[i]);
			}
		},
		getOptions: function(first, second){
			for(var x in second){
				first[x] = second[x];
			}
			return first;
		}
	}

	this.options = this.utils.getOptions(this.defaults, options);
	this.Set();
}