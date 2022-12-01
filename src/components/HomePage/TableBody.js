import "App.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const tableHeadData = [
  { name: "Email" },
  { name: "Name" },
  { name: "Gender" },
  { name: "Role" },
  { name: "Date of Birth" },
  { name: "Address" },
  { name: "Contact" },
  { name: "Update" },
  { name: "Delete" },
];

export default function TableBody({ data, button1, button2 }) {
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
    <>
      <div>
        <thead class="text-xs uppercase bg-white dark:bg-gray-200 ">
          <tr>
            {tableHeadData.map((item) => (
              <th scope="col" class="py-3 px-6">
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item) => (
              <tr key={item._id}>
                <td class="py-4 px-6">{item.email}</td>
                <td class="py-4 px-6">{item.name}</td>
                <td class="py-4 px-6">{item.gender}</td>
                <td class="py-4 px-6">{item.role}</td>
                <td class="py-4 px-6">{item.dateOfBirth}</td>
                <td class="py-4 px-6">{item.address}</td>
                <td class="py-4 px-6">{item.contact}</td>
                <td>
                  <button className="  flex justify-center py-2 px-4  text-xs font-medium font-bold rounded-full text-white bg-yellow-400 hover:bg-yellow-300">
                    {button1}
                  </button>
                </td>
                <td>
                  <button className="  flex justify-center py-2 px-4  text-xs font-medium font-bold rounded-full text-white bg-red-500 hover:bg-red-400">
                    {button2}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
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
    </>
  );
}
