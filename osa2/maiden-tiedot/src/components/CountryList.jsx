import Country from "./Country";

const CountryList = ({ countries, search, handleClick }) => {
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify your search</p>;
    }

    if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        return (
            <div>
                <Country country={country} />
            </div>
        );
    }

    return (
        <ul>
            {filteredCountries.map(country => (
                <div key={country.name.common}>
                    <li>   
                        {country.name.common} 
                        <button onClick={() => handleClick(country.name.common)}>show</button>
                    </li>
                </div>
            ))}
        </ul>
    );
};

export default CountryList