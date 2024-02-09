import { Form, Col } from "react-bootstrap";
import { ISelectInput } from "../../utilities/interfacesOrtype";

function SelectInput({ options, defaultSelect, onChange, value }: ISelectInput) {
  return (
    <Form.Group
      className="flex flex-row"
      as={Col}
      md="12"
      controlId="validationCustom02"
    >
      <Form.Select value={value} onChange={onChange} aria-label="Default select example">
          <option value={""}>{defaultSelect}</option>
        {(options || []).map((obj: string) => (
          <option value={obj} key={obj}>{obj}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;
