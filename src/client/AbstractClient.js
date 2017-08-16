
class AbstractClient {

	get supportsCancelProcessingTransaction() {
		return true;
	}

	startTransaction(transaction) {

	}

	cancelProcessingTransaction(transaction) {
		view.handleProcessingCanceled();
	}

	loadView(view) {
		view.handleLoadingStart();
		view.handleLoadingReady(items, meta);
	}

	get supportsCancelLoadingView() {
		return true;
	}

	cancelLoadingView(view) {
		view.handleLoadingCanceled();
	}

}

export default AbstractClient;