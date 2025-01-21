import "./search.css";

export const GuestSelect = () => {
  return (
    <div className="guest-container">
      <span className="guest-type">Adults</span>

      <div className="quant">
        <span className="change-number">-</span>
        <span>1</span>
        <span className="change-number">+</span>
      </div>

      <span className="guest-type">Children</span>

      <div className="quant">
        <span className="change-number">-</span>
        <span>1</span>
        <span className="change-number">+</span>
      </div>

      <span className="guest-type">Pets</span>
      <div className="quant">
        <span className="change-number">-</span>
        <span>1</span>
        <span className="change-number">+</span>
      </div>
    </div>
  );
};
