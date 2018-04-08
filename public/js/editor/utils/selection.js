class Selection extends Array {

    select(object, add) {
		if(!add) {
			this.clear();
		}
		if(object.__editorData.isSelected) {
			this.remove(object);
		} else {
			this.add(object);
		}
		EDITOR.refreshTreeView();
	}



	clear() {
		while(this.length > 0) {
			this.remove(this[this.length -1]);
		}
		EDITOR.refreshTreeView();
	}
	
	add(o) {
		assert(!o.__editorData.isSelected);
		assert(this.indexOf(o) < 0);
		o.__editorData.isSelected = true;
		this.push(o);
	}

	remove(o) {
		assert(o.__editorData.isSelected);
		var i = this.indexOf(o);
		assert(i >= 0);
		o.__editorData.isSelected = false;
		this.splice(i, 1);
	}
}

export default Selection;