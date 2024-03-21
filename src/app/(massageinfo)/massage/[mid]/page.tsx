import Image from "next/image"
import getMassage from "@/libs/getMassage"
import Link from "next/link"

export default async function MassageDetailPage({params}:{params:{mid:string}}) {

    const MassageDetail = await getMassage(params.mid)

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{MassageDetail.data.model}</h1>
            <div className="flex flex-row my-5">
                <Image src={MassageDetail.data.picture}
                alt="Product Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black"/>
                <div className="text-md mx-5 text-left">{MassageDetail.data.description}
                    <div>Doors: {MassageDetail.data.doors}</div>
                    <div>Seats: {MassageDetail.data.seats}</div>
                    <div>Large Bags: {MassageDetail.data.largebags}</div>
                    <div>Small Bags: {MassageDetail.data.smallbags}</div>
                    <div>Daily Rental Rate: {MassageDetail.data.dayRate} (insurance included) </div>

                    <Link href={`/reservations?id=${params.mid}&model=${MassageDetail.data.model}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 shadow-sm text-white" >
                            Make Reservation
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

// export async function generateStaticParams() {
//     return [{cid:'001'}, {cid:'002'}, {cid:'003'}, {cid:'004'}]
// }