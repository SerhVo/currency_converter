class BankService {
  _apiBase = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?";

  
    getAllCurrencies = async () => {
    const response = await fetch(`${this._apiBase}json`);
    if (!response.ok) {
      throw new Error(`Error fetching currencies: ${response.status}`);
    }

    return await response.json();
  };

  getCurrencyById = async (currencyId, customeDate) => {
    const resp = await fetch(
      `${this._apiBase}valcode=${currencyId}&date=${customeDate}&json`
    );
    if (!resp.ok) {
      throw new Error(`Error fetching currency by ID: ${resp.status}`);
    }
    return await resp.json();
  };
}
export default BankService;
