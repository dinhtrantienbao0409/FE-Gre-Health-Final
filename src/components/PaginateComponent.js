import "App.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function PaginateComponent({ data, onClick, button }) {
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
            >
              <div className="p-4">
                <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                  {item.username}
                </h4>
                <p className="mb-2 leading-normal">{item.reason}</p>
                <p className="mb-2 leading-normal">{item.dateRequest}</p>
                <p className="mb-2 leading-normal">{item.diseaseSymptoms}</p>
                <p className="mb-2 leading-normal">{item.contact}</p>
                <p className="mb-2 leading-normal">{item.address}</p>
                <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                  {button}
                </button>
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
