import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { Table } from "components"

import { getTables } from "utils"

import "./styles.scss"

type TablesType = {
  number: number
  capacity: string
  isOccupied: boolean
}

const TablesList = () => {
  const [tables, setTables] = useState<Array<TablesType>>([])

  const fetchTables = async () => {
    const {data, statusText} = await getTables()

    if(data.length > 0) {
      setTables(data)
    } else {
      toast.error(statusText || "Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    }
  }

  useEffect(() => {
    fetchTables()
  }, [])

  return (
    <div className="tables-list">
      {tables.map((table) => (
        <Table table={table} key={table.number} refetch={fetchTables} />
      ))}
    </div>
  )
}

export default TablesList

// const getSeatClasses = (number: number) => cx('table__seat', {
//   '-top': number % 2 === 0,
//   '-bottom': number % 4 === 0,
//   '-left': number === 1,
//   '-right': number % 3 === 0,
// })

// {Array.from({ length: Number(capacity) }).map((_, index) => (
//   <div className={getSeatClasses(index + 1)} />
//   ))}
