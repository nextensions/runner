import JQL from 'jqljs'

const fieldsEnum = {
  SCHOOL: 's',
  DISTRICT: 'd',
  AMPHOE: 'a',
  PROVINCE: 'p',
}

const preprocess = (data) => {
  if (!data.data[0].length) {
    // non-compacted database
    return data
  }

  const expanded = []
  const lookup = data.lookup.split('|')
  const words = data.words.split('|')

  const text = (text) => {
    const repl = (m) => {
      const ch = m.charCodeAt(0)
      return words[ch < 97 ? ch - 65 : 26 + ch - 97]
    }
    if (typeof text === 'number') {
      text = lookup[text]
    }
    return text.replace(/[A-Z]/gi, repl)
  }

  data.data.forEach((provinceEntry) => {
    const province = provinceEntry[0]
    const amphurList = provinceEntry[1]
    amphurList.forEach((amphurEntry) => {
      const amphur = amphurEntry[0]
      const districtList = amphurEntry[1]
      districtList.forEach((districtEntry) => {
        const district = districtEntry[0]
        const schoolList = districtEntry[1]
        schoolList.forEach((school) => {
          expanded.push({
            d: text(district),
            a: text(amphur),
            p: text(province),
            s: text(school),
          })
        })
      })
    })
  })
  return expanded
}
const DB = new JQL(preprocess(require('../../static/school.json')))

const resolveResultbyField = (type: string, searchStr: string) => {
  let possibles = []
  try {
    possibles = DB.select('*')
      .where(type)
      .match(`^${searchStr}`)
      .orderBy(type)
      .fetch()
  } catch (e) {
    return []
  }
  return possibles
}

export { resolveResultbyField, fieldsEnum }
