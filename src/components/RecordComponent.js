import "App.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function RecordComponent({ data, onClick, button }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        {currentItems &&
          currentItems.map((item) => (
            <div
              className="w-1/2 rounded-lg shadow-md lg:max-w-sm cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => onClick(item._id)}
              id={item._id}
              key={item._id}
            >
              <div className="p-4">
                <h4 className="text-xl font-semibold tracking-tight text-blue-600 my-2">
                  {item.username}
                </h4>
                <div className="flex items-center my-4 flex-1 border-t border-gray-300 mt-0 " />
                <div className="flex flex-col items-start ">
                  <p className="mb-2 leading-normal">Dentist:</p>
                  <p className="mb-2 leading-normal font-bold">
                    {item.doctorName}
                  </p>
                  <p className="mb-2 leading-normal">Symptoms:</p>
                  <p className="mb-2 leading-normal font-bold text-red-600">
                    {item.dentalSymptoms}
                  </p>
                </div>
                <div className="flex items-center my-4 flex-1 border-t border-gray-300 mt-0 " />

                <div className="flex flex-col items-center">
                  <p className="mb-2 leading-normal text-gray-500">
                    Contact the dentist at:
                  </p>
                  <p className="mb-2 leading-normal font-semibold text-blue-600 text-xs">
                    {item.doctorEmail}
                  </p>
                </div>

                <div className="flex items-center my-4 flex-1 border-t border-gray-300 mt-0 " />

                <text className="font-semibold text-gray-400 ">{button}</text>
              </div>
            </div>
          ))}
      </div>

      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </div>
  );
}
