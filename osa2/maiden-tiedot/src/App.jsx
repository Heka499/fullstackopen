import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import CountryList from './components/CountryList'
import Filter from './components/Filter'


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleClick = (country) => {
    setSearch(country)
  }



  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <CountryList countries={countries} search={search} handleClick={handleClick} />
    </div>
  )
}

export default App
