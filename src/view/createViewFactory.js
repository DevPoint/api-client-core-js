
function createViewFactory() {

	const _createView = function(viewId, itemType, asyncLoader, builder) {

		let _ready = false;

		let _outdated = false;

		let _loading = false;

		let _loadingFailed = false;

		let _loadingMeta = {
			eagerType: builder.getEagerType(),
			offset: builder.getOffset(),
			count: builder.getCount(),
			pageSize: builder.getPageSize(),
			totalCount: 0,
			errors: []
		};

		let _hash = '';

		let _items = [];

		let _handleLoadingReady = function(items, meta) {
			_items = items;
			_loadingMeta = {
				eagerType: meta.eagerType,
				offset: meta.offset,
				count: meta.count,
				pageSize: meta.pageSize,
				totalCount: meta.totalCount,
				errors: []
			},
			_loading = false;
			_loadingFailed = false;
			_outdated = false;
			_ready = true;
		},

		let _handleLoadingCanceled = function() {
			_loading = false;
			_loadingFailed = false;
		},

		let _handleLoadingFailed = function(meta) {
			_loadingMeta = {
				totalCount: 0,
				errors: meta.errors.slice(0)
			},
			_loading = false;
			_loadingFailed = true;
		},

		return {

			viewId: function() {
				return viewId;
			},

			itemType: function() {
				return itemType;
			},

			ready: function() {
				return _ready;
			},

			outdated: function() {
				return _outdated;
			},

			load: function() {
				_loading = true;
				asyncLoader.load({
					eagerType: builder.getEagerType(),
					offset: builder.getOffset(),
					count: builder.getCount(),
					pageSize: builder.getPageSize(),
					filters: builder.getFilters(),
					sorts: builder.getSorts(),
					onLoaded: _handleLoadingReady,
					onCanceled: _handleLoadingCanceled,
					onFailed: _handleLoadingFailed
				});
			},

			loading: function() {
				return _loading;
			},

			loadingFailed: function() {
				return _loadingFailed;
			},

			loadingMetaOffset: function() {
				return _loadingMeta.offset;
			},

			loadingMetaCount: function() {
				return _loadingMeta.count;
			},

			loadingMetaPage: function() {
				return _loadingMeta.pageSize ? (_loadingMeta.count / _loadingMeta.pageSize) + 1 : 0;
			},

			loadingMetaPageSize: function() {
				return _loadingMeta.pageSize;
			},

			loadingMetaTotalCount: function() {
				return _loadingMeta.totalCount;
			},

			hash: function() {
				return _hash;
			},

			items: function() {
				return _items;
			},

			first: function() {
				return _items && _items.length ? _items[0] : null;
			},

			last: function() {
				return _items && _items.length ? _items[_items.length-1] : null;
			}
		}
	}

	return {

		createView: _createView,

	};

 }

export default createViewFactory; 
