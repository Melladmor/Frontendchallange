import { useState } from "react";
// css file import
import style from './autoCompleteStyle.module.css'
const AutoComplete = () => {
    // states
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // asynchronous function to fetching mook data from jsonapiholder
    const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
        setLoading(true);
        // Mock asynchronous data fetching
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) =>
            data.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
            )
        );
        setSuggestions(data);
        setLoading(false);
    } else {
        setSuggestions([]);
    }
    };
  return (
    <div className={style.autocomplete}>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search..."
        />
        {loading ? (
            <div className={style.searchList}>Loading...</div>
        ) : (
            <div className={style.searchList}>
                {suggestions?.map((item) => (
                    <div key={item.id} className={style.listItem}>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>

)
}

export default AutoComplete