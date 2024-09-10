import './card.css';
import starImg from '../../assets/star.svg'

export const HotelCard = ({hotels})=>{

    return <div className="card">
        <div className="card-img">
            <img src={hotels[0].image} alt="" />
        </div>
        <div className="card-details">
            <div className="address">
                <p>{`${hotels[0].address},${hotels[0].state}`}</p>
                <span>{hotels[0].name}</span>
                </div>
            <div className="ratings">
                <img src={starImg} alt="star-image" width="15" height="15"/>
                <span>{hotels[0].rating}</span>
            </div>
        </div>
        <span id='price'>{hotels[0].price}</span>
    </div>
}