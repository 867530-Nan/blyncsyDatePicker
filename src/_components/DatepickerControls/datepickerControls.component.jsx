import * as React from 'react'

import Checkbox from '../Checkbox/'

const DatepickerControls = ({
  selectDateRange,
}) => {

  return (
    <div style={styles.root}>
      <Checkbox
        label="Select Date Range"
        name="selectDateRange"
        value={!selectDateRange}
        checked={selectDateRange}
      />
    </div>
  )
}

const styles = {
  root: {
  },
}

export default DatepickerControls
