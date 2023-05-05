import { useEffect } from 'react'
import style from './App.module.css'
import { ArrowsIcon, ClipboarIcon, DeleteIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { useDebounce } from './hooks/useDebounce'
import { useUser } from './hooks/useStore'
// import { translate } from './services/traslate'

function App () {
  const { fromLanguage, loading, fromText, result, setFromText, setFromLanguage, setToLanguage, interchangeLanguage, setResult, toLanguage } = useUser()
  const debounceFromText = useDebounce(fromText)

  useEffect(() => {
    if (debounceFromText === '') return
    fetch('https://chat-gpt-back-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromLanguage,
        toLanguage,
        fromText
      })
    }).then(res => res.json())
      .then(res => {
        if (res == null) return
        setResult(res)
      }).catch(() => setResult('Intentalo nuevamente'))

    // translate(fromLanguage, toLanguage, fromText).then(res => {
    //   if (res == null) return
    //   setResult(res)
    // }).catch(() => setResult('Intentalo nuevamente'))
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClickCopy = async () => {
    await navigator.clipboard.writeText(result)
  }

  const VOICE_FOR_LANGUAGE = {
    eng: 'en-US',
    esp: 'es-AR',
    ale: 'de-DE',
    chin: 'zh-CN',
    rus: 'ru-RU'
  }
  const handleSeack = (type) => {
    const synth = window.speechSynthesis

    if (type === 'from') {
      const newSpeack = new SpeechSynthesisUtterance(fromText)
      newSpeack.lang = VOICE_FOR_LANGUAGE[fromLanguage]
      synth.speak(newSpeack)
    } else if (type === 'to') {
      const newSpeack = new SpeechSynthesisUtterance(result)
      newSpeack.lang = VOICE_FOR_LANGUAGE[toLanguage]
      synth.speak(newSpeack)
    }
  }
  const handleDeleteText = () => {
    setFromText('')
    setResult('')
  }

  return (
    <div>
     <h1 className={style.title}>Google translator</h1>
      <div className={style.container}>
        <div >
            <LanguageSelector type="from" value={fromLanguage} onChange={setFromLanguage}/>
            <div style={{ position: 'relative' }}>
              <TextArea
              loading={loading}
              value={fromText}
              onChange={setFromText}
              placeholder='Ingresar texto'
              autoFocus={true}
              type="from"/>

          {fromText &&
              <div className={style.delete}>
                <span onClick={handleDeleteText}>
                  <DeleteIcon/>
                </span>
               </div>}

            </div>
        </div>

        <div>
          <button className={style.arrow} disabled={fromLanguage === 'auto'} onClick={interchangeLanguage}>
              <ArrowsIcon/>
          </button>
        </div>

        <div className={style.to}>
          <LanguageSelector type="to" value={toLanguage} onChange={setToLanguage}/>
          <TextArea
          loading={loading}
          value={result}
          onChange={setResult}
          placeholder='Traducción'
          autoFocus={false}
          type={'to'}/>

            {
              result &&
                <div className={style.buttons}>
                  <button className={style.icon} onClick={handleClickCopy}>
                    <ClipboarIcon/>
                  </button>
                  <button className={style.icon} onClick={() => handleSeack('to')}>
                    <SpeakerIcon/>
                  </button>
                </div>
            }

        </div>

      </div>
    </div>
  )
}

export default App
