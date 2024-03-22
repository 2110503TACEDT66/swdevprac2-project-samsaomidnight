import Image from "next/image"
import getMassage from "@/libs/getMassage"
import Link from "next/link"

export default async function MassageDetailPage({params}:{params:{mid:string}}) {

    const MassageDetail = await getMassage(params.mid)

    type OpenCloseTime = {
        day: string;
        open: string;
        close: string;
      };

      const openCloseTimes = MassageDetail.data.open_close_times.map((oc: OpenCloseTime) => (
        <div key={oc.day}>{oc.day}: {oc.open} - {oc.close}</div>
      ));


    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{MassageDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={MassageDetail.data.picture}
                alt="Massage Shop Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black"/>
                <div className="text-md mx-5 text-left">{MassageDetail.data.description}
                <div>Address: {MassageDetail.data.address}</div>
                <div>Telephone: {MassageDetail.data.tel}</div>
                <div className="my-2">
                <strong>Open Times:</strong>
                {openCloseTimes}
                </div>

                    <Link href={`/reservations?id=${params.mid}&name=${MassageDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 shadow-sm text-white" >
                            Book Appointment
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