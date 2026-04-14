export interface Script {
  id: string
  name: string
  type: string
  direction: string
  iso15924?: string
}

export interface LanguageScript {
  scriptId: string
  isPrimary: boolean
  script: Script
}

export interface Country {
  id: string
  name: string
  iso3166_1: string
  region?: string
}

export interface LanguageCountry {
  countryId: string
  country: Country
}

export interface Language {
  id: string
  name: string
  nativeName?: string
  iso639_1?: string
  family?: string
  scripts?: LanguageScript[]
  countries?: LanguageCountry[]
}

export interface Character {
  id: string
  character: string
  unicodeHex: string
  unicodeDec: number
  name: string
  block?: string
  category?: string
  language?: Language
  script?: Script
}
