import { connect } from 'react-redux'

import DatepickerControls from '../../_components/DatepickerControls/'

import { selectUseDateRange } from '../app.selectors'

const mapStateToProps = (state) => ({
  selectDateRange: selectUseDateRange(state),
})

const dispatchProps = {}

export default connect(
  mapStateToProps, 
  dispatchProps,
)(DatepickerControls)
