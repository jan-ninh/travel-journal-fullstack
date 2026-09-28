const originalFetch = window.fetch.bind(window);

export const authServerURL = import.meta.env.VITE_APP_AUTH_SERVER_URL as
  | string
  | undefined;

if (!authServerURL) {
  console.error("No Auth server set (VITE_APP_AUTH_SERVER_URL missing)");
}

type FetchArgs = Parameters<typeof fetch>;

function getUrl(input: FetchArgs[0]): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url; // Request
}

function withCredentials(init?: RequestInit): RequestInit {
  return { ...(init ?? {}), credentials: "include" };
}

window.fetch = async (...args: FetchArgs): Promise<Response> => {
  const [input, init] = args;
  const url = getUrl(input);

  // 1) first try
  let res = await originalFetch(input, withCredentials(init));

  const authHeader = res.headers.get("www-authenticate");

  const isRefreshCall =
    !!authServerURL &&
    url.startsWith(authServerURL) &&
    url.includes("/auth/refresh");

  // 2) refresh + retry once
  if (
    authServerURL &&
    authHeader?.includes("token_expired") &&
    !isRefreshCall
  ) {
    const refreshRes = await originalFetch(`${authServerURL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) throw new Error("Login required");

    res = await originalFetch(input, withCredentials(init));
  }

  return res;
};
