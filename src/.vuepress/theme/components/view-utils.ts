import { onMounted } from 'vue'

export function getPublishDate(date?: string | Date) {
  if (!date) return ''

  const dateDate = new Date(date)
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const parts = dateTimeFormat.formatToParts(dateDate)
  const partValues = parts.map(p => p.value)

  return partValues.slice(0, 3).join('') + ', ' + partValues[4]
}

export function activateGoatCounter(code = 'guiwriter') {
  onMounted(() => {
    if (process.env.NODE_ENV === 'production' && code && window) {
      let goatcounter = document.createElement('script')
      goatcounter.setAttribute(
        'data-goatcounter',
        `https://${code}.goatcounter.com/count`
      )
      goatcounter.setAttribute('async', 'true')
      goatcounter.setAttribute('src', '//gc.zgo.at/count.js')
      let s = document.getElementsByTagName('script')[0]
      s.parentNode?.insertBefore(goatcounter, s)
    }
  })
}
