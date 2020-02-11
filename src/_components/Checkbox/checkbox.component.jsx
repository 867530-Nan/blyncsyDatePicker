import * as React from 'react'

import Label from '../Label/'

const Checkbox = ({
  name,
  label,
  value,
  checked = false,
  onChange,
}) => {
  const uniqId = `${name}-${value}`

  return (
    <div style={styles.root}>
      <input
        name={uniqId}
        id={uniqId}
        type="checkbox"
        checked={checked}
        onChange={() => {
          onChange && onChange(value)
        }}
      />
      <span style={styles.label}>
        {
          label &&
          <Label
            htmlFor={uniqId}
            text={label}
          />
        }
      </span>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: 5,
  },
}

export default Checkbox
