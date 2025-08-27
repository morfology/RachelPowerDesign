import React from 'react'
import structuredData from '../../config/structured-data.json'

const StructuredData: React.FC = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export default StructuredData