export async function initMocks() {
  if (process.env.NODE_ENV !== 'development') return;

  // Allow disabling MSW in development via environment variable
  if (process.env.USE_MSW === 'false') {
    console.log('[MSW] Mocks disabled via USE_MSW=false');
    return;
  }

  try {
    const { server } = await import('./server');
    server.listen();
    console.log('[MSW] Mock server is running');
  } catch (error) {
    console.error('[MSW] Failed to initialize mocks:', error);
  }
}
