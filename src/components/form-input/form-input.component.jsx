import { Group, FormInputLabel, Input } from './form-input.styles';
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {/* ternary operator for true value only or for only if case we do not want else case here , If we have label then return label  */}
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
export default FormInput;
