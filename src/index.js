document.addEventListener("DOMContentLoaded", () => {
  startApp()
})


function startApp() {
  const selectedTheme = findGetParameter("theme") || "white"
  const themes = ["white", "black", "orange", "mindal", "izettle", "pride"]
  const themesEl = document.getElementById("themes")

  themes.forEach((theme) => {
    const themeEl = document.createElement("a")
    themeEl.href = `/?theme=${theme}`
    themeEl.innerHTML = theme
    if (theme === selectedTheme) themeEl.classList.add("active")
    themesEl.appendChild(themeEl)
  })


  document.body.classList.add(selectedTheme)
  const clockDiv = document.getElementById("clock")

  const now = new Date()
  const hours = now.getHours() % 12 || 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const hours0 = createDigit(Math.floor(hours / 10))
  const hours1 = createDigit(hours % 10)
  hours1.style.marginRight = "110px"
  const minutes0 = createDigit(Math.floor(minutes / 10))
  const minutes1 = createDigit(minutes % 10)
  minutes1.style.marginRight = "110px"
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
      const hours = now.getHours() % 12 || 12
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      setDigit(hours0, Math.floor(hours / 10))
      setDigit(hours1, hours % 10)
      setDigit(minutes0, Math.floor(minutes / 10))
      setDigit(minutes1, minutes % 10)
      setDigit(seconds0, Math.floor(seconds / 10))
      setDigit(seconds1, seconds % 10)
    },
    1000
  )
}

const segmentsPositions = [
  {x: "15px", y: "15px"},   // 0
  {x: "15px", y: "15px"},   // 1
  {x: "115px", y: "15px"},  // 2
  {x: "115px", y: "15px"},  // 3
  {x: "15px", y: "115px"},  // 4
  {x: "15px", y: "115px"},  // 5
  {x: "115px", y: "115px"}, // 6
  {x: "115px", y: "115px"}, // 7
  {x: "15px", y: "215px"},  // 8
  {x: "15px", y: "215px"},  // 9
  {x: "115px", y: "215px"}, // 10
  {x: "115px", y: "215px"}, // 11
]

const segmentAngles = [
  // 0
  [ 180, -90, 180, 90, -90, 180, 0, 90, -90, 0, 0, 90 ],
  // 1
  [ 180, -90, 135, 90, 180, -45, 0, 90, 180, 90, 0, 90 ],
  // 2
  [ 180, -90, 180, 90, 180, 180, 0, 135, -45, 0, 0, 90 ],
  // 3
  [ 180, 0, 180, 135, -45, 0, 135, 180, -45, 180, 0, 90 ],
  // 4
  [ 180, -90, 135, 90, -45, 0, 90, 0, 180, 90, 0, 90 ],
  // 5
  [ 180, -90, 180, 0, -90, 0, 180, 90, 180, 90, 180, 0 ],
  // 6
  [180, -90, 135, 135, -45, 0, 180, 90, -90, 0, 180, -90 ],
  // 7
  [ 180, 0, 180, 90, 180, 180, -90, 135, -45, 90, 0, 90 ],
  // 8
  [ 180, -90, 180, 90, -90, 0, 180, 90, -90, 0, 0, 90 ],
  // 9
  [ 0, 90, 180, 90, 180, 0, 180, 135, -45, -45, 0, 90]
]

function createDigit(number) {
  const digit = document.createElement("div")
  digit.classList.add("digit")

  for (let i of Array(12).keys()) {
    const segment = document.createElement("div")
    segment.classList.add("segment")
    segment.style.left = segmentsPositions[i].x
    segment.style.top = segmentsPositions[i].y
    segment.style.transform = `rotate(${segmentAngles[number][i]}deg)`

    const dot = document.createElement("div")
    dot.classList.add("dot")
    segment.appendChild(dot)

    digit.appendChild(segment)
  }
  addCoversToDigit(digit)

  return digit
}


function addCoversToDigit(digit) {
  const coverTop = document.createElement("div")
  coverTop.classList.add("cover", "top")
  digit.appendChild(coverTop)

  const coverBottom = document.createElement("div")
  coverBottom.classList.add("cover", "bottom")
  digit.appendChild(coverBottom)

  const coverLeft = document.createElement("div")
  coverLeft.classList.add("cover", "left")
  digit.appendChild(coverLeft)

  const coverRight = document.createElement("div")
  coverRight.classList.add("cover", "right")
  digit.appendChild(coverRight)
}

function setDigit(el, digit) {
  Array.from(el.getElementsByClassName("segment")).forEach((segment, i) => {
    segment.style.transform = `rotate(${segmentAngles[digit][i]}deg)`
  })
}

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}
