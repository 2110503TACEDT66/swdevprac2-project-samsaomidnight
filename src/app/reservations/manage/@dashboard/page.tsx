import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/libs/auth";
import Massage from "@/db/models/Massage";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const addMassage = async (addMassageForm:FormData) => {
        "use server"
        const name = addMassageForm.get("name")
        const picture = addMassageForm.get("picture")
        const address = addMassageForm.get("address")
        const tel = addMassageForm.get("tel")

        const day = addMassageForm.get("day");
        const open = addMassageForm.get("open");
        const close = addMassageForm.get("close");
        

        try{
            await dbConnect()
            const massage = await Massage.create({
                "name": name,
                "picture": picture,
                "address": address,
                "tel": tel,
                "open_close_times": [{ day, open, close }]
            })
        } catch(error){
            console.log(error)
        }
        revalidateTag("massages")
        redirect("/massage")
    }

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-stone-400 m-5 p-5 rounded-lg shadow">
    <div className="text-xl font-medium text-gray-800 font-serif mb-4">Hello, {profile.data.name} you are an {profile.data.role}</div>
    <div className="overflow-hidden bg-white rounded-lg shadow mb-6">
      <table className="min-w-full leading-normal">
        <tbody>
          <tr><td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">Name</td><td className="px-5 py-3 border-b border-gray-200 bg-white text-sm ">{profile.data.name}</td></tr>
          <tr><td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">Email</td><td className="px-5 py-3 border-b border-gray-200 bg-white  text-sm">{profile.data.email}</td></tr>
          <tr><td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">Member Since</td><td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">{createdAt.toString()}</td></tr>
        </tbody>
      </table>
    </div>

            {
                (profile.data.role=="admin")?
                <form action={addMassage} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-black mb-6">Create Massage Shop</h2>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input type="text" required name="name" placeholder="Massage Shop"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>
          
          <label className="block">
            <span className="text-gray-700">Picture</span>
            <input type="url" required name="picture" placeholder="URL"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>

          <label className="block">
            <span className="text-gray-700">Address</span>
            <input type="text" required name="address" placeholder="address"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>

          <label className="block">
            <span className="text-gray-700">Telephone</span>
            <input type="text" required name="tel" placeholder="tel"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>

          <label className="block">
            <span className="text-gray-700">Day</span>
            <input type="text" required name="day" placeholder="Day"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>

          <label className="block">
            <span className="text-gray-700">Open Time</span>
            <input type="time" required name="open"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>

          <label className="block">
            <span className="text-gray-700">Close Time</span>
            <input type="time" required name="close"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
          </label>
        </div>
        
        <button type="submit"
                className="w-[100%] text-lg text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-20 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out">
          Add New Massage Shop
        </button>
      </form>: null
            }

        </main>
    );
}