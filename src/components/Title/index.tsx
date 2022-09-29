type Props = {
    description: string;
    age: number;
}

export function Title({ age, description    }: Props) {
    return(
        <>
        <h1 className="title">{description} - {age} anos</h1>
        </>
        
    )
}