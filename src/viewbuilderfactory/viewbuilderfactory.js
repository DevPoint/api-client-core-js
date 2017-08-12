
function createFactory(filterFactory, sortFactory) {

	const _createBuilder = function(viewInstancer) {

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
					_view = viewInstancer.createView(this);
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

			loading: function() {
				return view().loading();
			},

			outdated: function() {
				return view().outdated();
			},

			hash: function() {
				return view().hash();
			},

			itemType: function() {
				return view().itemType();
			},

			itemOffset: function() {
				return view().itemOffset();
			},

			itemCount: function() {
				return view().itemCount();
			},

			page: function() {
				return view().page();
			},

			pageSize: function() {
				return view().pageSize();
			},

			totalCount: function() {
				return view().totalCount();
			},

			load: function() {
				return view().load();
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

	const factory = {

		createBuilder: _createBuilder,

	};

	return factory;
 }

export default createFactory; 