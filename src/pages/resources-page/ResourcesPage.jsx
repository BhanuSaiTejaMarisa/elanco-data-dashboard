import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

export default function ResourcesPage() {


  const [resources, setResources] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    async function getResources() {
      try {
        const response = await axios("https://engineering-task.elancoapps.com/api/resources");
        setResources(response.data)
      }
      catch (err) {

      }
      finally {
        setisLoading(false)
      }
    }
    getResources()
  }, [])

  if (isLoading) return <div className="spinner">
    <ThreeDots color="#D2B48C" height="100" width="100" />
  </div>

  return (
    <>
      <h1>Resources Page</h1>
      <div className='cards-container'>
        {
          resources.map((data, index) => (
            <div key={index} className='cards' onClick={() => navigate(`${data}`)}>
              {data}
            </div>
          ))}

      </div>
    </>
  )
}
