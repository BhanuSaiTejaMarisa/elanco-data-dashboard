import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ApplicationsPage() {

  const [resources, setResources] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    async function getResources() {
      try {
        const response = await axios("https://engineering-task.elancoapps.com/api/applications");
        setResources(response.data)
      }
      catch (err) {
        console.log(err);
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
    <div className='cards-container'>
      {
        resources.map((data, index) => (
          <div key={index} className='cards' onClick={() => navigate(`${data}`)}>
            {data}
          </div>
        ))}

    </div>
  )
}
