
class AbstractClient {

	startTransaction(transaction) {

	}

	get supportsCancelProcessingTransaction() {
		return true;
	}

	cancelProcessingTransaction(transaction) {
		transaction.handleProcessingCanceled();
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