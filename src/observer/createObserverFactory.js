
function createObserverFactory() {

    const _createBaseObserver = function(type) {

        const _readProps = {};

        const _changedProps = {};

        const _listeners = [];

        const _listenerIndex = function(listener) {
            return _listeners.indexOf(listener);
        };

        return {

            get type() {
                return type;
            },

            get listeners() {
                return _listeners;
            },

            addListener: function(listener) {
                const listenerIndex = _listenerIndex(listener);
                if (listenerIndex < 0) {
                    _listeners.push(listener);
                }
            },

            removeListener: function(listener) {
                const listenerIndex = _listenerIndex(listener);
                if (listenerIndex >= 0) {
                    _listeners.splice(listenerIndex, 1);
                }
            },

            markAsRead: function(propKey) {
                _readProps[propsKey] = true;
                return this;
            },

            clearAllReads: function() {
                _readProps = {};
                return this;
            }

            markAsChanged: function(propKey) {
                _changedProps[propsKey] = true;
                return this;
            },

            changed: function() {
                let changed = false;
                for (let propsKey in _changedProps) {
                    if (_readProps.hasOwnProperty(propsKey)) {
                        changed = true;
                        break;
                    }
                }
                return changed;
            },

            clearAllChanges: function() {
                _changedProps = {};
                return this;
            }
        }
    }

    _createViewObserver: function() {

        const self = _createBaseObserver('view');

        const expand = {};

        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
        
        return self;
    };

    _createTransactionObserver: function() {

        const self = _createBaseObserver('transaction');

        const expand = {};

        for (let expandPropKey in expand) {
            self[expandPropKey] = expand[expandPropKey];
        }
        
        return self;
    };

    return {

        createBaseObserver: _createBaseObserver,

        createViewObserver: _createViewObserver,

        createTransactionObserver: _createTransactionObserver
    };

}

export default createObserverFactory; 
