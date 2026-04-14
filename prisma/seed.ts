import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // ── Scripts ──────────────────────────────────────────────────────────────────
  console.log('Creating scripts...')

  const latin = await prisma.script.upsert({
    where: { name: 'Latin' },
    update: {},
    create: {
      name: 'Latin',
      nativeName: 'Latinus',
      iso15924: 'Latn',
      type: 'alphabet',
      direction: 'ltr',
      description:
        'The Latin alphabet, also known as the Roman alphabet, is the most widely used writing system in the world.',
    },
  })

  const cyrillic = await prisma.script.upsert({
    where: { name: 'Cyrillic' },
    update: {},
    create: {
      name: 'Cyrillic',
      nativeName: 'Кириллица',
      iso15924: 'Cyrl',
      type: 'alphabet',
      direction: 'ltr',
      description:
        'The Cyrillic script is used for various languages across Eurasia, based on the Early Cyrillic alphabet.',
    },
  })

  const arabic = await prisma.script.upsert({
    where: { name: 'Arabic' },
    update: {},
    create: {
      name: 'Arabic',
      nativeName: 'العربية',
      iso15924: 'Arab',
      type: 'abjad',
      direction: 'rtl',
      description:
        'The Arabic script is a writing system used for writing Arabic and several other languages.',
    },
  })

  const hanzi = await prisma.script.upsert({
    where: { name: 'Han' },
    update: {},
    create: {
      name: 'Han',
      nativeName: '漢字',
      iso15924: 'Hani',
      type: 'logographic',
      direction: 'ltr',
      description: 'Chinese characters (Hanzi) used in Chinese and other East Asian languages.',
    },
  })

  const devanagari = await prisma.script.upsert({
    where: { name: 'Devanagari' },
    update: {},
    create: {
      name: 'Devanagari',
      nativeName: 'देवनागरी',
      iso15924: 'Deva',
      type: 'abugida',
      direction: 'ltr',
      description: 'Devanagari is an Indic script used for many languages of India and Nepal.',
    },
  })

  const hiragana = await prisma.script.upsert({
    where: { name: 'Hiragana' },
    update: {},
    create: {
      name: 'Hiragana',
      nativeName: 'ひらがな',
      iso15924: 'Hira',
      type: 'syllabary',
      direction: 'ltr',
      description: 'Hiragana is a Japanese syllabary used for native Japanese words.',
    },
  })

  const katakana = await prisma.script.upsert({
    where: { name: 'Katakana' },
    update: {},
    create: {
      name: 'Katakana',
      nativeName: 'カタカナ',
      iso15924: 'Kana',
      type: 'syllabary',
      direction: 'ltr',
      description:
        'Katakana is a Japanese syllabary used primarily for foreign words and technical terms.',
    },
  })

  // ── Countries ─────────────────────────────────────────────────────────────────
  console.log('Creating countries...')

  const usa = await prisma.country.upsert({
    where: { iso3166_1: 'US' },
    update: {},
    create: {
      name: 'United States',
      nativeName: 'United States',
      iso3166_1: 'US',
      iso3166_2: 'USA',
      region: 'Americas',
      subregion: 'Northern America',
      population: BigInt(331900000),
    },
  })

  const china = await prisma.country.upsert({
    where: { iso3166_1: 'CN' },
    update: {},
    create: {
      name: 'China',
      nativeName: '中国',
      iso3166_1: 'CN',
      iso3166_2: 'CHN',
      region: 'Asia',
      subregion: 'Eastern Asia',
      population: BigInt(1411750000),
    },
  })

  const japan = await prisma.country.upsert({
    where: { iso3166_1: 'JP' },
    update: {},
    create: {
      name: 'Japan',
      nativeName: '日本',
      iso3166_1: 'JP',
      iso3166_2: 'JPN',
      region: 'Asia',
      subregion: 'Eastern Asia',
      population: BigInt(125800000),
    },
  })

  const india = await prisma.country.upsert({
    where: { iso3166_1: 'IN' },
    update: {},
    create: {
      name: 'India',
      nativeName: 'भारत',
      iso3166_1: 'IN',
      iso3166_2: 'IND',
      region: 'Asia',
      subregion: 'Southern Asia',
      population: BigInt(1393409000),
    },
  })

  const russia = await prisma.country.upsert({
    where: { iso3166_1: 'RU' },
    update: {},
    create: {
      name: 'Russia',
      nativeName: 'Россия',
      iso3166_1: 'RU',
      iso3166_2: 'RUS',
      region: 'Europe',
      subregion: 'Eastern Europe',
      population: BigInt(144100000),
    },
  })

  const egypt = await prisma.country.upsert({
    where: { iso3166_1: 'EG' },
    update: {},
    create: {
      name: 'Egypt',
      nativeName: 'مصر',
      iso3166_1: 'EG',
      iso3166_2: 'EGY',
      region: 'Africa',
      subregion: 'Northern Africa',
      population: BigInt(102300000),
    },
  })

  // Q2 – French as official language
  const france = await prisma.country.upsert({
    where: { iso3166_1: 'FR' },
    update: {},
    create: {
      name: 'France',
      nativeName: 'France',
      iso3166_1: 'FR',
      iso3166_2: 'FRA',
      region: 'Europe',
      subregion: 'Western Europe',
      population: BigInt(67750000),
    },
  })

  const belgium = await prisma.country.upsert({
    where: { iso3166_1: 'BE' },
    update: {},
    create: {
      name: 'Belgium',
      nativeName: 'België',
      iso3166_1: 'BE',
      iso3166_2: 'BEL',
      region: 'Europe',
      subregion: 'Western Europe',
      population: BigInt(11590000),
    },
  })

  const switzerland = await prisma.country.upsert({
    where: { iso3166_1: 'CH' },
    update: {},
    create: {
      name: 'Switzerland',
      nativeName: 'Schweiz',
      iso3166_1: 'CH',
      iso3166_2: 'CHE',
      region: 'Europe',
      subregion: 'Western Europe',
      population: BigInt(8654000),
    },
  })

  const canada = await prisma.country.upsert({
    where: { iso3166_1: 'CA' },
    update: {},
    create: {
      name: 'Canada',
      nativeName: 'Canada',
      iso3166_1: 'CA',
      iso3166_2: 'CAN',
      region: 'Americas',
      subregion: 'Northern America',
      population: BigInt(38250000),
    },
  })

  const senegal = await prisma.country.upsert({
    where: { iso3166_1: 'SN' },
    update: {},
    create: {
      name: 'Senegal',
      nativeName: 'Sénégal',
      iso3166_1: 'SN',
      iso3166_2: 'SEN',
      region: 'Africa',
      subregion: 'Western Africa',
      population: BigInt(17200000),
    },
  })

  const morocco = await prisma.country.upsert({
    where: { iso3166_1: 'MA' },
    update: {},
    create: {
      name: 'Morocco',
      nativeName: 'المغرب',
      iso3166_1: 'MA',
      iso3166_2: 'MAR',
      region: 'Africa',
      subregion: 'Northern Africa',
      population: BigInt(37340000),
    },
  })

  // Q1 – Arabic-script languages
  const iran = await prisma.country.upsert({
    where: { iso3166_1: 'IR' },
    update: {},
    create: {
      name: 'Iran',
      nativeName: 'ایران',
      iso3166_1: 'IR',
      iso3166_2: 'IRN',
      region: 'Asia',
      subregion: 'Southern Asia',
      population: BigInt(85000000),
    },
  })

  const pakistan = await prisma.country.upsert({
    where: { iso3166_1: 'PK' },
    update: {},
    create: {
      name: 'Pakistan',
      nativeName: 'پاکستان',
      iso3166_1: 'PK',
      iso3166_2: 'PAK',
      region: 'Asia',
      subregion: 'Southern Asia',
      population: BigInt(225200000),
    },
  })

  // Q3 – Cyrillic languages
  const ukraine = await prisma.country.upsert({
    where: { iso3166_1: 'UA' },
    update: {},
    create: {
      name: 'Ukraine',
      nativeName: 'Україна',
      iso3166_1: 'UA',
      iso3166_2: 'UKR',
      region: 'Europe',
      subregion: 'Eastern Europe',
      population: BigInt(44130000),
    },
  })

  const bulgaria = await prisma.country.upsert({
    where: { iso3166_1: 'BG' },
    update: {},
    create: {
      name: 'Bulgaria',
      nativeName: 'България',
      iso3166_1: 'BG',
      iso3166_2: 'BGR',
      region: 'Europe',
      subregion: 'Eastern Europe',
      population: BigInt(6520000),
    },
  })

  // Q4 – multi-script language
  const serbia = await prisma.country.upsert({
    where: { iso3166_1: 'RS' },
    update: {},
    create: {
      name: 'Serbia',
      nativeName: 'Србија',
      iso3166_1: 'RS',
      iso3166_2: 'SRB',
      region: 'Europe',
      subregion: 'Southern Europe',
      population: BigInt(6830000),
    },
  })

  const uzbekistan = await prisma.country.upsert({
    where: { iso3166_1: 'UZ' },
    update: {},
    create: {
      name: 'Uzbekistan',
      nativeName: "O'zbekiston",
      iso3166_1: 'UZ',
      iso3166_2: 'UZB',
      region: 'Asia',
      subregion: 'Central Asia',
      population: BigInt(35300000),
    },
  })

  // ── Languages ────────────────────────────────────────────────────────────────
  console.log('Creating languages...')

  const english = await prisma.language.upsert({
    where: { iso639_1: 'en' },
    update: {},
    create: {
      name: 'English',
      nativeName: 'English',
      iso639_1: 'en',
      iso639_2: 'eng',
      family: 'Indo-European',
      branch: 'Germanic',
      speakers: BigInt(1452000000),
      description: 'English is a West Germanic language that originated in England.',
    },
  })

  const mandarin = await prisma.language.upsert({
    where: { name: 'Mandarin Chinese' },
    update: {},
    create: {
      name: 'Mandarin Chinese',
      nativeName: '官话',
      iso639_1: 'zh',
      iso639_2: 'zho',
      family: 'Sino-Tibetan',
      branch: 'Sinitic',
      speakers: BigInt(1118000000),
      description:
        'Mandarin is a group of Chinese dialects spoken across most of northern and southwestern China.',
    },
  })

  const hindi = await prisma.language.upsert({
    where: { iso639_1: 'hi' },
    update: {},
    create: {
      name: 'Hindi',
      nativeName: 'हिन्दी',
      iso639_1: 'hi',
      iso639_2: 'hin',
      family: 'Indo-European',
      branch: 'Indo-Aryan',
      speakers: BigInt(602000000),
      description: 'Hindi is an Indo-Aryan language spoken in India.',
    },
  })

  const japanese = await prisma.language.upsert({
    where: { iso639_1: 'ja' },
    update: {},
    create: {
      name: 'Japanese',
      nativeName: '日本語',
      iso639_1: 'ja',
      iso639_2: 'jpn',
      family: 'Japonic',
      branch: 'Japanese',
      speakers: BigInt(125000000),
      description: 'Japanese is an East Asian language spoken by about 125 million people.',
    },
  })

  const russian = await prisma.language.upsert({
    where: { iso639_1: 'ru' },
    update: {},
    create: {
      name: 'Russian',
      nativeName: 'Русский',
      iso639_1: 'ru',
      iso639_2: 'rus',
      family: 'Indo-European',
      branch: 'Slavic',
      speakers: BigInt(258000000),
      description: 'Russian is an East Slavic language mainly spoken across Russia.',
    },
  })

  const arabicLang = await prisma.language.upsert({
    where: { iso639_1: 'ar' },
    update: {},
    create: {
      name: 'Arabic',
      nativeName: 'العربية',
      iso639_1: 'ar',
      iso639_2: 'ara',
      family: 'Afro-Asiatic',
      branch: 'Semitic',
      speakers: BigInt(274000000),
      description:
        'Arabic is a Semitic language that first emerged in the 1st to 4th centuries CE.',
    },
  })

  // Q2 – French as official language
  const french = await prisma.language.upsert({
    where: { iso639_1: 'fr' },
    update: {},
    create: {
      name: 'French',
      nativeName: 'Français',
      iso639_1: 'fr',
      iso639_2: 'fra',
      family: 'Indo-European',
      branch: 'Romance',
      speakers: BigInt(309000000),
      description:
        'French is a Romance language descended from Latin, spoken on six continents.',
    },
  })

  // Q1 – Arabic-script languages (besides Arabic itself)
  const persian = await prisma.language.upsert({
    where: { iso639_1: 'fa' },
    update: {},
    create: {
      name: 'Persian',
      nativeName: 'فارسی',
      iso639_1: 'fa',
      iso639_2: 'fas',
      family: 'Indo-European',
      branch: 'Iranian',
      speakers: BigInt(110000000),
      description:
        'Persian (Farsi) is an Iranian language written in the Persian Arabic script.',
    },
  })

  const urdu = await prisma.language.upsert({
    where: { iso639_1: 'ur' },
    update: {},
    create: {
      name: 'Urdu',
      nativeName: 'اردو',
      iso639_1: 'ur',
      iso639_2: 'urd',
      family: 'Indo-European',
      branch: 'Indo-Aryan',
      speakers: BigInt(230000000),
      description:
        'Urdu is an Indo-Aryan language written in the Nastaliq variant of the Arabic script.',
    },
  })

  // Q3 – additional Cyrillic-script languages
  const ukrainian = await prisma.language.upsert({
    where: { iso639_1: 'uk' },
    update: {},
    create: {
      name: 'Ukrainian',
      nativeName: 'Українська',
      iso639_1: 'uk',
      iso639_2: 'ukr',
      family: 'Indo-European',
      branch: 'Slavic',
      speakers: BigInt(40000000),
      description: 'Ukrainian is an East Slavic language, the official language of Ukraine.',
    },
  })

  const bulgarian = await prisma.language.upsert({
    where: { iso639_1: 'bg' },
    update: {},
    create: {
      name: 'Bulgarian',
      nativeName: 'Български',
      iso639_1: 'bg',
      iso639_2: 'bul',
      family: 'Indo-European',
      branch: 'Slavic',
      speakers: BigInt(8000000),
      description: 'Bulgarian is a South Slavic language written in the Cyrillic script.',
    },
  })

  // Q4 – languages with more than one script
  const serbian = await prisma.language.upsert({
    where: { iso639_1: 'sr' },
    update: {},
    create: {
      name: 'Serbian',
      nativeName: 'Српски',
      iso639_1: 'sr',
      iso639_2: 'srp',
      family: 'Indo-European',
      branch: 'Slavic',
      speakers: BigInt(12000000),
      description:
        'Serbian is a South Slavic language with two co-official scripts: Cyrillic and Latin.',
    },
  })

  const uzbek = await prisma.language.upsert({
    where: { iso639_1: 'uz' },
    update: {},
    create: {
      name: 'Uzbek',
      nativeName: "O'zbek",
      iso639_1: 'uz',
      iso639_2: 'uzb',
      family: 'Turkic',
      branch: 'Karluk',
      speakers: BigInt(44000000),
      description:
        'Uzbek is a Turkic language officially written in Latin since 1993, but Cyrillic is still widely used.',
    },
  })

  // ── Language ↔ Script relations ───────────────────────────────────────────────
  console.log('Creating language-script relations...')

  const upsertLS = (languageId: string, scriptId: string, isPrimary: boolean, status: string) =>
    prisma.languageScript.upsert({
      where: { languageId_scriptId: { languageId, scriptId } },
      update: {},
      create: { languageId, scriptId, isPrimary, status },
    })

  // Existing
  await upsertLS(english.id, latin.id, true, 'current')
  await upsertLS(mandarin.id, hanzi.id, true, 'current')
  await upsertLS(hindi.id, devanagari.id, true, 'current')
  await upsertLS(japanese.id, hiragana.id, true, 'current')
  await upsertLS(japanese.id, katakana.id, false, 'current')
  await upsertLS(japanese.id, hanzi.id, false, 'current')
  await upsertLS(russian.id, cyrillic.id, true, 'current')
  await upsertLS(arabicLang.id, arabic.id, true, 'current')

  // Q2 – French → Latin
  await upsertLS(french.id, latin.id, true, 'current')

  // Q1 – Arabic-script languages
  await upsertLS(persian.id, arabic.id, true, 'current')
  await upsertLS(urdu.id, arabic.id, true, 'current')

  // Q3 – Cyrillic languages
  await upsertLS(ukrainian.id, cyrillic.id, true, 'current')
  await upsertLS(bulgarian.id, cyrillic.id, true, 'current')

  // Q4 – multi-script languages
  await upsertLS(serbian.id, cyrillic.id, true, 'current')   // primary
  await upsertLS(serbian.id, latin.id, false, 'current')     // co-official
  await upsertLS(uzbek.id, latin.id, true, 'current')        // official since 1993
  await upsertLS(uzbek.id, cyrillic.id, false, 'current')    // still widely used

  // ── Language ↔ Country relations ──────────────────────────────────────────────
  console.log('Creating language-country relations...')

  const upsertLC = (
    languageId: string,
    countryId: string,
    isOfficial: boolean,
    speakers: bigint,
    percentage: number,
    status: string
  ) =>
    prisma.languageCountry.upsert({
      where: { languageId_countryId: { languageId, countryId } },
      update: {},
      create: { languageId, countryId, isOfficial, speakers, percentage, status },
    })

  // Existing
  await upsertLC(english.id, usa.id, true, BigInt(297000000), 89.5, 'official')
  await upsertLC(mandarin.id, china.id, true, BigInt(1000000000), 70.0, 'official')
  await upsertLC(japanese.id, japan.id, true, BigInt(125000000), 99.0, 'official')
  await upsertLC(hindi.id, india.id, true, BigInt(528000000), 43.6, 'official')
  await upsertLC(english.id, india.id, true, BigInt(125000000), 10.0, 'official')
  await upsertLC(russian.id, russia.id, true, BigInt(137500000), 85.0, 'official')
  await upsertLC(arabicLang.id, egypt.id, true, BigInt(82000000), 93.0, 'official')

  // Q2 – French as official language (6 countries)
  await upsertLC(french.id, france.id, true, BigInt(65000000), 97.0, 'official')
  await upsertLC(french.id, belgium.id, true, BigInt(4300000), 40.0, 'official')
  await upsertLC(french.id, switzerland.id, true, BigInt(2000000), 23.0, 'official')
  await upsertLC(english.id, canada.id, true, BigInt(25500000), 75.0, 'official')
  await upsertLC(french.id, canada.id, true, BigInt(7200000), 22.8, 'official')
  await upsertLC(french.id, senegal.id, true, BigInt(3000000), 15.0, 'official')
  await upsertLC(french.id, morocco.id, false, BigInt(10000000), 33.0, 'administrative')
  await upsertLC(arabicLang.id, morocco.id, true, BigInt(29000000), 85.0, 'official')

  // Q1 – Arabic-script language countries
  await upsertLC(persian.id, iran.id, true, BigInt(70000000), 85.0, 'official')
  await upsertLC(urdu.id, pakistan.id, true, BigInt(16000000), 8.0, 'official')
  await upsertLC(english.id, pakistan.id, true, BigInt(20000000), 9.0, 'official')

  // Q3 – Cyrillic-language countries
  await upsertLC(ukrainian.id, ukraine.id, true, BigInt(36000000), 67.0, 'official')
  await upsertLC(bulgarian.id, bulgaria.id, true, BigInt(6000000), 85.0, 'official')

  // Q4 – multi-script language countries
  await upsertLC(serbian.id, serbia.id, true, BigInt(6500000), 88.0, 'official')
  await upsertLC(uzbek.id, uzbekistan.id, true, BigInt(29000000), 74.3, 'official')

  // ── Characters ────────────────────────────────────────────────────────────────
  console.log('Creating characters...')

  const upsertChar = (data: Parameters<typeof prisma.character.upsert>[0]['create']) =>
    prisma.character.upsert({
      where: { unicodeHex: data.unicodeHex },
      update: {},
      create: data,
    })

  // Existing
  await upsertChar({
    character: 'A',
    unicodeHex: 'U+0041',
    unicodeDec: 65,
    name: 'LATIN CAPITAL LETTER A',
    block: 'Basic Latin',
    category: 'Lu',
    scriptId: latin.id,
  })

  await upsertChar({
    character: '中',
    unicodeHex: 'U+4E2D',
    unicodeDec: 20013,
    name: 'CJK UNIFIED IDEOGRAPH-4E2D',
    block: 'CJK Unified Ideographs',
    category: 'Lo',
    languageId: mandarin.id,
    scriptId: hanzi.id,
  })

  await upsertChar({
    character: 'あ',
    unicodeHex: 'U+3042',
    unicodeDec: 12354,
    name: 'HIRAGANA LETTER A',
    block: 'Hiragana',
    category: 'Lo',
    languageId: japanese.id,
    scriptId: hiragana.id,
  })

  await upsertChar({
    character: 'А',
    unicodeHex: 'U+0410',
    unicodeDec: 1040,
    name: 'CYRILLIC CAPITAL LETTER A',
    block: 'Cyrillic',
    category: 'Lu',
    scriptId: cyrillic.id,
  })

  await upsertChar({
    character: 'ا',
    unicodeHex: 'U+0627',
    unicodeDec: 1575,
    name: 'ARABIC LETTER ALEF',
    block: 'Arabic',
    category: 'Lo',
    scriptId: arabic.id,
  })

  await upsertChar({
    character: 'अ',
    unicodeHex: 'U+0905',
    unicodeDec: 2309,
    name: 'DEVANAGARI LETTER A',
    block: 'Devanagari',
    category: 'Lo',
    languageId: hindi.id,
    scriptId: devanagari.id,
  })

  // Q3 – U+042E (dec 1070) = Ю — used by all Cyrillic-script languages
  // Linked to the script (not a single language) so the query
  // Character → Script → LanguageScript → Language returns all Cyrillic languages.
  await upsertChar({
    character: 'Ю',
    unicodeHex: 'U+042E',
    unicodeDec: 1070,
    name: 'CYRILLIC CAPITAL LETTER YU',
    block: 'Cyrillic',
    category: 'Lu',
    scriptId: cyrillic.id,
  })

  // A few more representative characters
  await upsertChar({
    character: 'Ж',
    unicodeHex: 'U+0416',
    unicodeDec: 1046,
    name: 'CYRILLIC CAPITAL LETTER ZHE',
    block: 'Cyrillic',
    category: 'Lu',
    scriptId: cyrillic.id,
  })

  await upsertChar({
    character: 'ف',
    unicodeHex: 'U+0641',
    unicodeDec: 1601,
    name: 'ARABIC LETTER FA',
    block: 'Arabic',
    category: 'Lo',
    scriptId: arabic.id,
  })

  await upsertChar({
    character: 'E',
    unicodeHex: 'U+0045',
    unicodeDec: 69,
    name: 'LATIN CAPITAL LETTER E',
    block: 'Basic Latin',
    category: 'Lu',
    scriptId: latin.id,
  })

  await upsertChar({
    character: 'ア',
    unicodeHex: 'U+30A2',
    unicodeDec: 12450,
    name: 'KATAKANA LETTER A',
    block: 'Katakana',
    category: 'Lo',
    languageId: japanese.id,
    scriptId: katakana.id,
  })

  console.log('Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
