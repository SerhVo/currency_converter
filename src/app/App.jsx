import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import BankService from "../services/BankService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Импорт стилей для календаря
import CurrentDate from "../currentDate/CurrentDate";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [rate, setRate] = useState(null);
  const [txt, setTxt] = useState("Українська гривня");
  const [activeButton, setActiveButton] = useState(null); // Состояние для активной кнопки
  const [selectedDate, setSelectedDate] = useState(new Date()); // Состояние для выбранной даты
  //   const [currenciesList, setCurrenciesList] = useState([]);
  const [currencieCc, setCurrencieCc] = useState("UAH");
  const bankService = new BankService();

  const getCurrentDateFormatted = (selectedDate) => {
    const now = selectedDate || new Date();
    const year = now.getFullYear(); // Получаем год
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Добавляем ведущий 0
    const day = String(now.getDate()).padStart(2, "0"); // Добавляем ведущий 0
    return `${year}${month}${day}`;
  };

  const currentDate = CurrentDate();
  let customeDate = getCurrentDateFormatted(selectedDate);
  // Метод для получения данных валюты
  const onRequestOne = async (currencyId, selectedDate) => {
    // customeDate = getCurrentDateFormatted(date); // Получаем форматированную дату
    try {
      const currencie = await bankService.getCurrencyById(
        currencyId,
        customeDate
      );
      if (currencie && currencie.length > 0) {
        const rateValue = parseFloat(currencie[0].rate).toFixed(2);
        setRate(rateValue); // Обновляем состояние rate
        setTxt(currencie[0].txt); // Обновляем текстовое поле с кодом валюты
        // Обновляем значение counter
        setCounter((prevCounter) => (prevCounter / rateValue).toFixed(2));
        console.log("rate: ", rateValue);
        setActiveButton(currencyId); // Обновляем активную кнопку
        setCurrencieCc(currencyId);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  // Метод для получения всех валют
  const onRequest = async () => {
    try {
      const currencies = await bankService.getAllCurrencies();
      if (currencies && currencies.length > 0) {
        // setCurrenciesList(currencies); // Сохраняем валюты в состояние
        const randomIndex = Math.floor(Math.random() * currencies.length);
        onRequestOne(currencies[randomIndex].cc);
        console.log("randomIndex: ", currencies[randomIndex].cc);
        return currencies[randomIndex].cc;
      }
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  // Сброс значений
  const resCounter = () => {
    setCounter(0); // Сбрасываем к исходному значению
    setRate(null);
    setTxt("Українська гривня"); // Сбрасываем название валюты
    setActiveButton(null); // Сброс активной кнопки
    setSelectedDate(new Date()); // Сбрасываем выбранную дату
    setCurrencieCc("UAH");
  };

  // Обработка изменения значения из input
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCounter(value);
    }
  };

  // Функция для изменения цвета кнопки
  const handleButtonClick = (currencyId) => {
    onRequestOne(currencyId); // Запрос данных для валюты
  };

  // Функция для получения стиля кнопки
  const getButtonStyle = (currencyId) => {
    return activeButton === currencyId
      ? { backgroundColor: "green", color: "white" }
      : {};
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Обновляем выбранную дату
  };

  return (
    <div className="app">
      <div className="app_conteiner1">
        {rate == null ? (
          <p>Виберіть валюту та суму</p>
        ) : (
          <p>
            Текущий курс НБУ:{" "}
            {rate ? (
              <span style={{ color: "green", fontWeight: 'bold' }}>{rate} грн</span>
            ) : (
              "Загрузка..."
            )}
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
              onChange={handleDateChange} // Обработчик изменения даты
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
        />
        <p className="app_text">{currencieCc}</p>
      </div>
      <p className="app_text2">{txt}</p>
      <div className="controls">
        <button
          onClick={() => handleButtonClick("USD")}
          style={getButtonStyle("USD")}
        >
          USD
        </button>
        <button
          onClick={() => handleButtonClick("EUR")}
          style={getButtonStyle("EUR")}
        >
          EUR
        </button>
        <button style={getButtonStyle({ currencieCc })} onClick={onRequest}>
          RND
        </button>
        <button onClick={resCounter}>RESET</button>
      </div>
    </div>
  );
};

App.propTypes = {
  initialCounter: PropTypes.number,
};

export default App;
