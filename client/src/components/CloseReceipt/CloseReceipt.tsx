import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { Button, Header, Select } from "components"

import { getReceipt, endReceipt } from "utils"

import "./styles.scss"

type Props = {
  tableNumber: number
  refetch: () => void
  close: () => void
}

type MealType = {
  mealName: string
  description: string
  price: number
}

type ReceiptType = {
  tableNumber: number
  meals: Array<MealType>
  total?: number
  isClosed?: boolean
  restaurantId?: string
}

const CloseReceipt = ({ tableNumber, refetch, close }: Props) => {
  const [receipt, setReceipt] = useState<ReceiptType>({
    tableNumber: 0,
    meals: [],
    total: 0,
  })

  useEffect(() => {
    const fetchReceipt = async () => {
      const { data } = await getReceipt(tableNumber)

      if (data) {
        setReceipt(data)
      } else {
        toast.error("⛔ Failed to get receipt, please try again!", {
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
    fetchReceipt()
  }, [tableNumber])

  const closeReceipt = async () => {
    const { data } = await endReceipt(tableNumber)

    if (!data) {
      toast.error("⛔ Failed to close receipt, please try again!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    } else {
      toast(`✅ ${data.message}` || "✅ Receipt added!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })

      close()
      refetch()
    }
  }

  return (
    <div className="get-receipt">
      <Header variant="h3">Order</Header>
      <div className="get-receipt__content">
        <ol className="get-receipt__list">
          {receipt.meals.length > 0 &&
            receipt.meals.map(({ mealName, price }, index) => (
              <li key={index} className="get-receipt__item">
                <span className="get-receipt__item-name">{mealName}</span>
                <span className="get-receipt__item-price">{price}$</span>
              </li>
            ))}
        </ol>
        <div className="get-receipt__summary">
          <span>Summary:</span>
          <span className="get-receipt__summary-price">{receipt.total} $</span>
        </div>
        <div className="get-receipt__close">
          <Select name="payMethod">
            <option value="none">-------</option>
            <option value="polish">Credit Card</option>
            <option value="mixed">Cash</option>
          </Select>
          <Button type="button" onClick={closeReceipt}>
            Close Receipt
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CloseReceipt
