import { useCallback } from "react"

// Remove acentuação e deixa minúsculo
function normalize(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
}

const sections = [
    { name: "Camisas", id: "camisas" },
    { name: "Camisetas", id: "camisetas" },
    { name: "Destaques", id: "colecoes-destaque" },
    { name: "Novidades", id: "novidades" },
]

export function useSearchHeader(query: string, setQuery: (value: string) => void) {
    const handleSearch = useCallback(() => {
        const normalizedQuery = normalize(query)

        const match = sections.find((section) =>
            normalize(section.name).includes(normalizedQuery)
        )

        if (match) {
            const el = document.getElementById(match.id)
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [query])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch()
        setQuery("")
    }

    return { handleSubmit }
}
