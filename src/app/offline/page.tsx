import Navbar from '@/components/Navbar';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <svg 
              className="w-24 h-24 mx-auto text-gray-400 mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" 
              />
            </svg>
            
            <h1 className="font-heading text-4xl text-gray-900 mb-4">
              You're Offline
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              It looks like you've lost your internet connection. Don't worry - you can still access some content that's been saved to your device.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-8 mb-8">
            <h2 className="font-heading text-2xl text-gray-900 mb-4">
              Available Offline Content
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Previously visited sermon pages</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Main navigation pages</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Basic site functionality</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            
            <div className="text-sm text-gray-500">
              <p>Once you're back online, all features will be available again.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}