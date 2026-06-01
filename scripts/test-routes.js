const API_URL = 'http://localhost:5050/api';

async function runTests() {
  console.log("🚀 Starting E2E Tests for BockDocs Backend Defaults...\n");

  let token = '';
  let documentId = '';
  let shareToken = '';

  const randomString = Math.random().toString(36).substring(7);
  const testUser = {
    email: `testuser_${randomString}@example.com`,
    password: 'password123',
    name: 'Test Setup User'
  };

  try {
    // 1. Test Signup
    console.log("📝 Testing POST /auth/signup...");
    let res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    let data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    console.log("✅ Signup successful:", data.user.email);
    token = data.token; // Store token from signup

    // 2. Test Signin (to make sure it works)
    console.log("\n🔑 Testing POST /auth/signin...");
    res = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signin failed');
    console.log("✅ Signin successful, received token");
    token = data.token;

    // 3. Test Create Document
    console.log("\n📄 Testing POST /documents/create...");
    res = await fetch(`${API_URL}/documents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: 'My E2E Test Doc', content: 'Hello World! This is a test.' })
    });
    data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Create doc failed');
    console.log("✅ Create Document successful:", data.title);
    documentId = data.id;

    // 4. Test Fetch User Documents
    console.log("\n📚 Testing GET /documents...");
    res = await fetch(`${API_URL}/documents`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Fetch docs failed');
    console.log(`✅ Fetch Documents successful, found ${data.length} documents`);

    // 5. Test Share Link Generation
    console.log("\n🔗 Testing POST /documents/share/:id...");
    res = await fetch(`${API_URL}/documents/share/${documentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ permission: 'edit' }) // request edit permission
    });
    data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Share link failed');
    console.log("✅ Share Link successful, URL:", data.shareUrl);
    shareToken = data.token;

    // 6. Test Getting Shared Document via Token
    console.log("\n🤝 Testing GET /documents/share/:token...");
    res = await fetch(`${API_URL}/documents/share/${shareToken}`);
    data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Get shared doc failed');
    console.log("✅ Get Shared Document successful:", data.document.title, "with permission:", data.permission);

    // 7. Test Delete Document
    console.log("\n🗑️ Testing DELETE /documents/delete/:id...");
    res = await fetch(`${API_URL}/documents/delete/${documentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Delete doc failed');
    console.log("✅ Delete Document successful");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! The backend is working perfectly.");
  } catch (err) {
    console.error(`\n❌ TEST FAILED: ${err.message}`);
    process.exit(1);
  }
}

runTests();
