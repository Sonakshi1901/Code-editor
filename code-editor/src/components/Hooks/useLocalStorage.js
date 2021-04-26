import { useEffect, useState } from "react";

const PREFIX = "code-editor-"

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

 {/*Here we are getting the value from the user and setting it to our local storage (jsonvalue)*/}
  const [value, setValue] = useState(() =>{
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

{/*Here the useEffect is used for saving the codes if the prefixedkey or the value changes.
Mostly saving the new changes in our localstorage.*/}

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
