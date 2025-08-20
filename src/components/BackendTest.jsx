import { useState, useEffect } from 'react';
import { statsAPI } from '../services/api';

const BackendTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // First test the basic connection
        const testResponse = await fetch('/api/test');
        if (!testResponse.ok) {
          throw new Error('Failed to connect to backend');
        }
        const testData = await testResponse.json();
        
        // If basic connection works, try to get stats
        try {
          const result = await statsAPI.getUserStats();
          setData({
            connection: ' Backend connection successful',
            testMessage: testData.message,
            stats: result
          });
        } catch (statsError) {
          setData({
            connection: 'Backend connection successful',
            testMessage: testData.message,
            error: 'Stats endpoint error: ' + (statsError.message || 'Unknown error')
          });
        }
      } catch (err) {
        console.error('Connection error:', err);
        setError('Failed to connect to backend: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return <div>Loading data from backend...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <p>Make sure your backend server is running on port 5000.</p>
      </div>
    );
  }

  return (
    <div className="backend-test" style={{
      padding: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      backgroundColor: '#f8fafc',
      marginTop: '1rem'
    }}>
      <h3 style={{ marginTop: 0, color: '#1e40af' }}>Backend Connection Status</h3>
      
      {error ? (
        <div style={{ color: '#dc2626', padding: '0.5rem', backgroundColor: '#fef2f2', borderRadius: '0.25rem' }}>
          <p><strong>Error:</strong> {error}</p>
          <p>Please check the following:</p>
          <ul style={{ margin: '0.5rem 0 0 1rem' }}>
            <li>Is the backend server running? (should be on port 5000)</li>
            <li>Check the browser's developer console for detailed error messages</li>
            <li>Make sure there are no CORS issues in the browser's network tab</li>
          </ul>
        </div>
      ) : data ? (
        <div>
          <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ecfdf5', borderRadius: '0.25rem' }}>
            <p> <strong>Connection Status:</strong> {data.connection || 'Connected'}</p>
            {data.testMessage && <p><strong>Test Message:</strong> {data.testMessage}</p>}
          </div>
          
          {data.error ? (
            <div style={{ color: '#b45309', padding: '0.5rem', backgroundColor: '#fffbeb', borderRadius: '0.25rem' }}>
              <p><strong>Warning:</strong> {data.error}</p>
              <p>This might be because there are no users in the database yet or there's an issue with the stats endpoint.</p>
            </div>
          ) : (
            <div>
              <h4>Statistics:</h4>
              <pre style={{
                backgroundColor: '#f1f5f9',
                padding: '1rem',
                borderRadius: '0.25rem',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                {JSON.stringify(data.stats || data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default BackendTest;
