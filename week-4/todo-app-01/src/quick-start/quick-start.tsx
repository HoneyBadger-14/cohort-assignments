import "./quick-start.css";
import { useState } from "react";

const QuickStart = {
    AboutPage,
    MyButton,
    Profile
};

function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }
    return (
        <button onClick={handleClick}>Button click count {count} times</button>
    );
}


const user = {
    name: 'Puneet Gaddi',
    imageUrl: 'https://images.indulgexpress.com/uploads/user/imagelibrary/2019/9/13/original/Punit_Issar_-_mahabharata-minaa.jpg',
    imageSize: 90
};

const products = [
    { title: 'Ghee', id: 1, isOil: true },
    { title: 'Curd', id: 1, isOil: false },
    { title: 'Milk', id: 1, isOil: false },
    { title: 'Butter Milk', id: 1, isOil: false }
];

function printListItems() {
    const listItems = products.map(product =>
        <li
            key={product.id}
            style={{
                color: product.isOil ? 'magenta' : 'darkgreen',
                textAlign : "center"
            }}
        >
            {product.title}
        </li>
    )
    return (
        <>
            <h3>Looping trought array</h3>
            <ul style={{
                textAlign: "left"
            }}>{listItems}</ul>
        </>

    );
}

function AboutPage() {
    return (
        <>
            <h2>Both counters are updated separately </h2>
            {MyButton()}
            {MyButton()}
            <h2>About</h2>
            <img className="avatar" />
            <p>Hello Puneet!<br /> Finish the quick start with a todo app</p>
            {printListItems()}
            {Profile()}
            <br></br>

        </>
    );
}

function Profile() {
    return (
        <>
            <h1>{user.name}</h1>
            <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize
                }}
            />
        </>
    );
}

export default AboutPage;