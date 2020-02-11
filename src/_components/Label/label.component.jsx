import * as React from 'react'

const Label = ({
  htmlFor,
  text,
}) => (
  <label
    htmlFor={htmlFor}
  >
    {text}
  </label>
)

export default Label