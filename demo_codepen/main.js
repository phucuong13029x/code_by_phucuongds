const params = new URLSearchParams(location.search)
  const inputEl = document.querySelector("[data-js-input]")
  const startersEl = document.querySelector("[data-starters]")
  const startersListEl = document.querySelector("[data-starters-list]")
  const playgroundEl = document.querySelector("[data-js-playground]")
/* edit on website
  const starters = {
    new: {
      hidden: true,
      value: ""
    },
    blank: {
      hidden: true,
      value: ""
    },
    empty: {
      title: "Empty",
      value: ""
    },
    seperator: {
      seperator: true
    },
    animation: {
      title: "Animation",
      value: "<style>\n  body {\n    margin: 0;\n    height: 100%;\n    display: grid;\n    place-content: center;\n    text-align: center;\n  }\n\n  div {\n    height: 33.33vmin;\n    width: 33.33vmin;\n    background: currentColor;\n    animation: spin 10s linear infinite;\n  }\n\n  @keyframes spin {\n    to { transform: rotate(360deg) } \n  }\n</style>\n\n<div></div>"
    },
    animejs: {
      title: "Anime.js",
      value: `${"<"}script src="//unpkg.com/animejs@2.0.2">${"<"}/script>\n\n<style>\n  body {\n    font-family: system-ui, sans-serif;\n    display: grid;\n    place-content: center;\n    text-align: center;\n    height: 100%;\n  }\n\n  div {\n    width: 100px;\n    height: 100px;\n    background: currentColor;\n    border-radius: 25px;\n  }\n</style>\n\n<section>\n  <div></div>\n</section>\n\n${"<"}script>\nanime.timeline({ loop: true })\n  .add({\n    targets: "div",\n    duration: 1200,\n    height: 50,\n    width: 400,\n    elasticity: 200,\n    borderRadius: 25,\n    delay: 1000\n  })\n  .add({\n    targets: "div",\n    duration: 1800,\n    height: 200,\n    width: 200,\n    borderRadius: 100,\n    elasticity: 300\n  })\n  .add({\n    targets: "section",\n    scale: 2,\n    easing: "easeOutSine",\n    duration: 700\n  })\n  .add({\n    targets: "section",\n    scale: 1,\n    easing: "easeInSine",\n    duration: 350\n  })\n  .add({\n    targets: "div",\n    height: 100,\n    width: 100,\n    borderRadius: 25\n  })\n${"<"}/script>`
    },
    button: {
      title: "Button",
      value: `${"<"}script src="https://unpkg.com/focus-visible-polyfill">${"<"}/script>\n<link rel="stylesheet" href="https://ui.components.workers.dev/\n  ?--font-family=Avenir, sans-serif\n  &--color-rgb=29, 30, 60\n  &--accent-color-rgb=74, 76, 105\n">\n\n<button id=b class="Button Button-is-bordered">Button</button>\n\n<style>\n  * {\n    margin: 0;\n  }\n  \n  html {\n    padding: 1em;\n    font-size: 18px;\n  }\n</style>\n\n${"<"}script>\n  b.addEventListener("click", () => alert("Click"))\n${"<"}/script>\n`
    },
    dot: {
      title: "Dot",
      value: `${"<"}script src="https://adamschwartz.co/labs/dot/dot.js">${"<"}/script>\n\n<div data-dot style="color: #000"></div>\n\n${"<"}script>\n  const SIZE = 50\n\n  const dot = new Dot({\n    node: document.querySelector('[data-dot]'),\n    size: SIZE\n  })\n\n  dot.jumpTo({\n    x: (window.innerWidth - SIZE) / 2,\n    y: (window.innerHeight - SIZE) / 2\n  }, true)\n${"<"}/script>`
    },
    gradient: {
      title: "Gradient",
      value: "<style>\n  body {\n    background: linear-gradient(\n      to bottom right,\n      blue,\n      red\n    )\n  }\n</style>"
    },
    welcome: {
      title: "Welcome",
      value: `<style>\n  * { margin: 0 }\n\n  body {\n    font-family: system-ui, sans-serif;\n    display: grid;\n    place-content: center;\n    text-align: center;\n    height: 100%;\n  }\n\n  h1 {\n    font-size: 15vw;\n    font-weight: 900;\n    letter-spacing: -.03em;\n    padding-right: .0625em;\n    padding-bottom: 6.5vh;\n  }\n</style>\n\n<h1 id=h1 data-text=Playground></h1>\n\n${"<"}script>\n  text = h1.getAttribute("data-text")\n  i = setInterval(() => {\n    h1.textContent = text.slice(0, h1.textContent.length + 1)\n    if (h1.textContent === text) clearInterval(i)\n  }, 200)\n${"<"}/script>\n`
    }
  }
*/
  Object.entries(starters).forEach(([key, starter]) => {
    if (starter.hidden) return

    if (starter.seperator) {
      const li = document.createElement("li")
      li.className = "Playground--starters-separator"
      startersListEl.appendChild(li)
      return
    }

    const li = document.createElement("li")
    li.className = "Playground--starters-item"

    const a = document.createElement("a")
    a.className = "Playground--starters-link"
    a.textContent = starter.title
    a.href = `?starter=${key}`

    a.addEventListener("click", event => {
      event.preventDefault()
      inputEl.value = starters[key].value
      update()
      startersEl.open = false
    })

    li.appendChild(a)
    startersListEl.appendChild(li)
  })

  if (params.get("starter") in starters) {
    inputEl.value = starters[params.get("starter")].value
  } else if (params.get("v")) {
    inputEl.value = atob(decodeURIComponent(params.get("v")))
  } else {
    inputEl.value = starters.empty.value
  }

  document.body.addEventListener("click", event => {
    if (startersEl.contains(event.target)) return
    startersEl.open = false
  })

  const initIframeClickTracking = iframeEl => {
    iframeEl.contentDocument.body.addEventListener("click", () => {
      if (startersEl.open) startersEl.open = false
    })
  }

  const getPermalink = () => {
    const params = "?v=" + encodeURIComponent(btoa(inputEl.value))
    const l = location
    return l.protocol + "//" + l.host + l.pathname + params
  }

  const validHeadElements = ["meta", "link", "style", "script", "base"]
  const extractHeadBody = fragment => {
    const head = []
    const body = []

    let enteredBody = false
    fragment.childNodes.forEach(node => {
      if (node.tagName && !validHeadElements.includes(node.tagName.toLowerCase())) {
        enteredBody = true
      }

      if (!enteredBody) {
        if (node.nodeType === 3 && node.data.match(/^\s*$/m)) {} else {
          head.push(node)
        }
      } else {
        body.push(node)
      }
    })

    return [head, body]
  }

  const loadHeadElements = (doc, head, newHead, callback) => {
    if (newHead.length) {
      const el = newHead[0]

      if (el.tagName && el.tagName.toLowerCase() === "script" && el.getAttribute("src")) {
        loadScript(doc, el, () => {
          newHead.shift()
          loadHeadElements(doc, head, newHead, callback)
        })
      } else {
        head.appendChild(el)
        newHead.shift()
        loadHeadElements(doc, head, newHead, callback)
      }
    } else {
      callback()
    }
  }

  const loadScript = (doc, script, callback) => {
    const el = doc.createElement("script")
    el.setAttribute("src", script.getAttribute("src"))
    el.onload = () => callback()
    doc.head.appendChild(el)
  }

  const update = () => {
    const html = inputEl.value

    playgroundEl.innerHTML = ""

    const sandboxEl = document.createElement("iframe")
    playgroundEl.appendChild(sandboxEl)
    const sandboxDocument = sandboxEl.contentDocument
    const head = sandboxEl.contentDocument.head
    const body = sandboxEl.contentDocument.body

    const fragment = sandboxDocument.createRange().createContextualFragment(html)
    const [newHead, newBody] = extractHeadBody(fragment)

    head.innerHTML = ""
    loadHeadElements(sandboxDocument, head, newHead, () => {
      body.innerHTML = ""
      newBody.forEach(el => body.appendChild(el))
    })

    initIframeClickTracking(sandboxEl)
    history.replaceState({}, "", getPermalink())
  }

  inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      event.preventDefault()
      inputEl.blur()
    }

    const spaces = "  "
    const start = this.selectionStart
    const end = this.selectionEnd

    if (event.key === "Tab") {
      event.preventDefault()
      this.value = this.value.substring(0, start) + spaces + this.value.substring(end)
      this.selectionStart = this.selectionEnd = start + spaces.length
    }

    if (event.key === "Backspace" && start === end && start >= spaces.length) {
      if (this.value.substring(start - spaces.length, start) === spaces) {
        event.preventDefault()
        this.value = this.value.substring(0, start - spaces.length) + this.value.substring(start)
        this.selectionStart = this.selectionEnd = start - spaces.length
      }
    }
  })

  inputEl.addEventListener("input", update)
  update()
