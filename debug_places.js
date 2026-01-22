// ESM script

async function check(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=10`;
    console.log(`Fetching: ${url}`);
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'SoulMapAlchemy/1.0', 'Accept-Language': 'pt-BR' } });
        const data = await res.json();

        console.log(`\nResults for "${query}":`);
        data.forEach((item, i) => {
            console.log(`[${i}] Display: ${item.display_name}`);
            console.log(`    Type: ${item.type}, AddrType: ${item.addresstype}`);
            console.log(`    Address:`, item.address);
            const addr = item.address;
            const city = addr.city || addr.town || addr.village || addr.municipality || addr.hamlet;
            console.log(`    -> Detected City: ${city}`);
        });
    } catch (e) {
        console.error(e);
    }
}

async function run() {
    await check('Brasilia');
    await check('Joinville');
    await check('joi');
    await check('join');
}

run();
