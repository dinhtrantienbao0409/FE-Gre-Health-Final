import "App.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function TableBody(props) {
  const { data } = props;
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
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <tbody>
        {currentItems &&
          currentItems.map((record) => (
            <tr key={record._id}>
              <td class="py-4 px-6">{record.name}</td>
              <td class="py-4 px-6">{record.gender}</td>
              <td class="py-4 px-6">{record.dateOfBirth}</td>
              <td class="py-4 px-6">{record.address}</td>
              <td class="py-4 px-6">{record.age}</td>
              <td class="py-4 px-6">{record.contact}</td>
              <td class="py-4 px-6">{record.healthCondition}</td>
              <td class="py-4 px-6">{record.doctorSuggestion}</td>
            </tr>
          ))}
      </tbody>
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
    </>
  );
}
