const url = "data/products.json";

export async function getProductsData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
          	throw new Error(`Error loading data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch products:", error);
        return [];
    }
}