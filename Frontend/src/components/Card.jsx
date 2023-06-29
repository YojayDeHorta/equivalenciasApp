import { useState, useRef } from "react"
import useFetch from "./hooks/useFetch";
import Select from "./Select";
import Placeholder from "./Placeholder";
import invertIcon from "../../public/invert.svg";

export default function Card({ cssClass, cardData }) {
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const formRef = useRef(null);
    const selectFromRef = useRef(null);
    const selectToRef = useRef(null);

    // fetchGetSelect = { loading, error, value }
    const fetchGetSelect = useFetch(cardData.url, { method: 'GET' });

    const invertFields = () => {
        setResult('');

        let auxiliary = '';
        let valueFrom = selectFromRef.current;
        let valueTo = selectToRef.current;

        auxiliary = valueTo.value;
        valueTo.value = valueFrom.value;
        valueFrom.value = auxiliary;

        handleButton(cardData.url)
    }

    const handleButton = async (url) => {
        setIsLoading(true);
        setResult('');

        const data = Object.fromEntries(new FormData(formRef.current));
        data.valueToconvert = parseFloat(data.valueToconvert, 10);

        if (!data.valueToconvert) {
            throw new Error('Campo vacio');
        }
        if (data.valueToconvert <= 0) {
            throw new Error('Valor no permitido');
        }

        try {
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": 'application/json' }, body: JSON.stringify(data) });
            const json = await response.json();

            if (!json.ok) throw new Error(json.message);
            
            setResult(json.result + ' ' + data.convertTo);
        } catch (error) {
            setErrorMsg(error.message);
        }
        setIsLoading(false);
    };

    return (
        <article className={cssClass}>
            {
                (!fetchGetSelect.value) ?

                    <Placeholder /> :

                    <form ref={formRef} className="card_form">
                        <div className="pill">{cardData.title}</div>
                        <div>
                            <input className="form-control" type="text" name="valueToconvert" placeholder="Value" autoComplete="off" />
                        </div>

                        <Select name="convertFrom" label='From' SelectRef={selectFromRef}>
                            {fetchGetSelect.value.map(option =>
                                <option key={option.abbreviation} value={option.abbreviation}>
                                    {option.name + ' (' + option.abbreviation + ')'}
                                </option>)
                            }
                        </Select>
                        <div className="invert_container">
                            <img onClick={() => invertFields()} src={invertIcon} alt="invert icon" width='35px' height='35px' />
                        </div>

                        <Select name="convertTo" label='To' SelectRef={selectToRef}>
                            {fetchGetSelect.value.map(option =>
                                <option key={option.abbreviation} value={option.abbreviation}>
                                    {option.name + ' (' + option.abbreviation + ')'}
                                </option>)
                            }
                        </Select>

                        <footer className="footer_card">
                            <button className="btn" type="button" onClick={() => handleButton(cardData.url)} disabled={isLoading ? true : false} >
                                Convert
                            </button>
                            <span className="textResult" name="result">{result}</span>
                        </footer>
                    </form>
            }
        </article>
    );
}