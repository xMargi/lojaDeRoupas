interface Section {
  name: string
  id: string
}

export function handleSearch(query: string, sections: Section[]) {
  const normalizedQuery = query.trim().toLowerCase()

  const matchedSection = sections.find((section) =>
    section.name.toLowerCase().includes(normalizedQuery)
  )

  if (matchedSection) {
    const element = document.getElementById(matchedSection.id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
}
