
import {useState} from 'react';

const fetchAndRunTests = async (repoUrl) => {
  console.log('Fetching and running tests for', repoUrl);
  const response = await fetch(`/api/test/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({repoUrl}),
  });
  // const {tests} = await response.json();
  // return tests;
};

const TestRepo = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [testResults, setTestResults] = useState(null);

  const handleSubmit = async () => {
    // Fetch the repository and run the tests
    const tests = await fetchAndRunTests(repoUrl);

    setTestResults(tests);
  }

  return (
    <div>
      <h1>Test Repository</h1>
      <input
        type="text"
        value={repoUrl}
        onChange={e => setRepoUrl(e.target.value)}
        placeholder="Enter a GitHub repository URL"
      />
      <button onClick={handleSubmit}>Test Repo</button>
      {testResults && (
        <div>
          <h2>Test Results:</h2>
          <div>
            Passed: {testResults.passed}
            <div
              style={{
                backgroundColor: 'green',
                width: `${testResults.passed / testResults.total * 100}%`,
              }}
            />
          </div>
          <div>
            Failed: {testResults.failed}
            <div
              style={{
                backgroundColor: 'red',
                width: `${testResults.failed / testResults.total * 100}%`,
              }}
            />
          </div>
          <div>
            Total: {testResults.total}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestRepo;