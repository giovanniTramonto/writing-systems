import type { ComputedRef, Ref } from 'vue'
import type { Language, Country, Script, LanguageScript } from '~/types/writing-systems'

interface FilterState {
  selectedLanguage: Ref<Language | null>
  selectedCountry: Ref<Country | null>
  selectedScript: Ref<Script | null>
  unicodeQuery: Ref<string>
  countryLanguageIds: Ref<string[] | null>
}

export function useDropdownOptions(
  filterState: FilterState,
  allLanguages: Ref<Language[] | null>,
  allCountries: Ref<Country[] | null>,
  allScripts: Ref<Script[] | null>,
  fetchScriptIds: ComputedRef<string[] | null>,
  unicodeScriptIds: ComputedRef<string[] | null>,
) {
  const { selectedLanguage, selectedCountry, selectedScript, unicodeQuery, countryLanguageIds } =
    filterState

  // ── Script options ──────────────────────────────────────────────────────────

  // Merge script IDs from language/country selection and from the unicode query result
  const displayScriptIds = computed<string[] | null>(() => {
    const ids = new Set<string>()
    if (fetchScriptIds.value) for (const id of fetchScriptIds.value) ids.add(id)
    if (unicodeScriptIds.value) for (const id of unicodeScriptIds.value) ids.add(id)
    return ids.size > 0 ? [...ids] : null
  })

  const scriptOptions = computed(() => {
    if (!allScripts.value) return []
    const ids = displayScriptIds.value
    if (!ids) return allScripts.value
    return allScripts.value.filter((s: Script) => ids.includes(s.id))
  })

  watch(scriptOptions, (options: Script[]) => {
    if (selectedScript.value && !options.find((s: Script) => s.id === selectedScript.value?.id)) {
      selectedScript.value = null
    }
  })

  // ── Language options ────────────────────────────────────────────────────────

  // Language IDs compatible with the current script/unicode constraint
  const scriptConstrainedLanguageIds = computed<string[] | null>(() => {
    const constraintIds = new Set<string>()
    if (selectedScript.value) constraintIds.add(selectedScript.value.id)
    if (unicodeScriptIds.value) for (const id of unicodeScriptIds.value) constraintIds.add(id)
    if (constraintIds.size === 0 || !allLanguages.value) return null
    const ids: string[] = []
    for (const lang of allLanguages.value) {
      if (lang.scripts?.some((ls: LanguageScript) => constraintIds.has(ls.scriptId))) ids.push(lang.id)
    }
    return ids.length > 0 ? ids : null
  })

  const languageOptions = computed(() => {
    if (!allLanguages.value) return []
    const countryIds = countryLanguageIds.value
    const scriptLangIds = scriptConstrainedLanguageIds.value
    if (!countryIds && !scriptLangIds) return allLanguages.value
    return allLanguages.value.filter((l: Language) => {
      const inCountry = !countryIds || countryIds.includes(l.id)
      const inScript = !scriptLangIds || scriptLangIds.includes(l.id)
      return inCountry && inScript
    })
  })

  // ── Country options ─────────────────────────────────────────────────────────

  // Country IDs reachable via the selected language or script/unicode constraints
  const activeCountryIds = computed<string[] | null>(() => {
    const ids = new Set<string>()
    if (selectedLanguage.value?.countries) {
      for (const lc of selectedLanguage.value.countries) ids.add(lc.countryId)
    }
    if (!selectedLanguage.value && allLanguages.value) {
      const constraintIds = new Set<string>()
      if (selectedScript.value) constraintIds.add(selectedScript.value.id)
      if (unicodeScriptIds.value) for (const id of unicodeScriptIds.value) constraintIds.add(id)
      if (constraintIds.size > 0) {
        for (const lang of allLanguages.value) {
          if (
            lang.scripts?.some((ls: LanguageScript) => constraintIds.has(ls.scriptId)) &&
            lang.countries
          ) {
            for (const lc of lang.countries) ids.add(lc.countryId)
          }
        }
      }
    }
    return ids.size > 0 ? [...ids] : null
  })

  const countryOptions = computed(() => {
    if (!allCountries.value) return []
    const ids = activeCountryIds.value
    if (!ids) return allCountries.value
    return allCountries.value.filter((c: Country) => ids.includes(c.id))
  })

  watch(countryOptions, (options: Country[]) => {
    if (
      selectedCountry.value &&
      !options.find((c: Country) => c.id === selectedCountry.value?.id)
    ) {
      selectedCountry.value = null
    }
  })

  // ── Misc ────────────────────────────────────────────────────────────────────

  const hasFilters = computed(
    () =>
      selectedLanguage.value || selectedCountry.value || selectedScript.value || unicodeQuery.value
  )

  return { languageOptions, countryOptions, scriptOptions, hasFilters }
}
