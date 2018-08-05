document.addEventListener("DOMContentLoaded", () => {
  startApp()

  window.onresize = function(event) {
    startApp()
  }
})

const startApp = () => {
  const clientWidth = document.documentElement.clientWidth
  const segmentWidth = clientWidth / 16

  const segmentsPositions = [
    { x: "0px", y: "0px" }, // 0
    { x: "0px", y: "0px" }, // 1
    { x: `${segmentWidth}px`, y: "0px" }, // 2
    { x: `${segmentWidth}px`, y: "0px" }, // 3
    { x: "0px", y: `${segmentWidth}px` }, // 4
    { x: "0px", y: `${segmentWidth}px` }, // 5
    { x: `${segmentWidth}px`, y: `${segmentWidth}px` }, // 6
    { x: `${segmentWidth}px`, y: `${segmentWidth}px` }, // 7
    { x: "0px", y: `${segmentWidth * 2}px` }, // 8
    { x: "0px", y: `${segmentWidth * 2}px` }, // 9
    { x: `${segmentWidth}px`, y: `${segmentWidth * 2}px` }, // 10
    { x: `${segmentWidth}px`, y: `${segmentWidth * 2}px` } // 11
  ]

  const createDigit = number => {
    const digit = document.createElement("div")
    digit.classList.add("digit")
    digit.style.width = `${segmentWidth * 1.3}px`
    digit.style.marginRight = `${segmentWidth * 0.7}px`

    for (let i of Array(12).keys()) {
      const segment = document.createElement("div")
      segment.classList.add("segment")
      segment.style.width = `${segmentWidth}px`
      segment.style.height = `${segmentWidth * 0.3}px`
      segment.style.left = segmentsPositions[i].x
      segment.style.top = segmentsPositions[i].y
      segment.style.transform = `rotate(${segmentAngles[number][i]}deg)`
      segment.style.transformOrigin = `${segmentWidth * 0.15}px ${segmentWidth *
        0.15}px`
      segment.style.borderRadius = `${segmentWidth * 0.15}px`
      if (i % 2 === 1) {
        const dot = document.createElement("div")
        dot.classList.add("dot")
        dot.style.width = `${segmentWidth * 0.3}px`
        dot.style.height = `${segmentWidth * 0.3}px`
        dot.style.borderRadius = `${segmentWidth * 0.15}px`

        segment.appendChild(dot)
      }

      digit.appendChild(segment)
    }
    addCoversToDigit(digit, segmentWidth)

    return digit
  }

  const themes = ["white", "black", "orange", "mindal", "izettle", "pride"]
  const timeFormats = ["12", "24"]

  const selectedTimeFormat = findGetParameter("time_format") || "12"
  const selectedTheme = findGetParameter("theme") || "white"

  const themesEl = document.getElementById("themes")
  themesEl.innerHTML = ""

  themes.forEach(theme => {
    const themeEl = document.createElement("a")
    themeEl.href = `/?theme=${theme}&timer_format=${selectedTimeFormat}`
    themeEl.innerHTML = theme
    if (theme === selectedTheme) themeEl.classList.add("active")
    themesEl.appendChild(themeEl)
  })

  const timeFormatsEl = document.getElementById("time-formats")
  timeFormatsEl.innerHtml = ""

  timeFormats.forEach(timeFormat => {
    const timeFormatEl = document.createElement("a")
    timeFormatEl.href = `/?theme=${selectedTheme}&time_format=${timeFormat}`
    timeFormatEl.textContent = `${timeFormat}h`
    if (timeFormat === selectedTimeFormat) timeFormatEl.classList.add("active")
    timeFormatsEl.appendChild(timeFormatEl)
  })

  document.body.classList.add(selectedTheme)
  const clockDiv = document.getElementById("clock")
  clockDiv.innerHTML = ""

  const now = new Date()
  const hours = selectedTimeFormat === "12" ? now.getHours() % 12 || 12 : now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const hours0 = createDigit(Math.floor(hours / 10))
  const hours1 = createDigit(hours % 10)
  hours1.style.marginRight = `${segmentWidth * 1.5}px`
  const minutes0 = createDigit(Math.floor(minutes / 10))
  const minutes1 = createDigit(minutes % 10)
  minutes1.style.marginRight = `${segmentWidth * 1.5}px`
  const seconds0 = createDigit(Math.floor(seconds / 10))
  const seconds1 = createDigit(seconds % 10)

  clockDiv.appendChild(hours0)
  clockDiv.appendChild(hours1)
  clockDiv.appendChild(minutes0)
  clockDiv.appendChild(minutes1)
  clockDiv.appendChild(seconds0)
  clockDiv.appendChild(seconds1)

  setInterval(() => {
    const now = new Date()
    const hours = selectedTimeFormat === "12" ? now.getHours() % 12 || 12 : now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    setDigit(hours0, Math.floor(hours / 10))
    setDigit(hours1, hours % 10)
    setDigit(minutes0, Math.floor(minutes / 10))
    setDigit(minutes1, minutes % 10)
    setDigit(seconds0, Math.floor(seconds / 10))
    setDigit(seconds1, seconds % 10)
  }, 1000)
}

const segmentAngles = [
  // 0
  [180, -90, 180, 90, -90, 180, 0, 90, -90, 0, 0, 90],
  // 1
  [180, -90, 135, 90, 180, -45, 0, 90, 180, 90, 0, 90],
  // 2
  [180, -90, 180, 90, 180, 180, 0, 135, -45, 0, 0, 90],
  // 3
  [180, 0, 180, 135, -45, 0, 135, 180, -45, 180, 0, 90],
  // 4
  [-90, -90, -90, 90, -90, 0, 90, 0, 180, 90, 0, 90],
  // 5
  [180, -90, 180, 0, -90, 0, 180, 90, 180, 90, 180, 0],
  // 6
  [180, -90, 135, 135, -45, 0, 180, 90, -90, 0, 180, -90],
  // 7
  [180, 0, 180, 90, 180, 180, -90, 135, -45, 90, 0, 90],
  // 8
  [180, -90, 180, 90, -90, 0, 180, 90, -90, 0, 0, 90],
  // 9
  [0, 90, 180, 90, 180, 0, 180, 135, -45, -45, 0, 90]
]

const addCoversToDigit = (digit, segmentWidth) => {
  const coverTop = document.createElement("div")
  coverTop.classList.add("cover")
  coverTop.style.top = `-${segmentWidth * 0.7 + 1}px`
  coverTop.style.left = `-${segmentWidth * 0.7}px`
  coverTop.style.width = `${segmentWidth * 2.7}px`
  coverTop.style.height = `${segmentWidth * 0.7 + 1}px`
  digit.appendChild(coverTop)

  const coverBottom = document.createElement("div")
  coverBottom.classList.add("cover")
  coverBottom.style.top = `${segmentWidth * 2.3}px`
  coverBottom.style.left = `-${segmentWidth * 0.7 }px`
  coverBottom.style.width = `${segmentWidth * 2.7}px`
  coverBottom.style.height = `${segmentWidth * 0.7 + 1}px`
  digit.appendChild(coverBottom)

  const coverLeft = document.createElement("div")
  coverLeft.classList.add("cover")
  coverLeft.style.top = `-${segmentWidth * 0.7}px`
  coverLeft.style.left = `-${segmentWidth * 0.7 + 1}px`
  coverLeft.style.width = `${segmentWidth * 0.7 + 1}px`
  coverLeft.style.height = `${segmentWidth * 3.7}px`
  digit.appendChild(coverLeft)

  const coverRight = document.createElement("div")
  coverRight.classList.add("cover")
  coverRight.style.top = `-${segmentWidth}px`
  coverRight.style.left = `${segmentWidth * 1.3}px`
  coverRight.style.width = `${segmentWidth * 0.7 + 1}px`
  coverRight.style.height = `${segmentWidth * 3.7}px`
  digit.appendChild(coverRight)
}

const setDigit = (el, digit) => {
  Array.from(el.getElementsByClassName("segment")).forEach((segment, i) => {
    segment.style.transform = `rotate(${segmentAngles[digit][i]}deg)`
  })
}

const findGetParameter = (parameterName) => {
  var result = null,
    tmp = []
  location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      tmp = item.split("=")
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
    })
  return result
}
