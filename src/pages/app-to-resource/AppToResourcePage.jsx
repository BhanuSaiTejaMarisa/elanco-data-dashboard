import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import DataCards from '../../components/DataCards/DataCards';
import Pagination from '../../components/pagination/Pagination';
import { useParams } from 'react-router-dom';
import Datatable from '../../components/data-table/Datatable';

export default function AppToResourcePage() {
  const [rawData, setRawData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageData, setPageData] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const { appName, resourceName } = useParams();
  console.log({ appName, resourceName });


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
        // const response = await axios("https://engineering-task.elancoapps.com/api/raw");
        // const filteredData = response.data.filter(value => value.ServiceName === resourceName && value.ResourceGroup === appName);


        const response = await axios(`https://engineering-task.elancoapps.com/api/resources/${resourceName}`);
        let resourceGrpObj = {}
        const filteredData = response.data.filter(value => value.ResourceGroup === appName)
        setRawData(filteredData)
        setRawData(filteredData)
        setPageData(filteredData.slice(0, 10))
        console.log(response.data, filteredData);
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
      setPageData(rawData.slice((pageNo - 1) * 10, pageNo * 10))
    }
  }


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
