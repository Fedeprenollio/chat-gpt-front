/* eslint-disable react/prop-types */
import React from 'react'

export const LANGUAGE_SUPPORT = {
  esp: 'Español',
  eng: 'English',
  ale: 'Aleman',
  chin: 'Chino',
  rus: 'Ruso'
}

export const LanguageSelector = ({ onChange, value, type }) => {
  const handleSelect = (e) => {
    onChange(e.target.value)
  }
  return (
    <div>
            {/* <label >Selecciona un idioma</label> */}
            <select action="" onChange={handleSelect} value={value}>
            { type === 'from' && <option key={'auto'} value={'auto'}>Auto Detectar</option>}
            {Object.entries(LANGUAGE_SUPPORT).map(([key, literal]) => {
              return (
                    <option key={key} value={key}>{literal}</option>
              )
            })}
        </select>
    </div>
  )
}
