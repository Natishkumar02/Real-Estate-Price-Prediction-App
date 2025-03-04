export async function loadJSON() {
    try {
        const response = await fetch("/data/synthetic_real_estate_data.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        return jsonData.map(row => ({
            area: Number(row["Area (sq ft)"]) || 500,
            bedrooms: Number(row.Bedrooms) || 1,
            bathrooms: Number(row.Bathrooms) || 1,
            location: row.Location && row.Location.trim() !== "" ? row.Location : "Unknown",
            age: Number(row["Age of Property"]) || 0,
            price: Number(row["Price ($)"]) || 50000
        }));
    } catch (error) {
        console.error("Error loading JSON file:", error);
        return [];
    }
}
