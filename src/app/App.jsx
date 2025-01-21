import { useState } from "react";
import "./App.css";
import BankService from "../services/BankService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrentDate from "../currentDate/CurrentDate";
import RenderButton from "./buttons/RenderButton";
import Description from "./description/Description";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [rate, setRate] = useState(null);
  const [txt, setTxt] = useState("Українська гривня");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currencieCc, setCurrencieCc] = useState("UAH");
  const bankService = new BankService();

  const getCurrentDateFormatted = (selectedDate) => {
    const now = selectedDate || new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const currentDate = CurrentDate();
  const customeDate = getCurrentDateFormatted(selectedDate);

  const onRequestOne = async (currencyId) => {
    try {
      const currencie = await bankService.getCurrencyById(
        currencyId,
        customeDate
      );
      if (currencie && currencie.length > 0) {
        const rateValue = parseFloat(currencie[0].rate).toFixed(2);
        setRate(rateValue);
        setTxt(currencie[0].txt);
        setCounter((prevCounter) => (prevCounter / rateValue).toFixed(2));
        setCurrencieCc(currencyId);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  const onRequest = async () => {
    try {
      const currencies = await bankService.getAllCurrencies();
      if (currencies && currencies.length > 0) {
        const randomIndex = Math.floor(Math.random() * currencies.length);
        const randomCurrency = currencies[randomIndex];
        onRequestOne(randomCurrency.cc);
      }
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const resCounter = () => {
    setCounter(0);
    setRate(null);
    setTxt("Українська гривня");
    setSelectedDate(new Date());
    setCurrencieCc("UAH");
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCounter(value);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app">
      <div className="app_conteiner1">
        {rate == null ? (
          <p>Виберіть валюту та суму</p>
        ) : (
          <p>
            Текущий курс НБУ:{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {rate} грн
            </span>
          </p>
        )}
        <div>
          {currentDate === customeDate ? (
            <span>Виберіть дату: </span>
          ) : (
            <span>Поточна дата: </span>
          )}
          <span style={{ display: "grid" }}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
            />
          </span>
        </div>
      </div>

      <div className="app_conteiner">
        <input
          className="counter"
          type="number"
          value={counter}
          onChange={handleInputChange}
          onMouseLeave={(e) => e.target.blur()}
        />
        <p className="app_text">{currencieCc}</p>
      </div>
      <p className="app_text2">{txt}</p>
      <div className="controls">
        <RenderButton
          currencyId="USD"
          label="USD"
          onClickHandler={() => onRequestOne("USD")}
          isActive={currencieCc === "USD"}
        />
        <RenderButton
          currencyId="EUR"
          label="EUR"
          onClickHandler={() => onRequestOne("EUR")}
          isActive={currencieCc === "EUR"}
        />
        <RenderButton
          currencyId="RND"
          label="RND"
          onClickHandler={onRequest}
          isActive={
            currencieCc !== "USD" &&
            currencieCc !== "EUR" &&
            currencieCc !== "UAH"
          }
        />
        <RenderButton
          currencyId="RESET"
          label="RESET"
          onClickHandler={resCounter}
          isActive={false}
        />
      </div>
      <Description />
    </div>
  );
};

export default App;
