import { FORECAST_FIXTURE } from './fixture';
import { FETCH_TIMEOUT_MS, FORECAST_URL, WeatherUnavailableError, fetchForecast } from './client';

const NOW_MS = 1_792_840_000_000;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

describe('fetchForecast', () => {
  it('requests Tel Aviv in Israel time with no credentials', async () => {
    const fetchStub = vi.fn<typeof fetch>(async () => jsonResponse(FORECAST_FIXTURE));

    await fetchForecast(fetchStub, NOW_MS);

    const [url, init] = fetchStub.mock.calls[0];
    expect(url).toBe(FORECAST_URL);
    expect(FORECAST_URL).toContain('latitude=32.0853');
    expect(FORECAST_URL).toContain('longitude=34.7818');
    expect(FORECAST_URL).toContain('timezone=Asia%2FJerusalem');
    expect(init?.credentials).toBe('omit');
    expect(init?.signal).toBeInstanceOf(AbortSignal);
  });

  it('returns the parsed report', async () => {
    const actual = await fetchForecast(async () => jsonResponse(FORECAST_FIXTURE), NOW_MS);

    expect(actual.current.temperature).toBe(28.6);
    expect(actual.fetchedAt).toBe(NOW_MS);
  });

  it('throws WeatherUnavailableError on HTTP error', async () => {
    await expect(fetchForecast(async () => jsonResponse({}, 500), NOW_MS)).rejects.toBeInstanceOf(WeatherUnavailableError);
  });

  it('throws WeatherUnavailableError on an unexpected body', async () => {
    await expect(fetchForecast(async () => jsonResponse({ nope: true }), NOW_MS)).rejects.toBeInstanceOf(WeatherUnavailableError);
  });

  it('throws WeatherUnavailableError when the network fails', async () => {
    await expect(fetchForecast(async () => { throw new TypeError('Failed to fetch'); }, NOW_MS)).rejects.toBeInstanceOf(WeatherUnavailableError);
  });

  it('gives up after the timeout', async () => {
    vi.useFakeTimers();
    try {
      const neverResolves = (_url: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      });

      const pending = fetchForecast(neverResolves, NOW_MS);
      const assertion = expect(pending).rejects.toBeInstanceOf(WeatherUnavailableError);
      await vi.advanceTimersByTimeAsync(FETCH_TIMEOUT_MS);
      await assertion;
    } finally {
      vi.useRealTimers();
    }
  });

  it('aborts when the caller cancels', async () => {
    const controller = new AbortController();
    const pending = fetchForecast((_url, init) => new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
    }), NOW_MS, controller.signal);

    controller.abort();

    await expect(pending).rejects.toBeInstanceOf(WeatherUnavailableError);
  });
});
