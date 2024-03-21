export default async function getMassage(id:string) {
    const response = await fetch (`http://localhost:5001/api/v1/massages/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch cars")
    }
    return await response.json()
}
