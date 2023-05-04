/* eslint-disable react/prop-types */
import React from 'react'

export const TextArea = ({ loading, autoFocus, placeholder, value, onChange, type }) => {
  const commonStyles = { border: '0', height: '200px', resize: 'none' }
  const styles = (type === 'from')
    ? { ...commonStyles, backgroundColor: '#f5f5f5' }

    : { ...commonStyles }

  const handleChange = (e) => {
    onChange(e.target.value)
  }
  return (
    <form onChange={handleChange}>
        <textarea
        style={styles}
        value={value} placeholder={loading ? 'Traduciendo...' : placeholder}
        autoFocus={autoFocus}
        disabled={type === 'to'}
        name="" id="" cols="30" rows="10"></textarea>
    </form>
  )
}
