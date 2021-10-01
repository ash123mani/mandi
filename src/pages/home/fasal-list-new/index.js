import React from 'react'
import { Table } from 'antd'
import { EditTwoTone } from "@ant-design/icons";
import { useHistory } from 'react-router-dom' 

import mandLocations from '../../../config/mandLocations'


const FasalListNew = ({ procurements }) => {
  const history = useHistory()

  const handleFasalClick = (procurement) => {
    history.push({
      pathname: `/edit-procurement/${procurement.procurementId}`,
      state: procurement,
    });
  };

  console.log("procurements", procurements)

  procurements = procurements.map((item) => {
    return {
      ...item,
      mandiName: mandLocations[item.procurementMandi].name
    }
  })

  const columns = [
    {
      title: 'Mandi',
      dataIndex: 'mandiName',
      key: 'mandiName',
    },
    {
      title: 'procurementDate',
      dataIndex: 'procurementDate',
      key: 'procurementDate',
    },
    {
      title: 'Edit',
      key: 'fasalId',
      render: (text, record) => {
        return <EditTwoTone onClick={() => handleFasalClick(record)} />
      },
    }
  ]

  return (
    <Table columns={columns} dataSource={procurements}  pagination={false}/>
  )
}

export default FasalListNew
