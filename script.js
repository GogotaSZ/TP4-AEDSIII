// ---------------------------
// Estrutura da Tabela Hash
// ---------------------------

const bucketSize = 2;
let globalDepth = 1;
let directory = [];
let buckets = [];

class Bucket {
    constructor(localDepth) {
        this.localDepth = localDepth;
        this.values = [];
    }

    isFull() {
        return this.values.length >= bucketSize;
    }
}

// Inicializa a hash
function init() {
    directory = [];
    buckets = [];

    const bucket0 = new Bucket(1);
    const bucket1 = new Bucket(1);

    buckets.push(bucket0, bucket1);

    directory.push(bucket0);
    directory.push(bucket1);

    render();
}

function hash(value) {
    return parseInt(value) % Math.pow(2, globalDepth);
}

function binHash(value) {
    let bin = (parseInt(value) % Math.pow(2, globalDepth)).toString(2);
    return bin.padStart(globalDepth, '0');
}

function inserir() {
    const value = document.getElementById('inputValue').value.trim();
    if (value === '') return;

    const hashValue = hash(value);
    let bucket = directory[hashValue];

    if (!bucket.isFull()) {
        bucket.values.push(value);
        log(`Inserido ${value} no balde com profundidade local ${bucket.localDepth}`);
    } else {
        log(`Balde cheio ao inserir ${value}. Fazendo split.`);

        if (bucket.localDepth === globalDepth) {
            globalDepth++;
            let newDirectory = [];
            for (let i = 0; i < directory.length; i++) {
                newDirectory.push(directory[i]);
                newDirectory.push(directory[i]);
            }
            directory = newDirectory;
            log(`Aumentou profundidade global para ${globalDepth}`);
        }

        const newBucket = new Bucket(bucket.localDepth + 1);
        buckets.push(newBucket);

        const oldValues = [...bucket.values, value];
        bucket.values = [];
        bucket.localDepth++;

        for (let i = 0; i < directory.length; i++) {
            if (directory[i] === bucket) {
                const bin = i.toString(2).padStart(globalDepth, '0');
                if (bin.slice(-bucket.localDepth) === '1'.repeat(bucket.localDepth)) {
                    directory[i] = newBucket;
                }
            }
        }

        oldValues.forEach(v => inserirDireto(v));

        log(`Fez split do balde.`);
    }

    render();
}

function inserirDireto(value) {
    const hashValue = hash(value);
    directory[hashValue].values.push(value);
}

function buscar() {
    const value = document.getElementById('inputValue').value.trim();
    if (value === '') return;

    const hashValue = hash(value);
    const bucket = directory[hashValue];

    if (bucket.values.includes(value)) {
        log(`Valor ${value} encontrado no balde.`);
    } else {
        log(`Valor ${value} não encontrado.`);
    }

    render();
}

function render() {
    const dirDiv = document.getElementById('diretorio');
    dirDiv.innerHTML = '';

    const seenBuckets = new Set();
    const bucketsDiv = document.getElementById('baldes');
    bucketsDiv.innerHTML = '';

    for (let i = 0; i < directory.length; i++) {
        const entry = document.createElement('div');
        entry.className = 'dir-entry';
        entry.innerHTML = `<strong>${i.toString(2).padStart(globalDepth, '0')}</strong><br> → B${buckets.indexOf(directory[i])}`;
        dirDiv.appendChild(entry);

        if (!seenBuckets.has(directory[i])) {
            seenBuckets.add(directory[i]);
            const bucketDiv = document.createElement('div');
            bucketDiv.className = 'balde';
            bucketDiv.innerHTML = `
                <strong>B${buckets.indexOf(directory[i])}</strong><br>
                [${directory[i].values.join(', ')}]<br>
                LocalDepth: ${directory[i].localDepth}
            `;
            bucketsDiv.appendChild(bucketDiv);
        }
    }
}

function log(msg) {
    const logDiv = document.getElementById('logContent');
    logDiv.innerHTML += msg + '<br>';
    logDiv.scrollTop = logDiv.scrollHeight;
}

// Inicializa ao carregar
window.onload = init;
