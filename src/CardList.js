import { useState, useEffect } from 'react'
import './Card.css'

const CardList = () => {
    const [data, setData] = useState();
    const [newData, setNewData] = useState([])

    const fetchInfo = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users').then((response => response.json()))

        setData(response)
        setNewData(response.slice(0, 3))
    }

    useEffect(() => {
        fetchInfo();
    }, [])
    console.log(data)
    console.log(newData)

    const handleAddButton = () => {
        const list = [...newData];
        let count = 0;
        if (newData.length < data.length) {
            data.map((dataItem, index) => {
                console.log(!newData.includes(dataItem), dataItem);
                if (!newData.includes(dataItem) && count === 0) {
                    list.push(data[index]);
                    count++;
                }
            })
            setNewData(list)
        }
    }

    const handleRemoveButton = (id) => {
        const values = newData.filter((ele) => ele.id !== id);
        setNewData(values)


    }
    return (
        <>
            <button onClick={handleAddButton} className='Add-btn' disabled={newData?.length >= data?.length}>Add</button>
            <div className='card-direction'>
                {newData?.map((item) => {
                    return (
                        <div className='card'>
                            {newData?.length > 3 && (
                                <button className='remove-btn' onClick={() => handleRemoveButton(item.id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                            )}
                            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar"></img>
                            <div className='container'>
                                <span id='userName'>{item.name}</span><br></br>
                                <span id='userEmailID'>{item.email}</span><br></br>
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                <span>{item.address.city}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CardList;