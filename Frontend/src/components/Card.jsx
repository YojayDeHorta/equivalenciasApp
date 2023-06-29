import { useState } from "react"
import useFetch from "./hooks/useFetch";
import Select from "./Select";
import Placeholder from "./Placeholder";

export default function Card({ cssClass, cardData }) {
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // fetchGetSelect = { loading, error, value }
    const fetchGetSelect = useFetch(cardData.url, {  method: 'GET' });

    const handleSubmit = async (event, url) => {
        event.preventDefault();
        setResult('');

        const data = Object.fromEntries(new FormData(event.target));
        data.valueToconvert = parseFloat(data.valueToconvert, 10);

        if (!data.valueToconvert) {
            console.log('Campo vacio');
            return;
        }
        if (data.valueToconvert <= 0) {
            console.log('Valor no permitido');
            return;
        }

        try {
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": 'application/json' }, body: JSON.stringify(data) });
            const json = await response.json();

            if (!json.ok) throw new Error(json.message);
            
            setResult(json.result + ' ' + data.convertTo);
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <article className={cssClass}>
            {
                (!fetchGetSelect.value) ?

                <Placeholder /> :

                <form className="card_form" onSubmit={(event) => handleSubmit(event, cardData.url)}>
                    <div className="pill">{cardData.title}</div>
                    <div>
                        <input className="form-control" type="text" name="valueToconvert" placeholder="Value" />
                    </div>

                    <Select name="convertFrom" label='From'>
                        {fetchGetSelect.value.map(option => 
                            <option key={option.abbreviation} value={option.abbreviation}>
                                {option.name + ' (' + option.abbreviation + ')'}
                            </option>)
                        }
                    </Select>

                    <Select name="convertTo" label='To'>
                        { fetchGetSelect.value.map(option => 
                            <option key={option.abbreviation} value={option.abbreviation}>
                                {option.name + ' (' + option.abbreviation + ')'}
                            </option>)
                        }
                    </Select>

                    <footer className="footer_card">
                        <button className="btn" type="submit" disabled={isLoading ? true : false} >
                            Convert
                        </button>
                        <span className="textResult" name="result">{result}</span>
                    </footer>
                </form>
            }
        </article>
    );
}