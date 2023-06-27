import { useState } from "react"

export default function Card ({cssClass}) {
    
    return (
        <article className={cssClass}>
            <form className="card_form" action="">
                <div className="pill">Length</div>
                <div>
                    <input className="form-control" type="number" name="inputValue" id="inputValue" placeholder="Value" />
                </div>

                <label htmlFor="from">From: 
                    <select className="form-select" name="from" id="">
                        <option value="">co</option>
                    </select>
                </label>

                <label htmlFor="to">To: 
                    <select className="form-select" name="to" id="">
                        <option value="">eeuu</option>
                    </select>
                </label>
                    
                <div>
                    <button className="btn" type="button">Convert</button>
                    <span name="result">0</span>
                </div>
                

                

                
            </form>
        </article>
    );
}