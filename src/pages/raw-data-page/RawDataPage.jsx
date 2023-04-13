import "./RawDataPage.scss"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataCards from '../../components/DataCards/DataCards';
import Pagination from '../../components/pagination/Pagination';
import { ThreeDots } from "react-loader-spinner";
import Datatable from "../../components/data-table/Datatable";

export default function RawData() {
  const [rawData, setRawData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageData, setPageData] = useState([])
  const [isLoading, setisLoading] = useState(true)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Consumed Quantity',
        accessor: 'ConsumedQuantity', // accessor is the "key" in the data
      },
      {
        Header: 'Cost',
        accessor: 'Cost',
      },
      {
        Header: 'Date',
        accessor: 'Date',
      },
      {
        Header: 'Resource Group',
        accessor: 'ResourceGroup',
      },
      {
        Header: 'Service Name',
        accessor: 'ServiceName',
      },
      {
        Header: 'Location',//Location
        accessor: 'Location',
      },
      {
        Header: 'Unit Of Measure',//Location
        accessor: 'UnitOfMeasure',
      },
    ],
    []
  )

  useEffect(() => {
    async function getCoreData() {
      try {
        const response = await axios("https://engineering-task.elancoapps.com/api/raw");
        setRawData(response.data)
        setPageData(response.data.slice(0, 100))
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setisLoading(false)
      }
    }
    getCoreData()
  }, []);

  function handlePage(pageNo) {

    return e => {
      console.log({ pageNo });
      setPageNo(pageNo);
      setPageData(rawData.slice((pageNo - 1) * 100, pageNo * 100))
    }
  }
  console.log({ pageData });

  if (isLoading) return <div className="spinner">
    <ThreeDots color="#D2B48C" height="100" width="100" />
  </div>

  return (
    <div className='DataPage'>
      {/* <div className='cards-container'>
        {pageData?.map((data, index) => (
          <DataCards data={data} key={index} rawData={true} />
        ))}
      </div> */}
      <Datatable columns={columns} data={rawData} />

      {/* <Pagination totalNoOfPages={rawData.length} handlePage={handlePage} currentPageNo={pageNo} /> */}
    </div>
  )
}
