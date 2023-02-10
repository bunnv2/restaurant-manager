import { useState } from "react"
import cx from "classnames"

import { AddTables, AddMeals } from "components"

import "./styles.scss"

const SettingsScreen = () => {
  const [view, setView] = useState<string>("tables")

  const changeView = (view: string): void => {
    setView(view)
  }

  const getButtonClasses = (name: string) =>
    cx("settings__button", { "-active": view === name })

  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__navbar">
          <button
            className={getButtonClasses("tables")}
            type="button"
            onClick={() => changeView("tables")}
          >
            Add Tables
          </button>
          <button
            className={getButtonClasses("meals")}
            type="button"
            onClick={() => changeView("meals")}
          >
            Add Meals
          </button>
        </div>
        <div className="settings__view">
          {view === "tables" ? <AddTables /> : <AddMeals />}
        </div>
      </div>
    </div>
  )
}

export default SettingsScreen
