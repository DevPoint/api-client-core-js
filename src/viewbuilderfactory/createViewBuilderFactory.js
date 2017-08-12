
function createFactory(filterFactory, sortFactory) {

	const _createBuilder = function(viewInstancer, asyncLoader) {

		let _view = null;

		let _eagerType = 'full';

		let _offset = 0;

		let _count = 0;

		let _pageSize = 0;

		let _page = 0;

		const _filters = [];

		const _sorts = [];

		return {

			hasView: function() {
				return !!_view;
			},

			view: function() {
				if (!this.hasView())
				{
					_view = viewInstancer.createView(this, asyncLoader);
				}
				return _view;
			},

			addFilter: function(filter) {
				if (!this.hasView()) {
					_filters[] = filter;
				}
				return this;
			},

			filterId: function(id) {
				return this.addFilter(filterFactory.createFilterId(id))
			},

			filterIds: function(ids) {
				return this.addFilter(filterFactory.createFilterIds(ids))
			},

			filterExp: function(key, operator, value) {
				return this.addFilter(filterFactory.createFilterExp(key, operator, value))
			},
			
			filterIn: function(key, values) {
				return this.addFilter(filterFactory.createFilterIn(key, values))
			},

			addSort: function(sort) {
				if (!this.hasView()) {
					_sorts[] = sort;
				}
				return this;
			},

			sort: function(key, order) {
				return this.addSort(sortFactory.createSort(key, order));
			},

			eagerType: function(eagerType) {
				if (!this.hasView()) {
					_eagerType = eagerType;
				}
				return this;
			},

			paginate: function(page, pageSize) {
				if (!this.hasView()) {
					_offset = 0;
					_count = pageSize;
					_pageSize = pageSize;
				}
				return this;
			},

			limit: function(offset, count) {
				if (!this.hasView()) {
					_offset = offset;
					_count = count;
					_pageSize = 0;
				}
				return this;
			},

			viewId: function() {
				return view().viewId();
			},

			ready: function() {
				return view().ready();
			},

			outdated: function() {
				return view().outdated();
			},

			itemType: function() {
				return view().itemType();
			},

			load: function() {
				return view().load();
			},

			loading: function() {
				return _loading;
			},

			loadingFailed: function() {
				return _loadingFailed;
			},

			loadingMetaOffset: function() {
				return view().loadingMetaOffset();
			},

			loadingMetaCount: function() {
				return view().loadingMetaCount();
			},

			loadingMetaPage: function() {
				return view().loadingMetaPage();
			},

			loadingMetaPageSize: function() {
				return view().loadingMetaPageSize();
			},

			loadingMetaTotalCount: function() {
				return view().loadingMetaTotalCount();
			},

			hash: function() {
				return view().hash();
			},

			items: function() {
				return view().items();
			},

			first: function() {
				return view().first();
			},

			last: function() {
				return view().last();
			},

		}
	}

	return {

		createBuilder: _createBuilder,

	};
 }

export default createFactory; 