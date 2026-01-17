type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

type RequestConfig = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string | number | boolean | null | undefined>;
  data?: Json;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

type Response<T> = {
  data: T;
  status: number;
  ok: boolean;
};

const baseURL: string = import.meta.env.VITE_API_URL ?? '/';

function buildUrl(url: string, params?: RequestConfig['params']): string {
  const full = new URL(url, baseURL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      full.searchParams.set(key, String(value));
    }
  }
  return full.toString();
}

async function request<T = unknown>(config: RequestConfig): Promise<Response<T>> {
  const res = await fetch(buildUrl(config.url, config.params), {
    method: config.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers ?? {}),
    },
    body: config.data === undefined ? undefined : JSON.stringify(config.data),
    credentials: 'include',
    signal: config.signal,
  });

  const contentType = res.headers.get('content-type') ?? '';
  const data = contentType.includes('application/json') ? ((await res.json()) as T) : ((await res.text()) as T);

  return {
    data,
    status: res.status,
    ok: res.ok,
  };
}

const axiosClient = {
  request,
  get: <T = unknown>(url: string, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) =>
    request<T>({ url, method: 'GET', ...config }),
  post: <T = unknown>(url: string, data?: Json, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) =>
    request<T>({ url, method: 'POST', data, ...config }),
  put: <T = unknown>(url: string, data?: Json, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) =>
    request<T>({ url, method: 'PUT', data, ...config }),
  patch: <T = unknown>(url: string, data?: Json, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) =>
    request<T>({ url, method: 'PATCH', data, ...config }),
  delete: <T = unknown>(url: string, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) =>
    request<T>({ url, method: 'DELETE', ...config }),
};

export { axiosClient };
