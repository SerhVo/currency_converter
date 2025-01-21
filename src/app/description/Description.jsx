import "./description.css";
const Description = () => { 
    return (
      <div className="descr-container">
        <h1 className="descr-name descr">Конвертер валют</h1>
        <h3 className="descr-capt descr">Опис для додатка:</h3>
        <p className="descr-text">
          1. Введіть потрібну суму у відповідне поле.
        </p>
        <p className="descr-text">
          2. Виберіть дату, для якої хочете дізнатися курс валюти. Якщо дату не
          вибирати, курс буде вказано на поточний день.
        </p>
        <p className="descr-text">
          3. Виберіть необхідну валюту, натиснувши на відповідну кнопку.
        </p>
        <p className="descr-text">
          4. Якщо хочете отримати випадкову валюту, натисніть кнопку RND - вона
          підбере валюту у випадковому порядку.
        </p>
        <p className="descr-text">
          5. Для скидання всіх даних натисніть кнопку RESET.
        </p>
        <h3 className="descr-text-small descr">
          Додаток надасть актуальний курс НБУ та розрахує значення для обраної
          суми.
        </h3>
      </div>
    );
}
export default Description;