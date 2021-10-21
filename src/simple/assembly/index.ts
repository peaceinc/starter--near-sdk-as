import { storage, Context, RNG, logging, u128 } from "near-sdk-as"


let words: Array<string> = ['cannabis','cloaked','leah','sprinkles','fantasy','soil','laundry','effect','mail','generate','production','trust','hair','tune','fair','manual','apparatus','set','enjoy','unpleasant','fame','paralyzed','auditor','acid','rib','applied','glimpse','show’,’directory','missile','fossil','sheet','review','curtain','outlet','moving','reform','memorial','gown','institution','evoke','sit','laborer','intention','contact','college','overlook','user','fish','have','enter','throw','fascinate','calendar','clashstructure','partnership','wording','provide','figure','family','stake','vague','excitement','rally','bread','volunteer','ex','linger','fork','context','grant','lazy','rider','strip','ancestor','stress','weakness','disgrace','mouse','rank','belief','match','conceive','memorandum','club','history','rubbish','reservoir','origin','wonder','us','publication','difference','intensify','flatware','camera','breakdown','banish']


export function GetMagicWords(wordcount: u8, extra: string): string {
  const rng = new RNG<u32>(1, u32.MAX_VALUE);
  let magic: u32[] = []
  for (let i: u8 = 0; i < wordcount; i++) {
    magic.push(rng.next()%words.length);
  }
  const roll = rng.next()%words.length;
  //let wordsout: Array<string> = []
  
  //logging.log(magic)
  
  storage.set(Context.sender, extra)

  const paid: u128 = Context.attachedDeposit
  if (paid > u128.from(1)) {
    return "your words of the day are:" + magic.map<string>((num:u32):string => words[num]).join(', ') + " and you contributed the word " + extra
  }
  else{
    return "more money plz," + " you contributed the word " + extra
  }
  //return "your words of the day are:" + magic.map<string>((num:u32):string => words[num]).join(', ')
}

// read the given key from account (contract) storage
export function read(key: string): string {
  if (storage.hasKey(key)) {
    return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
  } else {
    return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`
  }
}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {
  storage.set(key, value)
  return `✅ Data saved. ( ${storageReport()} )`
}

// private helper method used by read() and write() above
function storageReport(): string {
  return `storage [ ${Context.storageUsage} bytes ]`
}
