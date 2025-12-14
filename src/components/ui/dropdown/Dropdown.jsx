import 'bootstrap/dist/css/bootstrap.min.css';

const Dropdown = ({ options=[], onSelect=()=>{}, selectedOption='', isDisabled=false }) => {

  return (
    <div className="dropdown">
      <select className="form-select mb-3" aria-label="Large select example" defaultValue={selectedOption} onChange={(e) => onSelect(e.target.value)} disabled={isDisabled}>
        <option value='' disabled>Please select</option>
        {
            options.map((option, key) => <option key={key} value={option.value}>{option.title}</option>)
        }
      </select>
    </div>
  );
};

export default Dropdown;
