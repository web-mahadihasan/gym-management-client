import { Puff } from "react-loader-spinner"

export function LoadingSpinner() {
  return (
    <div className="min-h-screen w-full flex items-center gap-4 justify-center">
        <div className="">
        <Puff
        visible={true}
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
        <p className="font-semibold my-2 tracking-wider">Loading...</p>
        </div>
    </div>
  )
}