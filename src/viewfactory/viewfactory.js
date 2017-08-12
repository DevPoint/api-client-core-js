
function createFactory() {

	const _createView = function(viewData) {

		let _data = viewData;

		return {

			viewId: function() {
				return _data.viewId;
			},

			ready: function() {
				return _data.ready;
			},

			loading: function() {
				return _data.loading;
			},

			outdated: function() {
				return _data.outdated;
			},

			hash: function() {
				return _data.hash;
			},

			itemType: function() {
				return _data.itemType;
			},

			itemOffset: function() {
				return _data.itemOffset;
			},

			itemCount: function() {
				return _data.itemCount;
			},

			page: function() {
				return _data.page;
			},

			pageSize: function() {
				return _data.pageSize;
			},

			totalCount: function() {
				return _data.totalCount;
			},

			load: function() {
				return _data.load;
			},

			items: function() {
				return _data.items;
			},

			first: function() {
				return _data.items && _data.items.length ? _data.items[0] : null;
			},

			last: function() {
				return _data.items && _data.items.length ? _data.items[_data.items.length-1] : null;
			},

		}
	}

	const factory = {

		createBuilder: _createBuilder,

	};

	return factory;
 }

export default createFactory; 