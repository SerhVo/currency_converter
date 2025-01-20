import { useState, useEffect } from "react";

const CurrentDate = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const getCurrentDateFormatted = () => {
      const now = new Date();
      const year = now.getFullYear(); // Получаем год
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Добавляем ведущий 0
      const day = String(now.getDate()).padStart(2, "0"); // Добавляем ведущий 0
      return `${year}${month}${day}`;
    };

    // Устанавливаем форматированную дату в состояние
    setFormattedDate(getCurrentDateFormatted());
  }, []); // [] гарантирует выполнение только при монтировании компонента

  return formattedDate;
};

export default CurrentDate;
