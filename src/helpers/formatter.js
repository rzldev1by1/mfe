export const numberCheck = (e) => {
    if (!/^[0-9]+$/.test(e.key)) e.preventDefault()
  }

export const decimalCheck = (e) => {
    if (!/^[0-9|,]+$/.test(e.key)) e.preventDefault()
  }