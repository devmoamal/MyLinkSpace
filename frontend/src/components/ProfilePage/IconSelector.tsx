import Select from "@/components/common/Select";
import { LINK_ICON_MAP, type LinkIconType } from "@/constants/link";

type IconSelectorProps = {
  value: LinkIconType;
  onChange: (value: LinkIconType) => void;
  disabled?: boolean;
};

/**
 * Icon selector dropdown for links.
 */
function IconSelector({ value, onChange, disabled }: IconSelectorProps) {
  const options = Object.keys(LINK_ICON_MAP).map((iconName) => ({
    value: iconName,
    label: iconName,
  }));

  return (
    <Select
      value={value}
      onChange={(val) => onChange(val as LinkIconType)}
      options={options}
      disabled={disabled}
    />
  );
}

export default IconSelector;
