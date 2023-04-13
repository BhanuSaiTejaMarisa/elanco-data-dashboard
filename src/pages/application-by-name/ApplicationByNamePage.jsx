import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DataCards from '../../components/DataCards/DataCards';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";

export default function ApplicationByNamePage() {
  const { appName } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate();


  useEffect(() => {
    async function getCoreData() {
      try {
        const response = await axios(`https://engineering-task.elancoapps.com/api/applications/${appName}`);
        let resourceGrpObj = {}
        const filteredData = response.data.filter(value => {
          if (resourceGrpObj[value.ServiceName] === undefined) {
            resourceGrpObj[value.ServiceName] = 1
            return true;
          }
        })
        setData(filteredData)
        // setPageData(response.data.slice(0, 10))
        console.log(response.data);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setisLoading(false)
      }
    }
    getCoreData()
  }, [appName]);
  console.table(data);

  if (isLoading) return <div className="spinner">
    <ThreeDots color="#D2B48C" height="100" width="100" />
  </div>
  return (
    <div>
      <h1>{appName}</h1>
      <div className='cards-container'>
        {data?.map((data, index) => (
          <div key={index} onClick={() => navigate(`resources/${data.ServiceName}`)}>
            <DataCards data={data} />
          </div>
        ))}
      </div>
    </div>
  )



}
