const alt = require('../alt')
const ResultActions = require('../actions/result-actions')

class ResultsStore {
  constructor() {
    this.results = null
    this.errorMessage = null

    this.bindListeners({
      handleUpdateResults: ResultActions.UPDATE_RESULTS,
      handleFetchResults: ResultActions.FETCH_RESULTS
    })
  }

  handleResultsFailed() {
    console.log('handleResultsFailed')
  }

  handleUpdateResults(results) {
    this.results = results
    this.errorMessage = null
  }

  handleFetchResults() {
    this.results = []
  }
}

module.exports = alt.createStore(ResultsStore, 'ResultStore')
