import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { Language, Country, Script } from '../types/writing-systems'

export function useFilterState(allLanguages: Ref<Language[] | null>) {
  const selectedLanguage = ref<Language | null>(null)
  const selectedCountry = ref<Country | null>(null)
  const selectedScript = ref<Script | null>(null)
  const unicodeQuery = ref('')

  const countryLanguageIds = computed<string[] | null>(() => {
    if (!selectedCountry.value || !allLanguages.value) return null
    const countryId = selectedCountry.value.id
    const ids = allLanguages.value
      .filter((l: Language) => l.countries?.some(lc => lc.countryId === countryId))
      .map((l: Language) => l.id)
    return ids.length > 0 ? ids : null
  })

  watch(selectedCountry, () => {
    if (selectedLanguage.value && countryLanguageIds.value && !countryLanguageIds.value.includes(selectedLanguage.value.id)) {
      selectedLanguage.value = null
    }
  })

  function clearFilters() {
    selectedLanguage.value = null
    selectedCountry.value = null
    selectedScript.value = null
    unicodeQuery.value = ''
  }

  return {
    selectedLanguage,
    selectedCountry,
    selectedScript,
    unicodeQuery,
    countryLanguageIds,
    clearFilters,
  }
}
