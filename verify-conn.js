import { MongoClient } from 'mongodb';

const HOST = 'cluster0.tcdjqsv.mongodb.net';
const USER = 'admin';
const PASS_BASE = 'HnjPk7Padm%%8#@';

// PWD encoded (what we've been using)
const PASS_ENCODED = 'HnjPk7Padm%25%258%23%40';
// PWD unencoded (raw) - usually fails due to @ and #
const PASS_RAW = 'HnjPk7Padm%%8#@';
// PWD if %% was actually % (common mistake)
const PASS_SINGLE_PCT_ENCODED = 'HnjPk7Padm%258%23%40';

const variants = [
    { name: 'Double % (Encoded)', uri: `mongodb+srv://${USER}:${PASS_ENCODED}@${HOST}/mboloprof?appName=Cluster0` },
    { name: 'Single % (Encoded)', uri: `mongodb+srv://${USER}:${PASS_SINGLE_PCT_ENCODED}@${HOST}/mboloprof?appName=Cluster0` },
    { name: 'Double % (No DB Name)', uri: `mongodb+srv://${USER}:${PASS_ENCODED}@${HOST}/?appName=Cluster0` },
];

async function testAll() {
    for (const v of variants) {
        console.log(`Testing: ${v.name}...`);
        const client = new MongoClient(v.uri);
        try {
            await client.connect();
            console.log(`✅ SUCCESS with ${v.name}`);
            console.log(`URi à utiliser : ${v.uri}`);
            await client.close();
            return;
        } catch (e) {
            console.log(`❌ FAIL: ${e.message}`);
        }
    }
}

testAll();
