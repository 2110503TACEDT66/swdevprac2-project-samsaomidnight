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
        <main className="text-center p-5 ">
            <h1 className="text-2xl font-bold font-serif p-9" >{MassageDetail.data.name}</h1>
            <div className="flex justify-center my-5">
                <Image src={MassageDetail.data.picture}
                alt="Massage Shop Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black"/>
                <div className="text-md mx-5 text-left">{MassageDetail.data.description}
                <div className="font-serif my-3"><strong>Address:</strong> {MassageDetail.data.address}</div>
                <div className="font-serif my-3"><strong>Telephone:</strong> {MassageDetail.data.tel}</div>
                <div className="my-3 font-serif">
                <strong>Open Times :</strong>
                {openCloseTimes}
                </div>

                    <Link href={`/reservations?id=${params.mid}&name=${MassageDetail.data.name}`}>
                        <button className="text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out" >
                            Book Appointment
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}