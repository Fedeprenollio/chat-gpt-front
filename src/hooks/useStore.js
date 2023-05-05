import { useReducer } from 'react'
const INTERCHANGE_LANGUAGES = 'INTERCHANGE_LANGUAGES'
const SET_FROM_LANGUAGE = 'SET_FROM_LANGUAGE'
const SET_TO_LANGUAGE = 'SET_TO_LANGUAGE'
const SET_FROM_TEXT = 'SET_FROM_TEXT'
const SET_RESULT = 'SET_RESULT'

const inicialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false

}

function reducer (state, action) {
  const { type, payload } = action

  if (type === INTERCHANGE_LANGUAGES) {
    if (state.fromLanguage === 'auto') return state
    const loading = state.fromText !== ''
    return {
      ...state,
      loading,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: state.fromText
    }
  }

  if (type === SET_FROM_LANGUAGE) {
    if (state.fromLanguage === payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: payload,
      result: '',
      loading
    }
  }
  if (type === SET_TO_LANGUAGE) {
    if (state.toLanguage === payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: payload,
      result: '',
      loading
    }
  }

  if (type === SET_FROM_TEXT) {
    const loading = payload !== ''
    return {
      ...state,
      loading,
      fromText: payload
    }
  }

  if (type === SET_RESULT) {
    return {
      ...state,
      loading: false,
      result: payload
    }
  }
  return state
}

export function useUser () {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispach] = useReducer(reducer, inicialState)

  const interchangeLanguage = () => {
    dispach({
      type: INTERCHANGE_LANGUAGES

    })
  }

  const setFromLanguage = (payload) => {
    dispach({
      type: SET_FROM_LANGUAGE,
      payload
    })
  }

  const setToLanguage = (payload) => {
    dispach({
      type: SET_TO_LANGUAGE,
      payload
    })
  }
  const setFromText = (payload) => {
    dispach({
      type: SET_FROM_TEXT,
      payload
    })
  }

  const setResult = (payload) => {
    dispach({
      type: SET_RESULT,
      payload
    })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult

  }
}
