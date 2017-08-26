import View from './View';

const assign = Object.assign;

class ViewDispatcher extends ViewDispatcher {

    _cloneObject(object) {
        return assign({}, object);
    }

    _cloneArray(array) {
        return array.slice(0);
    }

    _createView(action) {
        return new View(action.id, action.itemType);
    }

    _updateView(transition, payload) {
        for (let propsKey in payload) {
            switch (propsKey) {
                case 'ready':
                    view.setReady(payload[propsKey]);
                    break;
                case 'loading':
                    view.setProcessing(payload[propsKey]);
                    break;
                case 'succeeded':
                    view.setSucceeded(payload[propsKey]);
                    break;
                case 'failed':
                    view.setFailed(payload[propsKey]);
                    break;
                case 'outdated':
                    view.setReady(payload[propsKey]);
                    break;
                case 'loadingMeta':
                    view.updateLoadingMeta(payload[propsKey]);
                    break;
                case 'itemsIds':
                    view.setItemsIds(this._cloneArray(payload[propsKey]));
                    break;
            }
        }
    }

    dispatch(viewMap, action) {
        const actionTypeFrags = action.split('_');
        if (actionTypeFrags[0] === 'UPDATE') {
            const view = viewMap.find(action.id);
            if (view) {
                this._updateView(view, action.payload);
            }
        }
        else if (actionTypeFrags[0] === 'SET' || actionTypeFrags[0] === 'ADD') {
            const newView = this._createView(action);
            if (action.payload) {
                this._updateView(newView, action.payload);
            }
            viewMap.set(action.id, newView);
        }
        else if (actionTypeFrags[0] === 'REMOVE') {
            viewMap.remove(action.id);
        }
    }
}

export default ViewDispatcher;