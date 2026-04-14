import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Language, Script, Character } from '../types/writing-systems'

export function useCharacters(
  selectedLanguage: Ref<Language | null>,
  selectedScript: Ref<Script | null>,
  unicodeQuery: Ref<string>,
  countryLanguageIds: Ref<string[] | null> | { value: string[] | null },
  allLanguages: Ref<Language[] | null>,
  allCharacters: Ref<Character[] | null>,
) {
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

  const filteredCharacters = computed(() => {
    let chars = allCharacters.value ?? []

    if (selectedScript.value) {
      chars = chars.filter((c: Character) => c.script?.id === selectedScript.value!.id)
    } else if (fetchScriptIds.value?.length) {
      chars = chars.filter((c: Character) => fetchScriptIds.value!.includes(c.script?.id ?? ''))
    }

    const q = unicodeQuery.value.trim()
    if (q) {
      const hex = q.toLowerCase().replace(/^u\+0*/i, '')
      chars = chars.filter(
        (c: Character) =>
          c.character === q ||
          c.unicodeHex.toLowerCase() === hex ||
          c.unicodeDec.toString() === q ||
          (q.length > 1 && c.name.toLowerCase().includes(q.toLowerCase()))
      )
    }

    return chars
  })

  const unicodeScriptIds = computed<string[] | null>(() => {
    if (!unicodeQuery.value.trim()) return null
    const ids = new Set<string>()
    for (const c of filteredCharacters.value) {
      if (c.script?.id) ids.add(c.script.id)
    }
    return ids.size > 0 ? [...ids] : null
  })

  return { loading: false, filteredCharacters, unicodeScriptIds, fetchScriptIds }
}
