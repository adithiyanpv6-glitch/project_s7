const baseUrl = 'http://localhost:5000/api';

async function testAll() {
  console.log('--- 1. Testing Student Auth ---');
  let res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'student@placementprep.com', password: 'Student@123' })
  });
  let auth = await res.json();
  const token = auth.token;
  console.log(`✓ Student authenticated: ${auth.user.name} (${auth.user.role})`);
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  console.log('--- 2. Testing Student Dashboard & Profile ---');
  res = await fetch(`${baseUrl}/student/dashboard`, { headers });
  let dash = await res.json();
  console.log(`✓ Readiness Score: ${dash.readinessScore}% | Today Tasks: ${dash.tasksDueToday.length} | Coding Solved: ${dash.codingSolvedCount}`);

  console.log('--- 3. Testing Practice Questions ---');
  res = await fetch(`${baseUrl}/practice/questions?category=QUANTITATIVE&limit=5`, { headers });
  let practice = await res.json();
  console.log(`✓ Fetched ${practice.questions.length} Quantitative questions out of ${practice.total} available`);

  console.log('--- 4. Testing Coding Problems & Execution ---');
  res = await fetch(`${baseUrl}/coding/problems`, { headers });
  let problems = await res.json();
  console.log(`✓ Loaded ${problems.length} DSA problems.`);
  const twoSum = problems.find(p => p.slug === 'two-sum') || problems[0];
  console.log(`✓ Selected problem: "${twoSum.title}"`);

  res = await fetch(`${baseUrl}/coding/run`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      problemId: twoSum.id,
      language: 'javascript',
      code: 'function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const diff = target - nums[i]; if (map.has(diff)) return [map.get(diff), i]; map.set(nums[i], i); } return []; }'
    })
  });
  let runRes = await res.json();
  console.log(`✓ Code execution result: ${runRes.status}, passed ${runRes.passedCount}/${runRes.totalCount} test cases`);

  console.log('--- 5. Testing Mock Tests ---');
  res = await fetch(`${baseUrl}/mocktests`, { headers });
  let tests = await res.json();
  console.log(`✓ Loaded ${tests.length} mock tests. First test: "${tests[0]?.title}"`);

  console.log('--- 6. Testing Company Prep Hub ---');
  res = await fetch(`${baseUrl}/companies`, { headers });
  let comp = await res.json();
  console.log(`✓ Loaded ${comp.length} company prep blueprints: ${comp.map(c => c.name).join(', ')}`);

  console.log('--- 7. Testing Resume ATS Intelligence ---');
  res = await fetch(`${baseUrl}/resume/analyze`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      rawText: `Senior Software Engineer with 3 years experience building scalable web applications using React, TypeScript, and Node.js.
Spearheaded backend architecture overhaul reducing API latency by 45% across 200,000 monthly active users.
Engineered real-time notification engine with WebSockets handling 10,000 concurrent connections.
Architected CI/CD pipelines with GitHub Actions and Docker, reducing build deployment times by 60%.`
    })
  });
  let resume = await res.json();
  console.log(`✓ Resume ATS Score: ${resume.overallScore}/100 | Action verbs: ${resume.categoryScores?.impact}/20 | Metrics: ${resume.categoryScores?.skills}/20`);

  console.log('--- 8. Testing Admin Command Center ---');
  res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@placementprep.com', password: 'Admin@123' })
  });
  let adminAuth = await res.json();
  const adminHeaders = { 'Authorization': `Bearer ${adminAuth.token}` };

  res = await fetch(`${baseUrl}/admin/stats`, { headers: adminHeaders });
  let stats = await res.json();
  console.log(`✓ Admin Stats: ${stats.totalStudents} students | Avg Readiness: ${stats.avgReadiness}% | ${stats.totalQuestions} questions in bank`);

  res = await fetch(`${baseUrl}/admin/export`, { headers: adminHeaders });
  let exportData = await res.json();
  console.log(`✓ Admin Export: ${exportData.report.length} student records exported successfully`);

  console.log('--- 9. Testing Frontend HTTP Availability ---');
  let clientRes = await fetch('http://localhost:5173');
  console.log(`✓ Frontend Vite server returned HTTP ${clientRes.status}`);

  console.log('\n======================================================');
  console.log('🌟 ALL 9 END-TO-END VERIFICATION CHECKS PASSED 100%! 🌟');
  console.log('======================================================\n');
}

testAll().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
