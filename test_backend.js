const http = require('http');

async function request(path, method, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5050,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        let jsonData = '';
        if (body) {
            jsonData = JSON.stringify(body);
            options.headers['Content-Length'] = Buffer.byteLength(jsonData);
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                let parsed;
                try {
                    parsed = JSON.parse(data);
                } catch (e) {
                    parsed = data;
                }
                resolve({
                    statusCode: res.statusCode,
                    data: parsed
                });
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(jsonData);
        }
        req.end();
    });
}

async function runTests() {
    console.log("=== STARTING BACKEND TESTS ===");
    let token = null;
    let docId = null;
    const testEmail = `testuser_${Date.now()}@example.com`;
    const testPassword = "password123";

    try {
        // 1. Health check
        console.log("\n[1] Testing Health Endpoint...");
        let res = await request('/health', 'GET');
        console.log(`Status: ${res.statusCode}`, res.data);
        if (res.statusCode !== 200) throw new Error("Health check failed");

        // 2. Signup
        console.log("\n[2] Testing Auth Signup...");
        res = await request('/api/auth/signup', 'POST', {
            email: testEmail,
            password: testPassword,
            name: "Test User"
        });
        console.log(`Status: ${res.statusCode}`, res.data);
        if (res.statusCode !== 201) throw new Error("Signup failed");
        
        token = res.data.token;

        // 3. Current User
        console.log("\n[3] Testing Get Current User...");
        res = await request('/api/auth/me', 'GET', null, token);
        console.log(`Status: ${res.statusCode}`, res.data);
        if (res.statusCode !== 200) throw new Error("Get User failed");

        // 4. Create Document
        console.log("\n[4] Testing Document Creation...");
        res = await request('/api/documents/create', 'POST', {
            title: "Test Document",
            content: "Hello World"
        }, token);
        console.log(`Status: ${res.statusCode}`, res.data);
        if (res.statusCode !== 201 && res.statusCode !== 200) throw new Error("Document creation failed");
        
        docId = res.data.document ? res.data.document.id : res.data.id;
        
        // 5. Get Documents
        console.log("\n[5] Testing Get User Documents...");
        res = await request('/api/documents', 'GET', null, token);
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode !== 200) throw new Error("Get documents failed");

        // 6. Update Document
        if (docId) {
            console.log(`\n[6] Testing Update Document (${docId})...`);
            res = await request(`/api/documents/save/${docId}`, 'PUT', {
                title: "Updated Document",
                content: "Hello World Updated"
            }, token);
            console.log(`Status: ${res.statusCode}`);
            if (res.statusCode !== 200) throw new Error("Document update failed");
            
            // 7. Delete Document
            console.log(`\n[7] Testing Delete Document (${docId})...`);
            res = await request(`/api/documents/delete/${docId}`, 'DELETE', null, token);
            console.log(`Status: ${res.statusCode}`);
            if (res.statusCode !== 200) throw new Error("Document deletion failed");
        } else {
            console.log("\n[6/7] Skipping document update/delete because docId was not received.");
        }

        // 8. Delete Account
        console.log("\n[8] Testing Account Deletion...");
        res = await request('/api/auth/account', 'DELETE', { password: testPassword }, token);
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode !== 200) throw new Error("Account deletion failed");

        console.log("\n=== ALL TESTS PASSED SUCCESSFULLY ===");

    } catch (e) {
        console.error("\nTEST FAILED:", e.message);
        process.exit(1);
    }
}

runTests();
