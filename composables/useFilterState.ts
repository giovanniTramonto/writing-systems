import type { Language, Country, Script } from '~/types/writing-systems'

export function useFilterState() {
  const selectedLanguage = ref<Language | null>(null)
  const selectedCountry = ref<Country | null>(null)
  const selectedScript = ref<Script | null>(null)
  const unicodeQuery = ref('')

  // Language IDs spoken in the selected country (resolved async via the API)
  const countryLanguageIds = ref<string[] | null>(null)

  watch(selectedCountry, async (country: Country | null) => {
    if (!country) {
      countryLanguageIds.value = null
      return
    }
    const langs = await $fetch<Language[]>(
      `/api/queries/languages-by-country?iso3166_1=${country.iso3166_1}`
    )
    countryLanguageIds.value = langs.map((l: Language) => l.id)
    // Drop language selection when it is not spoken in the newly selected country
    if (selectedLanguage.value && !countryLanguageIds.value.includes(selectedLanguage.value.id)) {
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
