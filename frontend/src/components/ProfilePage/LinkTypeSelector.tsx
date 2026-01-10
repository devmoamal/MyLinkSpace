import Select from "@/components/common/Select";
import { LINK_TYPES } from "@mylinkspace/shared";

type LinkTypeSelectorProps = {
  value: (typeof LINK_TYPES)[number];
  onChange: (value: (typeof LINK_TYPES)[number]) => void;
  disabled?: boolean;
};

/**
 * Link type selector dropdown.
 */
function LinkTypeSelector({
  value,
  onChange,
  disabled,
}: LinkTypeSelectorProps) {
  const options = LINK_TYPES.map((linkType) => ({
    value: linkType,
    label: linkType,
  }));

  return (
    <Select
      value={value}
      onChange={(val) => onChange(val as (typeof LINK_TYPES)[number])}
      options={options}
      disabled={disabled}
    />
  );
}

export default LinkTypeSelector;
