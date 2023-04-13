import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataCards from '../../components/DataCards/DataCards';
import { ThreeDots } from 'react-loader-spinner';

export default function ResourceByNamePage() {

  const { resourceName } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    async function getCoreData() {
      try {
        const response = await axios(`https://engineering-task.elancoapps.com/api/resources/${resourceName}`);
        let resourceGrpObj = {}
        const filteredData = response.data.filter(value => {
          if (resourceGrpObj[value.ResourceGroup] === undefined) {
            resourceGrpObj[value.ResourceGroup] = 1
            return true;
          }
        })
        setData(filteredData)
        // setPageData(response.data.slice(0, 10))
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setisLoading(false)
      }
    }
    getCoreData()
  }, [resourceName]);
  console.table(data);

  if (isLoading) return <div className="spinner">
    <ThreeDots color="#D2B48C" height="100" width="100" />
  </div>

  return (
    <div>
      <p>Resource: <strong> {resourceName}</strong></p>
      <div className='cards-container'>
        {data?.map((data, index) => (
          <div key={index} onClick={() => navigate(`applications/${data.ResourceGroup}`)}>

            <DataCards data={data} />
          </div>
        ))}
      </div>
    </div>
  )
}
