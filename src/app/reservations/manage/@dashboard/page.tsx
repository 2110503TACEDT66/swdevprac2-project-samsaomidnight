import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
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
        

        try{
            await dbConnect()
            const massage = await Massage.create({
                "name": name,
                "picture": picture,
                "address": address,
                "tel": tel,
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
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr><td>Name</td><td>{profile.data.name}</td></tr>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
                </tbody>
            </table>

            {
                (profile.data.role=="admin")?
                <form action={addMassage}>
                    <div className="text=xl text-blue-700">Create Massage Shop</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-grey-700 pr-4" htmlFor="name">Name</label>
                        <input type="text" required id="name" name="name" placeholder="Massage Shop"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-grey-700 pr-4" htmlFor="picture">Picture</label>
                        <input type="text" required id="picture" name="picture" placeholder="URL"
                        className="bg-white border-2 border-grey-200 rounded w-full p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-grey-700 pr-4" htmlFor="address">Address</label>
                        <input type="text" required id="address" name="address" placeholder="address"
                        
                        className="bg-white border-2 border-grey-200 rounded w-auto p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-grey-700 pr-4" htmlFor="largebags">Telephone</label>
                        <input type="text" required id="tel" name="tel" placeholder="tel"
                        className="bg-white border-2 border-grey-200 rounded w-auto p-2 text-grey-700 focus:outline-none focus:border-blue-400"
                        />

                    </div>
                   
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Massage Shop</button>
                </form>
                : null
            }

        </main>
    );
}