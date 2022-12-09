export default function NoDataComponent() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
      {/* <div className="flex flex-col items-center justify-center p-28 shadow-xl w-full rounded-lg "> */}
      <div className="text-9xl  text-gray-400">
        <ion-icon name="folder-open"></ion-icon>
      </div>

      <h1 className="text-2xl text-gray-400 font-bold"> No data</h1>
      {/* </div> */}
    </div>
  );
}
