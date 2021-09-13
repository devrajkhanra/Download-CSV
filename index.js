const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const ProgressBar = require('progress');

// get current date month year
let currentDate = new Date();
let cDay = currentDate.getDate()
let cMonth = currentDate.getMonth() + 1
let cMonthName = currentDate.toLocaleString('default',{month: 'short'}).toString().toUpperCase()
let cYear = currentDate.getFullYear()
let shortYear = cYear.toString().slice(-2)
console.log(cMonthName)

console.log(`Current Date: ${currentDate}`)


// call checkDate
checkDate()


//  create a function to check current day or month is in the range of 1 - 10
function checkDate() {
    if (cDay < 10) {
        cDay = `0${cDay}`
    }

    if (cMonth < 10) {
        cMonth = `0${cMonth}`
    }

    console.log(`Check Date: ${cDay}/${cMonth}/${cYear}`)
}

// directory to check if exists
const dir = 'D:/Workspace'
const dataDir = `${dir}/Data`
const dailyDir = `${dataDir}/Daily`
const maDir = `${dataDir}/MAR`
const foDir = `${dataDir}/F&O`
const niftyDir = `${dataDir}/Nifty`


async function downloadcsv (urlLink, filePath, fileName, file) {  
  
    const { data, headers } = await Axios({
      url: urlLink,
      method: 'GET',
      responseType: 'stream'
    })
    const totalLength = headers['content-length']
  
    const progressBar = new ProgressBar(`-> ${file} [:bar] :percent :etas`, {
        width: 70,
        complete: '=',
        incomplete: ' ',
        renderThrottle: 1,
        total: parseInt(totalLength)
      })
  
    const writer = Fs.createWriteStream(
      Path.resolve(__dirname, filePath, fileName)
    )
  
    data.on('data', (chunk) => progressBar.tick(chunk.length))
    data.pipe(writer)
  }



async function download() {
  // SEC BHAV DATA
  surl = `https://archives.nseindia.com/products/content/sec_bhavdata_full_${cDay}${cMonth}${cYear}.csv`
  sfilepath = `${dailyDir}/`
  sfilename = `sec_bhavdata_full_${cDay}${cMonth}${cYear}.csv`
  sfile = 'SEC BHAV DATA'
  await downloadcsv(surl , sfilepath, sfilename, sfile)


  // MAR
  murl = `https://archives.nseindia.com/archives/equities/mkt/MA${cDay}${cMonth}${shortYear}.csv`
  mfilepath = `${maDir}/`
  mfilename = `MA${cDay}${cMonth}${cYear}.csv`
  mfile = 'MARKET ACTIVITY REPORT'
  await downloadcsv(murl , mfilepath, mfilename, mfile)

  
  // FnO
  furl = `https://archives.nseindia.com/content/historical/DERIVATIVES/2021/SEP/fo${cDay}${cMonthName}${cYear}bhav.csv.zip`
  ffilepath = `${foDir}/`
  ffilename = `fo${cDay}${cMonth}${cYear}.zip`
  ffile = 'F&O'
  await downloadcsv(furl , ffilepath, ffilename, ffile)

  
  // NIFTY 50
  n50url = `https://archives.nseindia.com/content/indices/ind_nifty50list.csv`
  n50filepath = `${niftyDir}/`
  n50filename = `ind_nifty50list.csv`
  n50file = 'Nifty 50'
  await downloadcsv(n50url , n50filepath, n50filename, n50file)


  // NIFTY NEXT %)
  nn50url = `https://archives.nseindia.com/content/indices/ind_niftynext50list.csv`
  nn50filepath = `${niftyDir}/`
  nn50filename = `ind_niftynext50list.csv`
  nn50file = 'Nifty Next 50'
  await downloadcsv(nn50url , nn50filepath, nn50filename, nn50file)

  // NIFTY 100
  n100url = `https://archives.nseindia.com/content/indices/ind_nifty100list.csv`
  n100filepath = `${niftyDir}/`
  n100filename = `ind_nifty100list.csv`
  n100file = 'Nifty 100'
  await downloadcsv(n100url , n100filepath, n100filename, n100file)


  // NIFTY 200
  n200url = `https://archives.nseindia.com/content/indices/ind_nifty200list.csv`
  n200filepath = `${niftyDir}/`
  n200filename = `ind_nifty200list.csv`
  n200file = 'Nifty 200'
  await downloadcsv(n200url , n200filepath, n200filename, n200file)


  // NIFTY 500
  n500url = `https://archives.nseindia.com/content/indices/ind_nifty500list.csv`
  n500filepath = `${niftyDir}/`
  n500filename = `ind_nifty500list.csv`
  n500file = 'Nifty 500'
  await downloadcsv(n500url , n500filepath, n500filename, n500file)

}

download()
