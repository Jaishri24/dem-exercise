import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState('Xero');
  const [abn, setABN] = React.useState('BUSINESS1');
  const [loanAmount, setLoanAmount] = React.useState(1000);
  const [balanceSheet, setBalanceSheet] = useState<any[]>([])

  const handleChange = (event: any) => {
    setSelectedProvider(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const request = {
      business: {
        ABN: `${abn}`
      },
      loanAmount: `${loanAmount}`,
      provider: `${selectedProvider}`
    }
    console.log(request);
    axios
      .post('http://localhost:4000/accounting/balancesheet', request)
      .then(function (response) {
        console.log(response.data)
        setBalanceSheet(response.data.balanceSheet);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const handleSubmitDecision = (event: any) => {
    event.preventDefault();

    const request = {
      loanDetails: {
        business: {
          ABN: `${abn}`
        },
        loanAmount: `${loanAmount}`,
        provider: `${selectedProvider}`,
      },
    }
    console.log(request);
    axios
      .post('http://localhost:4000/loan/decision', request)
      .then(function (response) {
        console.log(response.data)
        alert('Request Submitted : ' + `${JSON.stringify(response.data)}`)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/accounting/providers')
      .then(function (response) {
        setProviders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <label className='label'>
          Business ABN:
          <input
            name='abn'
            type="text"
            value={abn}
            onChange={(e) => setABN(e.target.value)}
          ></input>
        </label>
        
        <label className='label'>
          Loan Amount:
          <input
            name='loanAmount'
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          ></input>
        </label>
        <label className='label'>
          Provider:
          <select value={selectedProvider} onChange={handleChange}>
            {providers.map((provider) => (
              <option value={provider}>{provider}</option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" className='button' />
      </form>

      <table className="table table-striped table-hover" >
        <thead>
          <tr>
            <th scope="col">
              Year
            </th>
            <th scope="col">
              Month
            </th>
            <th scope="col">
              Profit or Loss
            </th>
            <th scope="col">
              Asset Value
            </th>
          </tr>
        </thead>
        <tbody>
          {balanceSheet && balanceSheet.map((item) => (
            <tr>
              <td>{item.year}</td>
              <td>{item.month}</td>
              <td className='cellRight'>{item.profitOrLoss}</td>
              <td className='cellRight'>{item.assetsValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input type="submit"  className='button' value="Request Loan" onClick={handleSubmitDecision} />
    </div>
  );
}

export default App;
