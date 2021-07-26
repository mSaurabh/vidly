import { iGenre } from "services/fakeGenreService";

export interface SelectProps {
  name: string;
  label: string;
  value: any;
  onChange: any;
  options: any | iGenre[];
  error: any;
}

const Select = (props: SelectProps) => {
  const { name, options, label, error, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option: any) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
