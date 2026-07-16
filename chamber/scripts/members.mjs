const url = "data/members.json";
// export async function getMembersData() {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displayMembers(data);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }    
// }

export async function getMembersData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}