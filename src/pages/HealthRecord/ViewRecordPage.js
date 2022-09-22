import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/LandingPage/Footer";
import { getAllRecordsFunc } from "../../services/Record";

export default function ViewRecordPage() {
  const tableHeadData = [
    { name: "Name" },
    { name: "Gender" },
    { name: "Date of Birth" },
    { name: "Address" },
    { name: "Age" },
    { name: "Contact" },
    { name: "Health Condition" },
    { name: "Doctor Suggestion" },
  ];

  const [records, setRecords] = useState();
  console.log(
    "🚀 ~ file: ViewRecordPage.js ~ line 17 ~ ViewRecordPage ~ records",
    records
  );

  const fetchRecords = async () => {
    try {
      const response = await getAllRecordsFunc();
      setRecords(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewRecordPage.js ~ line 22 ~ fetchRecord ~ error",
        error
      );
    }
  };

  useEffect(() => {
    //logic
    fetchRecords();
  }, []);
  return (
    <div>
      <Outlet />
      <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
        <div className=" p-10 shadow-xl w-full space-y-8 gap-5 rounded-lg">
          <table class="w-full text-sm text-left  ">
            <thead class="text-xs  uppercase bg-white dark:bg-gray-200 ">
              <tr>
                {tableHeadData.map((item) => (
                  <th scope="col" class="py-3 px-6">
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records &&
                records.map((record) => (
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
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
