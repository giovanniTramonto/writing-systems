import type { Ref } from 'vue'
import type { Language, Script, Character } from '~/types/writing-systems'

export function useCharacters(
  selectedLanguage: Ref<Language | null>,
  selectedScript: Ref<Script | null>,
  unicodeQuery: Ref<string>,
  countryLanguageIds: Ref<string[] | null>,
  allLanguages: Ref<Language[] | null>,
) {
  // Script IDs derived from the language/country selection.
  // Drives the character fetch — unicode does NOT feed back here to avoid loops.
  const fetchScriptIds = computed<string[] | null>(() => {
    const ids = new Set<string>()
    if (selectedLanguage.value?.scripts) {
      for (const ls of selectedLanguage.value.scripts) ids.add(ls.scriptId)
    }
    if (!selectedLanguage.value && countryLanguageIds.value && allLanguages.value) {
      for (const lang of allLanguages.value) {
        if (countryLanguageIds.value.includes(lang.id) && lang.scripts) {
          for (const ls of lang.scripts) ids.add(ls.scriptId)
        }
      }
    }
    return ids.size > 0 ? [...ids] : null
  })

  const characters = ref<Character[]>([])
  const loading = ref(false)

  async function fetchCharacters() {
    loading.value = true
    try {
      const params: Record<string, string> = { include: 'all', limit: '200' }
      if (selectedScript.value) {
        params.scriptId = selectedScript.value.id
      } else if (fetchScriptIds.value?.length) {
        if (fetchScriptIds.value.length === 1) {
          params.scriptId = fetchScriptIds.value[0]
        } else {
          // Fan out one request per script and merge results
          const results = await Promise.all(
            fetchScriptIds.value.map((scriptId: string) =>
              $fetch<Character[]>('/api/characters', { query: { ...params, scriptId } })
            )
          )
          characters.value = results.flat()
          return
        }
      }
      characters.value = await $fetch<Character[]>('/api/characters', { query: params })
    } finally {
      loading.value = false
    }
  }

  watch([selectedLanguage, selectedScript, countryLanguageIds], fetchCharacters, { immediate: true })

  // Client-side filter on top of the server result
  const filteredCharacters = computed(() => {
    const q = unicodeQuery.value.trim()
    if (!q) return characters.value
    const hex = q.toLowerCase().replace(/^u\+0*/i, '')
    return characters.value.filter(
      (c: Character) =>
        c.character === q ||
        c.unicodeHex.toLowerCase() === hex ||
        c.unicodeDec.toString() === q ||
        (q.length > 1 && c.name.toLowerCase().includes(q.toLowerCase()))
    )
  })

  // Script IDs of the unicode-matched characters — used only to narrow dropdown options
  const unicodeScriptIds = computed<string[] | null>(() => {
    if (!unicodeQuery.value.trim()) return null
    const ids = new Set<string>()
    for (const c of filteredCharacters.value) {
      if (c.script?.id) ids.add(c.script.id)
    }
    return ids.size > 0 ? [...ids] : null
  })

  return { characters, loading, filteredCharacters, unicodeScriptIds, fetchScriptIds }
}
