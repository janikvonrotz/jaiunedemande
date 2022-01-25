import fetch from 'node-fetch'
import fs from 'fs'

const response = await fetch('https://anousdejouer.ch/spip.php?page=export')
const data = await response.json()
let filepath = './src/anousdejouer.json'
fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
console.log(`File ${filepath} written.`)