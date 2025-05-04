// Set the last updated date to the current date
document.addEventListener("DOMContentLoaded", () => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  const currentDate = new Date().toLocaleDateString("en-US", options)
  document.getElementById("last-updated").textContent = currentDate

  // Add subtle animation to section headers on scroll
  const sectionHeaders = document.querySelectorAll(".section-header")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = "translateX(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  sectionHeaders.forEach((header) => {
    header.style.opacity = 0
    header.style.transform = "translateX(-20px)"
    header.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(header)
  })

  // Make contact links clickable
  /*
  const contactLinks = {
    "fa-envelope": "mailto:",
    "fa-phone": "tel:",
    "fa-linkedin": "https://",
    "fa-github": "https://",
    "fa-telegram": "https://",
  }

  document.querySelectorAll(".contact-info p").forEach((item) => {
    for (const [icon, prefix] of Object.entries(contactLinks)) {
      if (item.querySelector(`.${icon}`)) {
        const text = item.textContent.trim()
        const value = text.split(" ").slice(1).join(" ")
        const link = document.createElement("a")
        link.href = prefix + value
        link.innerHTML = item.innerHTML
        item.innerHTML = ""
        item.appendChild(link)
        break
      }
    }
  })
  */

  // Add subtle animation to section dividers on scroll
  const sectionDividers = document.querySelectorAll(".section-divider")

  const observer2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  sectionDividers.forEach((divider) => {
    divider.style.opacity = 0
    divider.style.transform = "translateY(20px)"
    divider.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer2.observe(divider)
  })

  // Check if PDF files exist and handle errors
  document.querySelectorAll(".certificate-pdf").forEach((link) => {
    const pdfUrl = link.getAttribute("href")

    // Create a fetch request to check if the PDF exists
    fetch(pdfUrl, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          // If PDF doesn't exist, add a class to style differently
          link.classList.add("pdf-not-found")
          link.setAttribute("title", "PDF not yet uploaded")

          // Prevent default click behavior if PDF doesn't exist
          link.addEventListener("click", (e) => {
            e.preventDefault()
            alert("The certificate PDF is not yet available.")
          })
        }
      })
      .catch(() => {
        // Handle network errors or other issues
        link.classList.add("pdf-not-found")
        link.setAttribute("title", "PDF not yet uploaded")

        link.addEventListener("click", (e) => {
          e.preventDefault()
          alert("The certificate PDF is not yet available.")
        })
      })
  })

  // Check if Font Awesome is loaded properly
  const checkFontAwesome = () => {
    const span = document.createElement("span")
    span.className = "fa"
    span.style.display = "none"
    document.body.insertBefore(span, document.body.firstChild)

    const beforeStyle = window.getComputedStyle(span, ":before")
    const loaded = beforeStyle.getPropertyValue("font-family").includes("Font Awesome")

    document.body.removeChild(span)

    if (!loaded) {
      console.warn("Font Awesome not loaded properly. Attempting to reload...")
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      document.head.appendChild(link)
    }
  }

  checkFontAwesome()

  // Ensure GitHub buttons are visible
  document.querySelectorAll(".github-button").forEach((button) => {
    // Force style application
    button.style.color = "white"
    button.style.backgroundColor = "#333"
    button.style.display = "inline-flex"

    // Make sure icon is visible
    const icon = button.querySelector("i")
    if (icon) {
      icon.style.color = "white"
    }
  })
})
