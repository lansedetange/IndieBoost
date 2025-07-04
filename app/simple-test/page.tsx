export default function SimpleTestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 LaunchForge Simple Test</h1>
      <p>If you can see this page, the Next.js server is working correctly!</p>
      
      <h2>Project Status</h2>
      <ul>
        <li>✅ Next.js server running</li>
        <li>✅ Environment variables loaded</li>
        <li>✅ TypeScript compilation successful</li>
        <li>🔄 Testing LaunchForge functionality...</li>
      </ul>

      <h2>Test LaunchForge</h2>
      <p>
        <a href="/test-launch" style={{ color: '#0066cc', textDecoration: 'underline' }}>
          Go to LaunchForge Test Page →
        </a>
      </p>

      <h2>Environment Check</h2>
      <p>Base URL: {process.env.NEXT_PUBLIC_SITE_URL || 'Not set'}</p>
      <p>Node Environment: {process.env.NODE_ENV}</p>
    </div>
  );
}