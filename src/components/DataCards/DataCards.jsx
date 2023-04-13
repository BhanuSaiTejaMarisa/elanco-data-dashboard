import "./DataCards.scss"
import React from 'react'

export default function DataCards({ data, rawData }) {
  return (
    <div className='DataCards cards'>
      <div >
        <p>
          App Name: <strong>{data.ResourceGroup}</strong>
        </p>
        <p>
          Resource Group: <strong>{data.ServiceName}</strong>
        </p>
        {rawData &&
          <>
            <p>
              Environment:  <strong>{data?.Tags?.environment}</strong>
            </p>
            <p>
              Date:  <strong>{data.Date}</strong>
            </p>
            <p>
              Cost:  <strong>{data.Cost}</strong>
            </p>
          </>
        }
      </div>
    </div>
  )
}
