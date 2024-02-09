import { Form, Col } from "react-bootstrap";
import { ISelectInput } from "../../utilities/interfacesOrtype";

function SelectInputWithLabel({
  options,
  defaultSelect,
  onChange,
  value,
  name
}: ISelectInput) {
  return (
    <Form.Group
      as={Col}
      md="12"
      controlId="validationCustom08"
    >
      <Form.Label>{defaultSelect}</Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        aria-label="Default select example"
      >
        <option value={""}>{defaultSelect}</option>
        {(options || []).map((obj: string) => (
          <option value={obj} key={obj}>
            {obj}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectInputWithLabel;
