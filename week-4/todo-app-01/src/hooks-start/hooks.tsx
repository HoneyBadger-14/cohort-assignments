import { useState } from "react";
import MyButton from "../button-comp/button-comp";

export default function HooksApp() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <h2>Both Counters upddated together</h2>
            <MyButton count={count} onClick={handleClick} />
            <MyButton count={count} onClick={handleClick} />
        </div>
    );

}