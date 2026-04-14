<script setup lang="ts">
import type { Country, Language, Script } from "~/types/writing-systems";

// ── Static data (loaded once at page level for SSR compatibility) ─────────────

const { data: allLanguages } = await useFetch<Language[]>(
  "/api/languages?include=all",
);
const { data: allCountries } = await useFetch<Country[]>("/api/countries");
const { data: allScripts } = await useFetch<Script[]>("/api/scripts");

// ── Composables ───────────────────────────────────────────────────────────────

const {
  selectedLanguage,
  selectedCountry,
  selectedScript,
  unicodeQuery,
  countryLanguageIds,
  clearFilters,
} = useFilterState();

const { loading, filteredCharacters, unicodeScriptIds, fetchScriptIds } =
  useCharacters(
    selectedLanguage,
    selectedScript,
    unicodeQuery,
    countryLanguageIds,
    allLanguages,
  );

const { languageOptions, countryOptions, scriptOptions, hasFilters } =
  useDropdownOptions(
    {
      selectedLanguage,
      selectedCountry,
      selectedScript,
      unicodeQuery,
      countryLanguageIds,
    },
    allLanguages,
    allCountries,
    allScripts,
    fetchScriptIds,
    unicodeScriptIds,
  );
</script>

<template>
  <div class="dashboard">
    <header class="page-header">
      <h1>Writing Systems</h1>
      <p>Explore languages, scripts, countries and Unicode characters</p>
    </header>

    <div class="filters">
      <Select
        v-model="selectedLanguage"
        :options="languageOptions"
        option-label="name"
        filter
        show-clear
        placeholder="Language"
        class="filter-select"
        input-id="filter-language"
      />
      <Select
        v-model="selectedCountry"
        :options="countryOptions"
        option-label="name"
        filter
        show-clear
        placeholder="Country"
        class="filter-select"
        input-id="filter-country"
      />
      <Select
        v-model="selectedScript"
        :options="scriptOptions"
        option-label="name"
        filter
        show-clear
        placeholder="Script"
        class="filter-select"
        input-id="filter-script"
      />
      <InputText
        v-model="unicodeQuery"
        placeholder="Unicode point  ·  U+0041  ·  A  ·  65"
        class="filter-input"
        name="unicode-query"
      />
      <Button
        v-if="hasFilters"
        icon="pi pi-times"
        severity="secondary"
        text
        @click="clearFilters"
      />
    </div>

    <div class="results-meta">
      <span class="results-count"
        >{{ filteredCharacters.length }} characters</span
      >
      <ProgressSpinner
        v-if="loading"
        style="width: 1.25rem; height: 1.25rem"
        stroke-width="6"
      />
    </div>

    <div v-if="!loading && filteredCharacters.length === 0" class="empty-state">
      <i class="pi pi-search" />
      <p>No characters found. Try adjusting the filters.</p>
    </div>

    <div class="character-grid">
      <div
        v-for="char in filteredCharacters"
        :key="char.id"
        class="character-card"
      >
        <div class="glyph">{{ char.character }}</div>
        <div class="char-info">
          <div class="char-hex">U+{{ char.unicodeHex }}</div>
          <div class="char-name">{{ char.name }}</div>
          <div class="char-tags">
            <Tag v-if="char.script" :value="char.script.name" />
            <Tag v-if="char.block" :value="char.block" severity="secondary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.page-header p {
  color: var(--p-text-muted-color);
  margin: 0;
}

.filters {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.filter-select,
.filter-input {
  flex: 1;
  min-width: 200px;
}

.results-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.results-count {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 2rem;
  color: var(--p-text-muted-color);
}

.empty-state .pi {
  font-size: 3rem;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 0.75rem;
}

.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  border: 1px solid var(--p-content-border-color);
  border-radius: 8px;
  background: var(--p-content-background);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.character-card:hover {
  border-color: var(--p-primary-color);
  box-shadow: 0 2px 8px
    color-mix(in srgb, var(--p-primary-color) 12%, transparent);
}

.glyph {
  font-size: 3rem;
  line-height: 1;
  user-select: none;
}

.char-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.char-hex {
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-primary-color);
}

.char-name {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
  line-height: 1.3;
}

.char-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
  margin-top: 0.25rem;
}
</style>
