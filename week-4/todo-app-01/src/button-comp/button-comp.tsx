export default function MyButton({count, onClick}: {count : number, onClick: any}) {
    return(
        <button onClick={onClick}>
            clicked {count} times
        </button>
    );
}