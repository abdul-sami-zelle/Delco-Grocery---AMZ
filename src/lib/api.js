
export const BASE_URL = "https://api.delcofarmersmarket.com";

export async function getLandingPageData() {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/landing-page/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch landing page data");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}


export async function getProductData() {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/section/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

export async function getSalesProductData() {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/sales-page/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}


export async function getSimilarProducts(category, excludeId, limit = 5) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/products/get-similar?category=${category}&exclude=${excludeId}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch similar products");

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("API Error (similar products):", err);
    return [];
  }
}
